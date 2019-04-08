const KoaRouter = require('koa-router')
const router = new KoaRouter()

const loki = require('lokijs');
const dbloki = new loki('data.db');
const db = require('../db')(dbloki);

db.fill();

router.get('/', async (ctx) => {
  ctx.body = "Hello friend";
});

router.get('/categories', async (ctx) => {
  const results = db.getCategories()
  ctx.body = { results }
});

router.get('/info', async (ctx) => {
  ctx.body = {
    info : {
      month_year_version: '01-2018',
      remuneration_dictionary: 'http://www.portaltransparencia.gov.br/pagina-interna/603423-dicionario-de-dados-servidores-remuneracao',
      register_dictionary: 'http://www.portaltransparencia.gov.br/pagina-interna/603422-dicionario-de-dados-servidores-cadastro',
      data_source: 'http://www.portaltransparencia.gov.br/download-de-dados/servidores',
      api_repository: 'https://github.com/AkatsukiJS/opacity-project-api',
      servers_endpoint: 'http://www.portaltransparencia.gov.br/servidores/:id'
    }
  }
})

router.get('/category', async (ctx) => {
  ctx.body = {}
});

module.exports = router
