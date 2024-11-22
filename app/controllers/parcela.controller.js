const db = require("../models");
const Parcela = db.parcela;

// Create
exports.createParcela = (req, res) => {
  const { nombre, dispositivo, datos, fecha, hora } = req.body;

  // Validación básica
  if (!nombre || !dispositivo || !datos || !fecha || !hora) {
    return res.status(400).send({ message: "Todos los campos son requeridos." });
  }

  // Crear y guardar la parcela
  Parcela.create({ nombre, dispositivo, datos, fecha, hora })
    .then((parcela) => {
      res.status(201).send({ message: "Parcela creada exitosamente.", parcela });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al crear la parcela." });
    });
};

// read
exports.getParcelaById = (req, res) => {
  const id = req.params.id;

  Parcela.findByPk(id)
    .then((parcela) => {
      if (!parcela) {
        return res.status(404).send({ message: "Parcela no encontrada." });
      }
      res.status(200).send(parcela);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al obtener la parcela." });
    });
};

// read
exports.getAllParcelas = (req, res) => {
  Parcela.findAll()
    .then((parcelas) => {
      res.status(200).send(parcelas);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al obtener las parcelas." });
    });
};

//update
exports.updateParcela = (req, res) => {
    const id = req.params.id;
    const { nombre, dispositivo, datos, fecha, hora } = req.body;
  
    // Validación básica
    if (!nombre || !dispositivo || !datos || !fecha || !hora) {
      return res.status(400).send({ message: "Todos los campos son requeridos." });
    }
  
    Parcela.findByPk(id)
      .then(parcela => {
        if (!parcela) {
          return res.status(404).send({ message: "Parcela no encontrada." });
        }
  
        // Actualizar los campos de la parcela
        parcela.nombre = nombre;
        parcela.dispositivo = dispositivo;
        parcela.datos = datos;
        parcela.fecha = fecha;
        parcela.hora = hora;
  
        // Guardar los cambios
        parcela.save()
          .then(() => {
            res.status(200).send({ message: "Parcela actualizada exitosamente.", parcela });
          })
          .catch(err => {
            res.status(500).send({ message: err.message || "Error al actualizar la parcela." });
          });
      })
      .catch(err => {
        res.status(500).send({ message: err.message || "Error al buscar la parcela." });
      });
  };

// delete
exports.deleteParcela = (req, res) => {
  const id = req.params.id;

  Parcela.destroy({ where: { id } })
    .then((num) => {
      if (num === 1) {
        res.status(200).send({ message: "Parcela eliminada exitosamente." });
      } else {
        res.status(404).send({ message: "Parcela no encontrada." });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message || "Error al eliminar la parcela." });
    });
};
