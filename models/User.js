module.exports = (sequelize, Sequelize) => {
    let User = sequelize.define("User", {
        email: {
            type: Sequelize.STRING,
            allowNull: false
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    User.associate = (models) => {
        User.hasMany(models.Checkpoint, {
            foreignKey: {
                onDelete: "cascade"
            }
        });
    }
    return User;
}