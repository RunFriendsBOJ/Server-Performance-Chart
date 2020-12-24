import React from 'react'
import { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
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

const SingleServer = () => {
    const [clientCnt, setClientCnt] = useState('')
    const [requestCnt, setRequestCnt] = useState('')

    const [selectedServer, setSelectedServer] = useState('1')
    const servers = [
        { name: 'gql', value: '1' },
        { name: 'restapi', value: '2' },
        { name: 'protobuf', value: '3' },
    ]

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
                    <Button variant="outline-dark" block>Test</Button>
                </Col>
            </Row>
        </Container>
    )
}

export default SingleServer