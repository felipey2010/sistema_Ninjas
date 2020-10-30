const mongoose = require("mongoose");

const Ninjas = mongoose.model("ninjas");

module.exports = {
  async index(req, res) {
    const dadoNinja = await Ninjas.find();
    return res.json(dadoNinja);
  },
  async getNinjas(req, res) {
    Ninjas.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(req.query.lng), parseFloat(req.query.lat)],
          },
          distanceField: "dist.calculated",
          maxDistance: 100000, //distancia em metros
          includeLocs: "dist.location",
          spherical: true,
        },
      },
      {
        $project: { _id: 0, name: 1, "dist.calculated": 1, "dist.location": 1 },
      },
    ])
      .then(function (ninjas) {
        res.send(ninjas);
      })
      .catch((next) => {
        console.log(next);
      });
  },
  async show(req, res) {
    const dadoNinja = await Ninjas.findById(req.params.id);
    return res.json(dadoNinja);
  },
  async store(req, res) {
    const dadoNinja = await Ninjas.create(req.body);
    return res.json(dadoNinja);
  },
  async update(req, res) {
    const dadoNinja = await Ninjas.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json(dadoNinja);
  },
  async destroy(req, res) {
    await Ninjas.findByIdAndDelete(req.params.id);
    return res.json("Excluído");
  },
};
