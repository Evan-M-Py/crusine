const Truck = require("../models/Truck");

module.exports = function(app) {
    app.get("/api/truck/:userID", function (req, res) {
        db.Truck.findAll({
            // where: {
            //     userID: req.params.userID
            //   }
        }).then(function (crusine_db) {
            res.json(crusine_db);
        });
    });

}