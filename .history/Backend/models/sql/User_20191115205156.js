const Sequelize = require('sequelize');
const db = require('../../config/db_config_mysql');
 
module.exports = db.sequelize.define(
  'user',
  {
    id: {
      type: Sequelize.INTEGER(9),
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING(50),
      required: true
    },
    city: {
      type: Sequelize.STRING(50),
      required: true
    },
    state: {
      type: Sequelize.STRING(50),
      required: true
    },
    zip: {
      type: Sequelize.STRING(50),
      required: true
    },
    email: {
      type: Sequelize.STRING(100),
      required: true
      //validate: { isEmail: true },
      //unique: true
    },
    password: {
      type: Sequelize.STRING(200),
      required: true
    },
    phone_no: {
      type: Sequelize.STRING(20),
      defaultValue : null
    },
    profile_image: {
      type: Sequelize.STRING(200),
      defaultValue : null
    },
    description: {
      type: Sequelize.STRING(100),
      defaultValue:null
    },
    username: {
      type: Sequelize.STRING(30),
      defaultValue:null
    },
    d_o_b: {
      type: Sequelize.DATEONLY,
      required: true
    },
    created_on: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  }
)