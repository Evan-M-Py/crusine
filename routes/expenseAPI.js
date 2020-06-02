const db = require("../models");

module.exports = function (app) {
    app.post("/api/expense/create", function (req, res) {
        db.Expense.create(req.body).then(function (crusine_db) {
            res.json(crusine_db);
        });

    });

    app.get("/api/expense/:truckID", function (req, res) {
        db.Expense.findAll({
            where: {
                TruckId: req.params.truckID,
              }
        }).then(function (crusine_db) {
            // returns a JSON object with table contents?????

            res.json(crusine_db);
        });
    });

    app.delete("/api/expenseDel/:expenseID", function (req, res) {
        console.log("DELETE ROUTE HIT");
        console.log(req.params.expenseID)
        db.Expense.destroy({
            where: {
                id: req.params.expenseID
            }
        }).then(function (crusine_db) {
            res.json(crusine_db);
        });
    });

    app.put("/api/expense/", function(req, res) {
        console.log("UPDATE ROUTE HIT");
        console.log(req.body)
        db.Expense.update(
            req.body,
            {
            where: {
                id: req.body.id
            }
          }).then(function(crusine_db) {
          res.json(crusine_db);
        });
      });
}