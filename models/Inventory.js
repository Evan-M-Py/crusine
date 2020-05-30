module.exports = function (sequelize, DataTypes) {
    const Inventory = sequelize.define("Inventory", {
        itemName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.STRING,
            allowNull: false
        },
        unit: {
            type: DataTypes.STRING,
            allowNull: false
        },
        price: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    Inventory.associate = function (models) {

        Inventory.belongsTo(models.Truck, {
            foreignKey: { allowNull: false }
        });
    };

    return Inventory;
};