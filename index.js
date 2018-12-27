const loki = require('lokijs');
const dbloki = new loki('data.db');
const db_utils = require('./db');

db_utils.fill(dbloki);

const Koa = require("koa");
const router = new require("koa-router")();
const bodyparser = require("koa-bodyparser");
const App = new Koa();
const PORT = process.env.PORT || 3001;

router.get('/', async (ctx) => {
  ctx.body = "Hello friend";
});

router.get('/categories', async (ctx) => {
  ctx.body = db_utils.getCategories(dbloki);
});

router.post('/category', async (ctx) => {
  const {
    from, category = '', desc, order_by
  } = ctx.request.body;

  ctx.body = db_utils.getServers({
    DB: dbloki,
    category,
    from: parseInt(from),
    order: {
      by: order_by,
      descending: desc == 'true'
    }
  });
});

App.use(bodyparser());
App.use(router.routes());

App.listen(PORT, () => {
  console.log(`Server on port ${PORT}`)
})