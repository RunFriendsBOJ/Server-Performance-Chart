import assert from 'assert'
import fetch from 'node-fetch'

const server = `http://localhost:3000/graphql`

describe('GQL Server Test', () => {
  it('GQL Server API TEST-1', async () => {
    const query = `
        query{
            getIdByPost(id:1){
              id
              title
              content
            }
          }
        `
    const response: any = await fetch(server, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })
    const data = await response.json()
    assert.strictEqual(response.status, 200)
    assert.strictEqual(data.data.getIdByPost.id, 1)
  })

  it('GQL Server API TEST-2', async () => {
    const query = `
        query{
            getIdByPost(id:100){
              id
              title
              content
            }
          }
        `
    const response: any = await fetch(server, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })
    const data = await response.json()
    assert.strictEqual(response.status, 200)
    assert.strictEqual(data.data.getIdByPost.id, 100)
  })

  it('GQL Server API TEST-3', async () => {
    const query = `
        query{
            getAllPosts{
              id
              title
              content
            }
          }
        `
    const response: any = await fetch(server, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })
    const data = await response.json()
    assert.strictEqual(response.status, 200)
    assert.strictEqual(data.data.getAllPosts[0].id, 1)
  }, 1000000)

  it('GQL Server API TEST-4', async () => {
    const query = `
        query{
            getAllPosts{
              id
            }
          }
        `
    const response: any = await fetch(server, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ query })
    })
    const data = await response.json()
    assert.strictEqual(response.status, 200)
    assert.strictEqual(data.data.getAllPosts[0].id, 1)
  }, 1000000)
})
