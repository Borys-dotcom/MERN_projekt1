const EventModel = require("../models/EventModel");

module.exports = {
  index: (req, res, next) => {
    EventModel.find({})
      .then((result) => {
        res.status(201).json(result)
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error while fetching Event",
          error: err,
        });
      });
  },

  create: (req, res, next) => {
    const event = new EventModel({
      name: req.body.name,
      event: req.body.event,
      city: req.body.city,
    });

    event
      .save()
      .then(() => {
        return res.status(201).json(event);
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error while creating Event",
          error: err,
        });
      });
  },

  delete: (req, res, next) => {
    const id = req.params.id;
    EventModel.findByIdAndDelete(id)
      .then(() => {
        return res.status(200).json({
          id: id,
          deleted: true,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          message: "Error while deleting Event",
          error: err,
        });
      });
  },
};
