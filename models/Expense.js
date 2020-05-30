module.exports = function (sequelize, DataTypes) {
    const Expense = sequelize.define("Expense", {
        expense: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.DECIMAL(6, 2),
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    Expense.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Expense.belongsTo(models.Truck, {
            foreignKey: { allowNull: false }
        });
    };

    return Expense;
};