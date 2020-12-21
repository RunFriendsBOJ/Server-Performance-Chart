import assert from 'assert'
import path from 'path'
import fetch from 'node-fetch'
import https from "https";
const { Posts, Post } = require('../ProtoBuf/config/proto/protobuf')
const server = `https://localhost:4000`

const agent = new https.Agent({
    rejectUnauthorized: false
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const protobufTest = () => describe('ProtoBuf Server Test', () => {
    it('ProtoBuf Server API TEST-1', async () => {
        const response: any = await fetch(server + '/post/1', {
            agent,
            method: 'GET',
        })
        const buffer = response.body._readableState.buffer.head.data
        assert.strictEqual(response.status, 200)
        assert(Buffer.isBuffer(buffer))
        const obj = Post.decode(buffer)
        assert.strictEqual(obj.id, 1)
    })
})

export { protobufTest }