module.exports = (sequelize, Sequelize) => {
    const Cultivo = sequelize.define("cultivos", {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      temp_suelo: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      temp_aire: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      humedad: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      iluminacion: {
        type: Sequelize.FLOAT,
        allowNull: false
      }
    });
  
    Cultivo.associate = (models) => {
      Cultivo.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user'
      });
    };
  
    return Cultivo;
  };
  