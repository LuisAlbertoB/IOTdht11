module.exports = (sequelize, Sequelize) => {
    const Parcela = sequelize.define('Parcela', {
      nombre: {
        type: Sequelize.STRING,
        allowNull: false
      },
      dispositivo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      // Cambiar JSONB a JSON
      datos: {
        type: Sequelize.JSON,  // Usar JSON en lugar de JSONB
        allowNull: false
      },
      fecha: {
        type: Sequelize.DATE,
        allowNull: false
      },
      hora: {
        type: Sequelize.TIME,
        allowNull: false
      }
    }, {
      timestamps: true
    });
  
    return Parcela;
  };
  