/**
 *
 * @param {Object[]} list - servers list
 * @param {string[]} path_category - Path in Object to access category
 *
 * @example
 * path_category: ["cadastro", "DESCRICAO_CARGO"]
 *
 * @returns - Array or Object of categories
 */
function getCategories(list, path_category){
    const categories = {};

    list.forEach(element => {
        const cargo = path_category.reduce((acc, cur) => acc[cur], element);
        if(categories.hasOwnProperty(cargo)){
          categories[cargo]++;
        }else{
          categories[cargo] = 1;
        }
    });

    const labels = Object.keys(categories);
    const toKey = (str='') => str
      .normalize('NFD').replace(/[\u0300-\u036f]/g, "")
      .replace(/[^\d\w]/g, '_')
      .toUpperCase()

    const cat_array = labels.map((label) => ({label, key: toKey(label), count: categories[label]})).sort((a, b) => {
        return b.count - a.count;
    })

    return cat_array;
}

module.exports = getCategories;