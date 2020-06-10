const express = require("express");

const db = require("../data/connection");

const router = express.Router();

router.get("/", (req, res) => {
    db("cars")
        .then((cars) => {
            res.json(cars);
        })
        .catch((err) => {
            res.status(500).json({ message: "Failed to retrieve cars", err });
        });
});
router.get("/:id", (req, res) => {
    db("cars")
        .where("carID", req.params.id)
        .then((car) => {
            console.log(car);
            if (car.length > 0) {
                res.status(200).json(car[0]);
            } else
                res.status(404).json({ Error: "Car is not in our database" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json({
                message: "Failed to retrieve the car",
                err,
            });
        });
});
router.post("/", (req, res) => {
    newCar = req.body;
    if (newCar.vin.length != 17) {
        res.status(400).json({
            Error: "Check VIN number. Should be 17 characters long.",
        });
    } else {
        db("cars")
            .insert(newCar, "*")
            .then((carid) => {
                res.status(201).json({
                    message: `New car added to data base. The carID is ${carid}`,
                    newCar,
                });
            })
            .catch((err) => {
                console.log(err);
                res.status(500).json({
                    error: "Could not add vehicle to data base",
                });
            });
    }
});
router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    db("cars")
        .where({ id })
        .update(changes)
        .then((count) => {
            console.log(count);
            if (count > 0) {
                res.status(203).json({
                    message: "Record updated successfully",
                    Changes: `${count} change(s) were done`,
                });
            } else {
                res.status(404).json({
                    error: "ID was not found in the data base",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.delete("/:id", (req, res) => {
    const id = req.params.id;
    db("cars")
        .where("carID", id)
        .del()
        .then((count) => {
            console.log(count);
            if (count > 0) {
                res.status(203).json({
                    message: `Record for ID ${id} deleted successfully`,
                });
            } else {
                res.status(404).json({
                    error: "ID was not found in the data base",
                });
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
