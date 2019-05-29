var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1/assessment')

var categorySchema = mongoose.Schema({
    name : String,
    description : String
});

var CategoryModel = mongoose.model("category", categorySchema);

module.exports.saveCategory = (req,res) => {
        CategoryModel.findOne({name:req.body.name}, function(err, response) {
            if (err) {
                res.status(500).send("Database error occurred");
                return;
            }
            if (response != null) {
                res.status(409).send("Catrgory with name " + req.body.name + " already exists");
                return;
            }
            var category = new CategoryModel(req.body)
            category.save(req.body, function(err, data) {
                if (err) {
                res.status(500).send("Database error occurred");
                return;
                }
                res.status(200).send("Category successfully added");
                return;
            });
        });
}

module.exports.getAllCategory = (req, res) => {
    CategoryModel.find(null, "name description", function(err, data) {
        if (err) {
            res.status(500).send("Database error occurred");   
            return;             
        }
        res.status(200).send(data);
        return;
    });
}

module.exports.getPeginatedCategory = (req, res) => {

    var pageNo = req.query.pageNo;
        var pageSize = req.query.pageSize;

        var query = {};
        var paginatedResult = {};
        query.skip = (pageNo*pageSize);
        query.limit = parseInt(pageSize);
        query.sort = {_id : -1}
        CategoryModel.find({},["name", "description"], query, function(err, data) {
            if (err) {
                console.log("Error occurred due to " + err);
                res.status(500).send("Database error occurred");   
                return;
            }
            debugger;
            console.log("Fetched data is " + JSON.stringify(data));
            paginatedResult.content = data;
            CategoryModel.count({}, function(err, count) {
                if (err) {
                    console.log("Error occurred due to " + err);
                    res.status(500).send("Database error occurred");   
                    return;
                }
                console.log("Count is " + JSON.stringify(count));
                paginatedResult.totalSize = count;
                paginatedResult.totalPages = Math.ceil(count/pageSize);
                res.status(200).send(paginatedResult);
                return; 
            });      
        })
}

module.exports.categoryModel = CategoryModel;