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

function getPage({
  DB: dbloki,
  offset,
  limit,
  category,
  sort_by,
  order_by
}){
    const _offset = parseInt(offset) || 0
    const _limit = parseInt(limit) || 10
    const _category = category || ''
    const _sort_by = sort_by || 'NAME'
    const _order_by = order_by || 'ASC'

    const categories = dbloki.getCollection('categories');
    const categoryFound = categories.findOne({ "key": category })
    if(!categoryFound) throw new Error("Wrong category")
    const servers = dbloki.getCollection('servers');
    const list = servers.chain().find({ "cadastro.DESCRICAO_CARGO": categoryFound.label });

    let list_ord = list;

    if(_sort_by){
      switch(_sort_by){
        case 'NAME':
          list_ord = _order_by === 'DESC'
          ? list.sort(sort_by_name_decres)
          : list.sort(sort_by_name_cres);
          break;

        case 'R_BRUTE':
          list_ord = _order_by === 'DESC'
          ? list.sort(sort_by_rbrute_decres)
          : list.sort(sort_by_rbrute_cres);
          break;

        case 'R_LIQUID':
          list_ord = _order_by === 'DESC'
          ? list.sort(sort_by_rliquid_decres)
          : list.sort(sort_by_rliquid_cres);
          break;

        default:
          list_ord = _order_by === 'DESC'
          ? list.sort(sort_by_name_decres)
          : list.sort(sort_by_name_cres);
      }
    }

    const base = _offset;
		const rawResults = list_ord.data({ removeMeta: true })
		const results = rawResults.slice(base, base + _limit)

    return {
      results,
      has_more_pages: rawResults.length === base + _limit,
      category: categoryFound.label,
      offset: _offset
    }
    // results, category, has_more_pages, offset
}

module.exports = getPage;