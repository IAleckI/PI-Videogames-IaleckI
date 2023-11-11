const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true
    },
    platform:{
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    image:{
      type: DataTypes.STRING,
      allowNull: false
    },
    date:{
      type:DataTypes.DATE,
      allowNull: false
    },
    rating:{
      type: DataTypes.FLOAT,
      allowNull: false  
    }

  },{
    timestamps: false
  });
};