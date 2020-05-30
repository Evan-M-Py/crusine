const db = require("../models")
const passport = require('passport');

module.exports = function (app) {
    //User API routes go here
    app.post("/api/createuser", function (req, res) {
        console.log("New User:")
        console.log(req.body)
            db.User.create({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                phoneNumber: req.body.phoneNumber,
                email: req.body.email,
                username: req.body.username,
                password: req.body.password
            }).then(user => {
                console.log(user)
                db.Truck.create({
                    truckName: req.body.truckName,
                    UserId: user.dataValues.id
                }).then(truck => {
                // This sends back the new user and truck data as an object
                // Now we can save this in state
                console.log(user.dataValues.id);
                return res.json({user, truck});
            })
        })
    })
    app.post('/login', passport.authenticate('local'), (req, res) => {
        // console.log(req.user)
        
        db.Truck.findAll({
            
            where: {
                UserId: req.user.dataValues.id
              },

        }).then(function (trucks) {
            console.log(`truckID:  ${trucks}`);
            console.log(`UserID: ${req.user.dataValues.id}`)
            res.status(200).json({ userObj: req.user.dataValues, truckObj: trucks });
        });


    })

    app.get("/logout", function(req, res) {
        req.logout();
        
    });
}