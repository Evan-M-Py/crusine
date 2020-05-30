const db = require("../models");



module.exports = function(app) {
    app.get("/api/pieChart/:category/:truckID", function (req, res) {
            db.Inventory.findAll({
                where: {
                    TruckId: req.params.truckID,
                    category: req.params.category
                  }
        }).then(function (response) {
                res.json(response);
            });

    });


    app.get("/api/barGraph/:category/:truckID", function (req, res) {
        db.Expense.findAll({
            where: {
                TruckId: req.params.truckID,
                category: req.params.category
                }
    }).then(function (response) {
            res.json(response);
        });

    });

};
