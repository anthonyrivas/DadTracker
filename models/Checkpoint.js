module.exports = (sequelize, Sequelize) => {
    let Checkpoint = sequelize.define("Checkpoint", {
        cpType: {
            type: Sequelize.STRING,
            allowNull: false
        },
        value: {
            type: Sequelize.STRING,
            allowNull: false
        },
        image: {
            type: Sequelize.BOOLEAN,
            default: false
        },
        imageUrl: {
            type: Sequelize.STRING
        }
    })
    Checkpoint.associate = (models) => {
        Checkpoint.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        })
    }
    return Checkpoint;
}