module.exports = (sequelize, Sequelize) => {
    const HumidityHigh = sequelize.define("humidity_high", {
      sensorDataId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sensor_data', 
          key: 'id'
        }
      }
    });
  
    return HumidityHigh;
  };
  