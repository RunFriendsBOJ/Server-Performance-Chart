import React from 'react'
import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { Endpoints, fetchAPI, HttpMethod } from '../action/fetch'
import Chart from '../components/Chart'
import InputRightDesc from '../components/InputRightDesc'

import OptionButton from '../components/OptionButton'
import { buttonChange, inputChange } from '../types/events'

/*
input
    request count
    client count
    request Server
    request type
output
    response time
*/

const testData = {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    datasets: [
        {
            label: 'GQL',
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            fill: true,
            backgroundColor: 'rgba(255, 99, 133, 0.144)',
            borderColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
            label: 'Rest',
            data: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1],
            fill: true,
            backgroundColor: 'rgba(117, 255, 99, 0.151)',
            borderColor: 'rgba(99, 255, 125, 0.2)',
        },
        {
            label: 'ProtoBuf',
            data: [2, 4, 4, 1, 3, 5, 6, 7, 8, 4],
            fill: true,
            backgroundColor: 'rgba(185, 99, 255, 0.151)',
            borderColor: 'rgba(180, 99, 255, 0.2)',
        },
    ],
}

async function gqlQueryByid(id: number) {
    const query = `
        query getIdByPost(id : $id){
            getIdByPost($id : id) {
                id
                title
                content
            }
        }
    `
    return fetchAPI(Endpoints.GraphQL, query, HttpMethod.Post)
}

async function gqlQueryAll() {
    const query = `
    query {
        getAllPosts{
            id
            title
            content
        }
    }
    `
    return fetchAPI(Endpoints.GraphQL, query, HttpMethod.Post)
}

interface queryResult {
    id: number
    startTime?: number
    endTime?: number
    elaspedTime?: number
    requestState: RequestState
}

enum RequestState {
    loading = 'loading',
    end = 'end',
}

const SingleServer = () => {
    // input 입력용
    const [clientCnt, setClientCnt] = useState('')
    const [requestCnt, setRequestCnt] = useState('')
    // request가 끝났는지 확인용
    const [requestState, setRequestState] = useState<RequestState>(RequestState.end)
    // query결과
    const [queryResults, setQueryResults] = useState<queryResult[]>([])
    // 선택한 서버
    const [selectedServer, setSelectedServer] = useState('1')
    const servers = [
        { name: 'GraphQL', value: '1' },
        { name: 'ProtoBuf', value: '2' },
        { name: 'RestAPI', value: '3' },
    ]

    const testServer = () => {
        let responseCnt : number = 0
        const reqCnt = Number(requestCnt) || 10;
        // queryResults를 한번에 처리하기 위한 변수들
        let queryResultBuff : queryResult[] = Array.from({length: reqCnt}, (v, i)=>({id: i,requestState: RequestState.end}))
        if (requestState === RequestState.loading) return
        setRequestState(RequestState.loading)
        // query결과 초기화
        for (let i = 0; i < reqCnt; ++i) {
            queryResultBuff[i].requestState = RequestState.loading
            queryResultBuff[i].startTime = Date.now()
            gqlQueryAll()
                .then(() => {
                    // 비정상 코드 : setState(state + 1)을 하면 1번밖에 실행되지 않아서 이렇게 함
                    responseCnt += 1
                    queryResultBuff[i].endTime = Date.now()
                    queryResultBuff[i].elaspedTime = queryResultBuff[i].endTime! - queryResultBuff[i].startTime!
                    queryResultBuff[i].requestState = RequestState.end
                })
                .then(() => {
                    // 응답이 전부 온 경우
                    if (responseCnt === reqCnt){
                        setRequestState(RequestState.end)
                        setQueryResults(queryResultBuff)
                        queryResultBuff = []
                        responseCnt = 0
                    }
                })
                .catch((error) => console.log(error))
        }
    }

return (
    <Container>
        <Row >
            <Col>
                <Chart title={"Performance"} data={testData} />
            </Col>
        </Row>
        <Row>
            <Col md={{ span: 3, offset: 6 }}>
                <InputRightDesc description="clients" onChange={(e: inputChange) => setClientCnt(e.target.value)} value={clientCnt} />
                <InputRightDesc description="requests" onChange={(e: inputChange) => setRequestCnt(e.target.value)} value={requestCnt} />
            </Col>
        </Row>
        <Row>
            <Col md={{ span: 4, offset: 6 }}>
                <OptionButton options={servers} onChange={(e: buttonChange) => setSelectedServer(e.target.value)} selectedValue={selectedServer} />
            </Col>
            <Col md={{ offset: 0.1 }}>
                <Button variant="outline-dark" block onClick={() => { testServer() }}>Test</Button> 
            </Col>
        </Row>
        client : {clientCnt}, request : {requestCnt}, selectedServer : {servers.find(({ value }) => { return value === selectedServer })?.name}, queryStatus : {requestState === RequestState.loading ? '로딩중' : '끝남'}
        {queryResults.map( result => { return (<p id={String(result.id)}>{result.id} : {result.elaspedTime!}</p>)})}
    </Container>
)
}

export default SingleServer