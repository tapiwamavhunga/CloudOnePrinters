'use strict';
module.exports = (sequelize, DataTypes) => {
  var Printer = sequelize.define('Printer', {
     id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: false
    },
    status: {
      allowNull: false,
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      unique: false
    },  
    printer_ip: {
      allowNull: true,
      type: DataTypes.STRING,
      unique: false
    }, 
   
  },
  {
    timestamps: true
  })


  return Printer;
};
