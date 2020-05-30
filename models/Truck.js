module.exports = function (sequelize, DataTypes) {
    const Truck = sequelize.define("Truck", {
        truckName: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Truck.associate = function (models) {
        // We're saying that a Trucks should belong to an User
        // A Trucks can't be created without an User due to the foreign key constraint
        Truck.belongsTo(models.User, {
            foreignKey: { allowNull: false }
        });
    };

    Truck.associate = function (models) {
        Truck.hasMany(models.Inventory, {
            onDelete: "cascade"
        });
    };

    Truck.associate = function (models) {
        Truck.hasMany(models.Expense, {
            foreignKey: { allowNull: false }
        });
    };

    return Truck;
};