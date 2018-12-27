/**
 * Filter the data from CSV "Cadastro" of "Portal da Tranparencia"
 * @param FILE {string} - Path to CSV "Cadastro"
 * @param ID_ORG {string} - Id of organization
 * @param TYPE_RETURN {('LIST'|'OBJECT')} - Type of return
 */
function filter_by_org(FILE, ID_ORG, TYPE_RETURN){
  return new Promise((resolve, reject) => {
    'use strict';

    const fs = require('fs');
    const make_readliner = (filename) => require('readline').createInterface({
        input: fs.createReadStream(filename, {encoding: 'latin1'}),
    });
    const readline_cadastro = make_readliner(FILE);
    const extract_line = (line) => line.split(';').map(str => str.replace(/"/g, ''));
  

    let counter = 0;
    let keys = [];
    const list_all_servers = [];
    const object_all_servers = {};

    // Resolve type
    const TYPE = (['LIST', 'OBJECT'].includes(TYPE_RETURN) && TYPE_RETURN) || 'OBJECT';

    readline_cadastro.on('line', (line, err) => {
      if(err) {
        reject(err);
      }else if(counter > 0) {
        let list_values = extract_line(line);
        let obj = {};
  
        list_values.forEach((elem, i) => {
          obj[keys[i]] = elem;
        });
  
        if(obj['COD_ORG_EXERCICIO'] == ID_ORG ){
          if(TYPE == 'OBJECT'){
            const id_portal = obj['Id_SERVIDOR_PORTAL'];
            object_all_servers[id_portal] = obj;
          }else{
            list_all_servers.push(obj);
          }
          counter++;
        }        
      }else{
        keys = extract_line(line);
        // console.log(keys)
        counter++;
      }
    }).on('close', () => {
      if(TYPE == 'OBJECT'){ resolve(object_all_servers); }
      else { resolve(list_all_servers); }
    });
  });
}

module.exports = filter_by_org;