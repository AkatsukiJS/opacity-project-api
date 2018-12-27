function getCategories(dbloki){
    const cat = dbloki.getCollection('categories');
    return cat.chain().find().data({removeMeta: true});
}

module.exports = getCategories;