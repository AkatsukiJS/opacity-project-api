function getCategories(dbloki){
    const cat = dbloki.getCollection('categories');
    return cat.find();
}

module.exports = getCategories;