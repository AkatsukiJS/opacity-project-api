const sort_by_name = (ra, rb) =>  (a, b) => {
  const bb = b["cadastro"]["NOME"];
  const aa = a["cadastro"]["NOME"];
  return (aa == bb) ? 0 : (aa > bb) ? ra : rb;
}
const sort_by_name_cres = sort_by_name(1, -1);
const sort_by_name_decres = sort_by_name(-1, 1);

const sort_by_remun = (attr) => (ra, rb) => (a, b) => {
  const bb = b["remuneracao"][attr];
  const aa = a["remuneracao"][attr];
  return (aa == bb) ? 0 : (aa > bb) ? ra : rb;
}
const sort_by_rliquid = sort_by_remun("REMUNERAÇÃO APÓS DEDUÇÕES OBRIGATÓRIAS (R$)");
const sort_by_rbrute = sort_by_remun("REMUNERAÇÃO BÁSICA BRUTA (R$)");
const sort_by_rliquid_cres = sort_by_rliquid(1, -1);
const sort_by_rliquid_decres = sort_by_rliquid(-1, 1);
const sort_by_rbrute_cres = sort_by_rbrute(1, -1);
const sort_by_rbrute_decres = sort_by_rbrute(-1, 1);

function getPage({DB: dbloki, category, from=0, order}){

    const servers = dbloki.getCollection('servers');
    const list = servers.chain().find({ "cadastro.DESCRICAO_CARGO": category });

    let list_ord = list;

    if(order){
      switch(order.by){
        case 'NAME':
          list_ord = order.descending === true
          ? list.sort(sort_by_name_decres)
          : list.sort(sort_by_name_cres);
          break;

        case 'R_BRUTE':  
          list_ord = order.descending === true
          ? list.sort(sort_by_rbrute_decres)
          : list.sort(sort_by_rbrute_cres);
          break;

        case 'R_LIQUID': 
          list_ord = order.descending === true
          ? list.sort(sort_by_rliquid_decres)
          : list.sort(sort_by_rliquid_cres);
          break;

        default:
          list_ord = order.descending === true
          ? list.sort(sort_by_name_decres)
          : list.sort(sort_by_name_cres);
      }
    }

    const base = isNaN(from) ? 0 : from < 0 ? 0 : from;

    return list_ord.data({ removeMeta: true }).slice(base, base + 10);
}

module.exports = getPage;