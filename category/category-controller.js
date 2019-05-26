var categoryService = require('./category-service');
var baseUrl = "/api/category";

module.exports = (app) => {

    app.categoryModel = categoryService.CategoryModel;
    app.post(baseUrl + '/new', (req, res) => {
         categoryService.saveCategory(req, res);
    });

    app.get(baseUrl + '/all', (req, res) => {
        categoryService.getAllCategory(req, res);
    });

    app.get(baseUrl + '/paginate', (req, res) => {
        categoryService.getPeginatedCategory(req,res);
        
    });
}