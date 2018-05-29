module.exports = (sequelize, Sequelize) => {
    let Message = sequelize.define("Message", {
        message: {
            type: Sequelize.STRING,
            allowNull: false
        }
    })
    Message.associate = (models) => {
        Message.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Message;
}