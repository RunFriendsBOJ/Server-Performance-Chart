import assert from 'assert'
import fetch from 'node-fetch'
import https from "https"


const { Posts, Post } = require('../config/proto/protobuf')
const server = `https://localhost:4000`

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

describe('ProtoBuf Server Test', () => {
    it('ProtoBuf Server API TEST-1', async () => {
        const response: any = await fetch(server + '/post/1', {
            method: 'GET',
        })
        const buffer = await response.buffer()
        assert.strictEqual(response.status, 200)
        assert(Buffer.isBuffer(buffer))
        const obj = Post.decode(buffer)
        assert.strictEqual(obj.id, 1)
    })

    it(`ProtoBuf Server API TEST-2`, async () => {
        const response = await fetch(server + "/post/1000", {
            method: 'GET'
        })

        const buffer = await response.buffer()
        assert.strictEqual(response.status, 200)
        const obj = Post.decode(buffer)
        assert.strictEqual(obj.id, 1000)
    })

    it('ProtoBuf Server API TEST-3', async () => {
        const response = await fetch(server + "/post/all", {
            method: 'GET'
        })
        const buffer = await response.buffer()
        assert(Buffer.isBuffer(buffer))
        const obj = Posts.decode(buffer)
        assert.strictEqual(obj.items[0].id, 1)
        assert.strictEqual(obj.items.length, 1000)
    }, 1000000)

})
