const _seed = require('./seed');
const _getCategories = require('./getCategories');
const _getServers = require('./getServers');

module.exports = (dbloki) => ({
  getCategories: () => _getCategories(dbloki),
  seed: () => _seed(dbloki),
  getServers: (args) => _getServers({ DB: dbloki, ...args })
})