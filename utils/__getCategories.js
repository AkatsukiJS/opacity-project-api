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
    
    const keys = Object.keys(categories);
    
    const cat_array = keys.map((key) => [key, categories[key]]).sort((a, b) => {
        return b[1] - a[1];
    })
    
    return cat_array;
}

module.exports = getCategories;