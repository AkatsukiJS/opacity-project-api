const _fill = require('./fillDB');
const _getCategories = require('./getCategories');
const _getServers = require('./getServers');

module.exports = (dbloki) => ({
  getCategories: () => _getCategories(dbloki),
  fill: () => _fill(dbloki),
  getServers: (args) => _getServers({ DB: dbloki, ...args })
})