const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const app = new Koa();
const PORT = process.env.PORT || 3001;
const router = require('./routes')
const logger = require('koa-logger')

app.use(logger())
app.use(bodyparser());
app.use(router.routes());

module.exports = app