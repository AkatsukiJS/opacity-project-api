const KoaRouter = require('koa-router')
const router = new KoaRouter()

const loki = require('lokijs');
const dbloki = new loki('data.db');
const db = require('../db')(dbloki);

db.seed();

router.get('/', async (ctx) => {
  ctx.body = "Hello friend";
});

router.get('/categories', async (ctx) => {
  const results = db.getCategories()
  ctx.body = results
});

router.get('/info', async (ctx) => {
  ctx.body = {
    month_year_version: '01-2018',
    remuneration_dictionary: 'http://www.portaltransparencia.gov.br/pagina-interna/603423-dicionario-de-dados-servidores-remuneracao',
    register_dictionary: 'http://www.portaltransparencia.gov.br/pagina-interna/603422-dicionario-de-dados-servidores-cadastro',
    data_source: 'http://www.portaltransparencia.gov.br/download-de-dados/servidores',
    api_repository: 'https://github.com/AkatsukiJS/opacity-project-api',
    servers_endpoint: 'http://www.portaltransparencia.gov.br/servidores/:id'
  }
})

router.get('/category', async (ctx) => {
  try{
    const {
        offset,
        limit,
        category,
        sort_by,
        order_by
    } = ctx.query

    const response = db.getServers({ offset, limit, category, sort_by, order_by })
    ctx.body = response
  }catch(err){
		console.error(err)
    ctx.throw(400, 'Bad Resquest')
  }
});

module.exports = router
