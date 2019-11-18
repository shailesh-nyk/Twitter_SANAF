const Sequelize = require('sequelize')
const dbConfig = {}
const sequelize = new Sequelize('twitter', 'admin', 'adminadmin', {
  host: 'twitter.cte8btlknr8e.us-east-2.rds.amazonaws.com',
  dialect: 'mysql',
  operatorsAliases: false,
  logging:true,
      dialectOptions: {
            useUTC: false, //for reading from database
            dateStrings: true,
            typeCast: true
      },
      timezone: '-08:00', //for writing to database
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

dbConfig.sequelize = sequelize
dbConfig.Sequelize = Sequelize

module.exports = dbConfig

