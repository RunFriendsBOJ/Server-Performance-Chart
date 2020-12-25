import React from 'react'
import { useEffect } from 'react'
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

async function gqlQueryByid(id : number){
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

async function gqlQueryAll(){
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
    id?: number,
    title?: string,
    content?: string
}

const SingleServer = () => {
    const [clientCnt, setClientCnt] = useState('')
    const [requestCnt, setRequestCnt] = useState('')
    const [isRequesting, setisRequesting] = useState(false)

    const [queryResults, setQueryResults] = useState<queryResult[]>([])

    const [selectedServer, setSelectedServer] = useState('1')
    const servers = [
        { name: 'GraphQL', value: '1' },
        { name: 'ProtoBuf', value: '2' },
        { name: 'RestAPI', value: '3' },
    ]

    useEffect(()=> {
        gqlQueryAll()
            .then((response) => console.log(response.json()))
            .then(() => setisRequesting(false))
            .catch((error) => console.log(error))
    }, [isRequesting])

    return (
        <Container>
            <Row >
                <Col>
                    <Chart title={"Performance"} data={testData}/>
                </Col>
            </Row>
            <Row>
                <Col md={{span: 3, offset: 6}}>
                    <InputRightDesc description="clients" onChange={(e: inputChange) => setClientCnt(e.target.value)} value={clientCnt} />
                    <InputRightDesc description="requests" onChange={(e: inputChange) => setRequestCnt(e.target.value)} value={requestCnt} />
                </Col>
            </Row>
            <Row>
                <Col md={{span: 4, offset: 6}}>
                    <OptionButton options={servers} onChange={(e: buttonChange) => setSelectedServer(e.target.value)} selectedValue={selectedServer}/>
                </Col>
                <Col md={{offset:0.1}}>
                    <Button variant="outline-dark" block onClick={() => {setisRequesting(true)}}>Test</Button>
                </Col>
            </Row>
            client : {clientCnt}, request : {requestCnt}, selectedServer : {servers.find(({value})=>{ return value === selectedServer})?.name}, queryStatus : {isRequesting ? '로딩중' : '끝남'}
        </Container>
    )
}

export default SingleServer