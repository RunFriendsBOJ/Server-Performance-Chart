import fetch from 'node-fetch'
import assert from 'assert'
const server = `http://localhost:7777`
const restServer = `http://localhost:5000`
const protoServer = `https://localhost:4000`


describe(`Main Server Test`, () => {
    it(`REST Artillery Test-1`, async () => {
        const data = {
            address: restServer + '/post/all',
            duration: 2,
            arrivalRate: 4,
            clientCount: 4
        }
        const response = await fetch(`${server}/rest/rest-test-1`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()
        assert.strictEqual(json.intermediate[0].requestsCompleted, 32)
        assert.strictEqual(json.intermediate[0].latencies.length, 32)
    }).timeout(50000)

    it(`REST Artillery Test-2`, async () => {
        const data = {
            address: restServer + '/post/all',
            duration: 5,
            arrivalRate: 10,
            clientCount: 10
        }
        const response = await fetch(`${server}/rest/rest-test-2`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()
        assert.strictEqual(json.intermediate[0].requestsCompleted, 500)
        assert.strictEqual(json.intermediate[0].latencies.length, 500)
    }).timeout(50000)

    it(`REST Artillery Test-3`, async () => {
        const data = {
            address: restServer + '/post/1',
            duration: 5,
            arrivalRate: 10,
            clientCount: 10
        }
        const response = await fetch(`${server}/rest/rest-test-3`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()
        assert.strictEqual(json.intermediate[0].requestsCompleted, 500)
        assert.strictEqual(json.intermediate[0].latencies.length, 500)
    }).timeout(50000)

    it(`ProtoBuf Artillery Test-1`, async () => {
        const data = {
            address: protoServer + '/post/1',
            duration: 2,
            arrivalRate: 4,
            clientCount: 4
        }

        const response = await fetch(`${server}/protobuf/proto-test-1`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json' }
        })

        const json = await response.json()
        console.log(json)
    }).timeout(50000)
})