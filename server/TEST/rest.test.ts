import assert from 'assert'
import fetch from 'node-fetch'

const server = `http://localhost:5000`

describe('REST Server Test', () => {
    it('REST Server API TEST-1', async () => {
        const response: any = await fetch(server + '/post/1', {
            method: 'GET',
        })
        const data = await response.json()
        assert.strictEqual(response.status, 200)
        assert.strictEqual(data.id, 1)
    })

    it('REST Server API TEST-2', async () => {
        const response: any = await fetch(server + '/post/100', {
            method: 'GET',
        })
        const data = await response.json()
        assert.strictEqual(response.status, 200)
        assert.strictEqual(data.id, 100)
    })

    it('REST Server API TEST-3', async () => {
        const response: any = await fetch(server + '/post/all', {
            method: 'GET',
        })
        const data = await response.json()
        assert.strictEqual(response.status, 200)
        assert.strictEqual(data.items[0].id, 1)
        assert.strictEqual(data.items.length, 1000)
    }, 1000000)
})
