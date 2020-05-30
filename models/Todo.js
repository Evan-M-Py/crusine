module.exports = function (sequelize, DataTypes) {
    const Todo = sequelize.define('Todo', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        complete: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
        }
    });

    Todo.associate = function (models) {
        // Associating Author with Posts
        // When an Author is deleted, also delete any associated Posts
        Todo.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        });
        Todo.belongsTo(models.Truck, {
            as: 'truck',
            foreignKey: 'truck_id'
        });
    };

    return Todo;
};