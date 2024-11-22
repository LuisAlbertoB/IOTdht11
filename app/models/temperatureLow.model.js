module.exports = (sequelize, Sequelize) => {
    const TemperatureLow = sequelize.define("temperature_low", {
      sensorDataId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sensor_data', 
          key: 'id'
        }
      }
    });
  
    return TemperatureLow;
  };
  