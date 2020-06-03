const db = require("../models");

module.exports = function (app) {
    // POST route for saving a new inventory item. We can create todo with the data in req.body
    //POST route for CREATING
    app.post("/api/inventory/create", function (req, res) {
        console.log(req.body)
        db.Inventory.create(req.body).then((response) => {
            res.json(response);

        });

    });

    // GET route for READING
    app.get("/api/inventory/:truckID", function (req, res) {
        console.log(req.params)
        db.Inventory.findAll({
            where: {
                TruckId: req.params.truckID
            }
        }).then(function (crusine_db) {
            // returns a JSON object with table contents?????

            res.json(crusine_db);
        });
    });

    // // PUT route for UPDATING not using parameters
    // app.put("/api/inventory", function (req, res) {
    //     console.log("UPDATE ROUTE HIT");
    //     db.Post.update(
    //         req.body,
    //         {
    //             where: {
    //                 id: req.body.id
    //             }
    //         }).then(function (crusine_db) {
    //             res.json(crusine_db);
    //         });
    // });

    // PUT route for UPDATING using parameters
    app.put("/api/inventory/:id", function (req, res) {
        console.log("UPDATE ROUTE HIT");
        db.Post.update({
            where: {
                id: req.params.inventoryID
            }
        }).then(function (crusine_db) {
            res.json(crusine_db);
        });
    });


    app.delete("/api/inventoryDel/:id", function (req, res) {
        console.log("DELETE ROUTE HIT");
        console.log(req.params.id)
        db.Inventory.destroy({
            where: {
                id: req.params.id
            }
        }).then(function (crusine_db) {
            res.json(crusine_db);
        });
    });


    app.put("/api/inventory/", function (req, res) {
        console.log("UPDATE ROUTE HIT");
        console.log(req.body)
        db.Inventory.update(
            req.body,
            {
                where: {
                    id: req.body.id
                }
            }).then(function (crusine_db) {
                res.json(crusine_db);
            });
    });

};