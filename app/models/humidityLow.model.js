module.exports = (sequelize, Sequelize) => {
    const HumidityLow = sequelize.define("humidity_low", {
      sensorDataId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'sensor_data', 
          key: 'id'
        }
      }
    });
  
    return HumidityLow;
  };
  