/**
 * Filter the data from CSV "Remuneração" of "Portal da Tranparencia"
 * @param OBJECT_REGISTERS {object} - registers extracted from "Cadastro"
 * @param FILE {string} - Filename of CSV "Remuneração"
 * @param TYPE_RETURN {('LIST'|'OBJECT')} - Type of return
 * 
 * @returns - Result merged in a Array or Object
 */
function filter_merge_by_id(OBJECT_REGISTERS, FILE, TYPE_RETURN){
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
    
          const to_float = [
            "REMUNERAÇÃO BÁSICA BRUTA (R$)", 
            "REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (R$)"
          ];

          list_values.forEach((elem, i) => {
              obj[keys[i]] = to_float.includes(keys[i])
              ? parseFloat(elem.replace(',', '.'))
              : elem;
          });
    
          const id_portal = obj['Id_SERVIDOR_PORTAL'];

          if( OBJECT_REGISTERS.hasOwnProperty(id_portal) ){
            const cadastro = OBJECT_REGISTERS[id_portal];
            delete cadastro['Id_SERVIDOR_PORTAL'];

            obj = {'id': id_portal, cadastro, remuneracao: obj};

            if(TYPE == 'OBJECT'){
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
  
  module.exports = filter_merge_by_id;