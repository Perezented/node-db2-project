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
                res.status(200).json(car);
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
            .then((one) => {
                res.status(201).json({
                    message: "New car added to data base",
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

module.exports = router;
