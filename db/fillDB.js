function fill(dbloki){
    const data_servers = require('../output/servers.json');
    const data_categories = require('../output/categories.json');
    
    servers = dbloki.addCollection('servers');
    categories = dbloki.addCollection('categories');

    servers.insert(data_servers);
    categories.insert(data_categories);

    console.log('Finish fill in db');
}

module.exports = fill;