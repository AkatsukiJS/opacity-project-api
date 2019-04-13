const app = require('../src/app')
const agent = require('supertest').agent(app.callback())

const getValue = (obj, path) => {
  const attrs = typeof path === 'string' ? path.split('.') : path
  return attrs.reduce((acc, cur) => acc[cur], obj)
}

function toBeValidCategoryResponse(received, expected){
  const {
    category_label,
    offset_value,
    result_length_value,
    sorted_by_attr_path,
    ordered_by,
  } = expected

  const { results, category, has_more_pages, offset } = received

  expect(category).toEqual(category_label)
  expect(offset).toEqual(offset_value)
  expect(has_more_pages).toEqual(expect.any(Boolean))

  expect(results.length).toEqual(result_length_value)

  results.map( el => {
    expect(el).toMatchObject(
      expect.objectContaining({
        id: expect.any(String),
        cadastro: expect.any(Object),
        remuneracao: expect.any(Object)
      })
    )
  })

  const compare = (a, b, path) =>
    ordered_by === 'ASC' ?
      getValue(a, path) <= getValue(b, path)
    : getValue(a, path) >= getValue(b, path)

  results.reduce((acc, cur) => {
    expect(
      compare(acc, cur, sorted_by_attr_path)
    ).toBeTruthy()
    return cur
  })
}


describe('[ GET ]:: Category', () => {
  it('should be a valid list, sorted by NAME, ascending, offset 0 and limit 5', async () => {
    const response = await agent.get('/category').query({
      offset: 0,
      limit: 5,
      category: 'PROFESSOR_DO_MAGISTERIO_SUPERIOR',
      sort_by: 'NAME',
      order_by: 'ASC'
    })
    toBeValidCategoryResponse(response.body, {
      category_label: 'PROFESSOR DO MAGISTERIO SUPERIOR',
      offset_value: 5,
      result_length_value: 5,
      sorted_by_attr_path: 'cadastro.NOME',
      ordered_by: 'ASC'
    })
  })


  it('should be a valid list, sorted by NAME, descending, offset 2 and limit 4', async () => {
    const response = await agent.get('/category').query({
      offset: 2,
      limit: 4,
      category: 'PROFESSOR_DO_MAGISTERIO_SUPERIOR',
      sort_by: 'NAME',
      order_by: 'DESC'
    })
    toBeValidCategoryResponse(response.body, {
      category_label: 'PROFESSOR DO MAGISTERIO SUPERIOR',
      offset_value: 6,
      result_length_value: 4,
      sorted_by_attr_path: 'cadastro.NOME',
      ordered_by: 'DESC'
    })
  })


  it('should be a valid list, sorted by R_BRUTE, descending, offset 1 and limit 3', async () => {
    const response = await agent.get('/category').query({
      offset: 1,
      limit: 3,
      category: 'ASSISTENTE_EM_ADMINISTRACAO',
      sort_by: 'R_BRUTE',
      order_by: 'DESC'
    })
    toBeValidCategoryResponse(response.body, {
      category_label: 'ASSISTENTE EM ADMINISTRACAO',
      offset_value: 4,
      result_length_value: 3,
      sorted_by_attr_path: ['remuneracao','REMUNERAÇÃO BÁSICA BRUTA (R$)'],
      ordered_by: 'DESC'
    })
  })


  it('should be a valid list, sorted by R_BRUTE, ascending, offset 0 and limit 3', async () => {
    const response = await agent.get('/category').query({
      offset: 0,
      limit: 3,
      category: 'ASSISTENTE_EM_ADMINISTRACAO',
      sort_by: 'R_BRUTE',
      order_by: 'ASC'
    })
    toBeValidCategoryResponse(response.body, {
      category_label: 'ASSISTENTE EM ADMINISTRACAO',
      offset_value: 3,
      result_length_value: 3,
      sorted_by_attr_path: ['remuneracao','REMUNERAÇÃO BÁSICA BRUTA (R$)'],
      ordered_by: 'ASC'
    })
  })


  it('should be a valid list, sorted by R_LIQUID, descending, offset 1 and limit 4', async () => {
    const response = await agent.get('/category').query({
      offset: 1,
      limit: 4,
      category: 'TECNICO_DE_LABORATORIO_AREA',
      sort_by: 'R_LIQUID',
      order_by: 'DESC'
    })
    toBeValidCategoryResponse(response.body, {
      category_label: 'TECNICO DE LABORATORIO AREA',
      offset_value: 5,
      result_length_value: 4,
      sorted_by_attr_path: ['remuneracao','REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (R$)'],
      ordered_by: 'DESC'
    })
  })


  it('should be a valid list, sorted by R_LIQUID, ascending, offset 0 and limit 4', async () => {
    const response = await agent.get('/category').query({
      offset: 0,
      limit: 4,
      category: 'TECNICO_DE_LABORATORIO_AREA',
      sort_by: 'R_LIQUID',
      order_by: 'ASC'
    })
    toBeValidCategoryResponse(response.body, {
      category_label: 'TECNICO DE LABORATORIO AREA',
      offset_value: 4,
      result_length_value: 4,
      sorted_by_attr_path: ['remuneracao','REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (R$)'],
      ordered_by: 'ASC'
    })
  })
})
