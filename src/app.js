const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const app = new Koa();
const PORT = process.env.PORT || 3001;
const router = require('./routes')
const logger = require('koa-logger')
const RateLimit = require('koa2-ratelimit').RateLimit;
const helmet = require('koa-helmet')

const limiter = RateLimit.middleware({
  interval: { min: 15 },
  max: 450
})

app.use(helmet())
app.use(limiter)
app.use(logger())
app.use(bodyparser());
app.use(router.routes());
module.exports = app