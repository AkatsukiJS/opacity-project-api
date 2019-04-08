const app = require('../src/app')
const agent = require('supertest').agent(app.callback())

describe('[ GET ]:: Categories', () => {
  it('response data should be valid', async (done) => {
    const response = await agent.get('/categories')

    const {
      results
    } = response.body

    results.map(el => {
      expect(el).toMatchObject(
        expect.objectContaining({
          key: expect.any(String),
          label: expect.any(String),
          count: expect.any(Number)
        })
      )
    })
    done()
  })
})
