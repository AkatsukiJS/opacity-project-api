const App = require('./app.js')

const PORT = process.env.PORT || 3000

App.listen(PORT, () => {
  console.log(`Server running on port: ${ PORT }`)
})
