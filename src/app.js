const Koa = require("koa");
const bodyparser = require("koa-bodyparser");
const app = new Koa();
const PORT = process.env.PORT || 3001;
const router = require('./routes')
const logger = require('koa-logger')
const RateLimit = require('koa2-ratelimit').RateLimit;
const helmet = require('koa-helmet')
const cors = require('@koa/cors')
const ORIGIN_ALLOWED = process.env.ORIGIN_ALLOWED || '*'

console.log({ ORIGIN_ALLOWED })

const limiter = RateLimit.middleware({
  interval: { min: 15 },
  max: 450
})

app.use(cors({ origin: ORIGIN_ALLOWED }))
app.use(helmet())
app.use(limiter)
app.use(logger())
app.use(bodyparser());
app.use(router.routes());
module.exports = app