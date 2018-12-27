'use strict';
const filter_by_org = require('./__filter-by-org');
const filter_merge_by_id = require('./__filter-merge-by-id');
const getCategories = require('./__getCategories');
const fs = require('fs');

/* 
    data:
    http://www.portaltransparencia.gov.br/download-de-dados/servidores
*/

const DATA_DIR = './data';
const OUT_DIR = './output';
const make_path_data = (filename) => DATA_DIR + '/' + filename;
const make_path_out = (filename) => OUT_DIR + '/' + filename;

const CADASTRO_CSV = '20180131_Cadastro.csv';
const REMUNERACAO_CSV = '20180131_Remuneracao.csv';

const PATH_CADASTRO = make_path_data(CADASTRO_CSV);
const PATH_REMUNERACAO = make_path_data(REMUNERACAO_CSV);

const PATH_REGISTERS = make_path_out('registers.json');
const PATH_SERVERS = make_path_out('servers.json');
const PATH_CATEGORIES = make_path_out('categories.json');

const ID_ORG = '26279';

const saveToJSON = (path, object) => new Promise((resolve, reject) => {
    fs.writeFile(path, JSON.stringify(object), (err) => {
        (err && reject(err) ) || resolve()
    })
});

// ACTION

filter_by_org(PATH_CADASTRO, ID_ORG, "OBJECT")
.then( result => {
    return saveToJSON(PATH_REGISTERS, result)
    .then(() => {
        console.log("Done! Registers.json saved!");
        return result;
    });
})
.then( result => {
    return filter_merge_by_id(result, PATH_REMUNERACAO, "LIST")
    .then( merge => {
        return saveToJSON(PATH_SERVERS, merge)
        .then(() => {
            console.log("Done! servers.json saved.");
            return merge;
        });
    });
})
.then( (merge) => {    
    const categories = getCategories(merge, ["cadastro", "DESCRICAO_CARGO"])
    saveToJSON(PATH_CATEGORIES, categories)
      .then(() => {
        console.log("All done! categories.json saved");
      })
})