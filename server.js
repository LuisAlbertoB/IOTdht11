  const express = require("express");
  const cors = require("cors");

  const app = express();

  // Configuración de CORS
var corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type,Authorization"
};

  app.use(cors(corsOptions));

  // Parse requests of content-type - application/json
  app.use(express.json());

  // Parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

  // Database
  const db = require("./app/models");
  const Role = db.role;

  // Synchronize the database and create tables if they don't exist
  db.sequelize.sync({ force: false }).then(() => {  // Set force: false to avoid dropping existing tables
    console.log("Database synced successfully.");

    // Call initial function to create roles if they don't exist
    initial();
  });

  // Simple route
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to the application." });
  });

  // Routes
  require('./app/routes/auth.routes')(app);
  require('./app/routes/user.routes')(app);
  require('./app/routes/parcela.routes')(app);
  require('./app/routes/cultivo.routes')(app);
  require('./app/routes/sensorData.routes')(app);
  require('./app/routes/humidityHigh.routes')(app);
  require('./app/routes/humidityLow.routes')(app);
  require('./app/routes/temperatureHigh.routes')(app);
  require('./app/routes/temperatureLow.routes')(app);
  require('./app/routes/statistics.routes')(app);
  require('./app/routes/spoiledBread.routes')(app);

  // Import the MQTT service to connect to the broker and subscribe
  require('./app/services/mqttService');  // Import the MQTT service

  // Set port and listen for requests
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}.`);
  });

  // Function to create roles if they don't exist
  function initial() {
    Role.findOrCreate({
      where: { name: "user" }
    }).then(([role, created]) => {
      if (created) {
        console.log("Role 'user' created.");
      } else {
        console.log("Role 'user' already exists.");
      }
    });

    Role.findOrCreate({
      where: { name: "moderator" }
    }).then(([role, created]) => {
      if (created) {
        console.log("Role 'moderator' created.");
      } else {
        console.log("Role 'moderator' already exists.");
      }
    });

    Role.findOrCreate({
      where: { name: "admin" }
    }).then(([role, created]) => {
      if (created) {
        console.log("Role 'admin' created.");
      } else {
        console.log("Role 'admin' already exists.");
      }
    });
  }
