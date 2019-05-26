var mongoose = require('mongoose');
var bookSchema = mongoose.Schema({
    author : String,
    dateAdded : Date,
    isbn : String,
    title : String,
    categoryId : String
});

var BookModel = mongoose.model("book", bookSchema);

var baseUrl = '/api/book';

module.exports = function(app) {

    app.post(baseUrl + '/new', (req, res) => {
        // validate
        var categoryName = req.body.categoryName;
        if (!categoryName) {
            res.send("Category name is required");
            return;
        }
        
        app.categoryModel.find({name:categoryName}, function(err, result) {
            if (!result || result.length < 1) {
                res.status(500).send("Category supplied not found");
                return;   
            }
            req.body.categoryId = result[0]._id;

            var bookModel = new BookModel(req.body);
            bookModel.save(req.body, (err, data) => {
                if (err) {
                    console.log("Error occurred due to " + err);
                    res.status(500).send("Database error occurred");
                    return;
                }
                res.status(200).send("Book added successfully");
                return;
            })

        })
    });

    

}