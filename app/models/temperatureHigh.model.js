module.exports = (sequelize, Sequelize) => {
    const TemperatureHigh = sequelize.define("temperature_high", {
      sensorDataId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sensor_data', 
          key: 'id'
        }
      }
    });
  
    return TemperatureHigh;
  };
  