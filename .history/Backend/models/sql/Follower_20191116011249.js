const Sequelize = require('sequelize');
const db = require('../../config/db_config_mysql');

module.exports = db.sequelize.define(
    'Follower',
    {
        id: {
            type: Sequelize.INTEGER(9),
            primaryKey: true,
            autoIncrement: true
          },
        UserID: {
            type: Sequelize.INTEGER(9),
        },
        FollowerID: {
            type: Sequelize.INTEGER(9),
        },
        CreatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        },
        UpdatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
      timestamps: true,
      freezeTableName : true,
      tableName : 'Follower'
    }
)