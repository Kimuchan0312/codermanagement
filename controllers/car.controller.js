const mongoose = require("mongoose");
const Car = require("../models/Car");
const carController = {};

carController.createCar = async (req, res, next) => {
  try {
    const { make, model, release_date, transmission_type, size, style, price } =
      req.body;

    // Validate the required fields
    if (
      !make ||
      !model ||
      !release_date ||
      !transmission_type ||
      !size ||
      !style ||
      !price
    ) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Create the car object
    const newCar = new Car({
      make,
      model,
      release_date,
      transmission_type,
      size,
      style,
      price,
    });

    // Save the car to the database
    const savedCar = await newCar.save();

    // Respond with success message and the created car data
    res.status(201).json({
      message: "Create Car Successfully!",
      car: savedCar,
    });
  } catch (err) {
    console.error("Error", err);
    res.status(500).json({ error: "An internal server error occurred." });
  }
};

carController.getCars = async (req, res, next) => {
  try {
    const pageSize = 10; // Number of cars to fetch per page
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameters

    // Retrieve cars for the requested page from the database
    const cars = await Car.find()
      .skip((page - 1) * pageSize)
      .limit(pageSize);

    // Count total number of cars in the database
    const totalCars = await Car.countDocuments();

    // Calculate total number of pages based on the page size
    const totalPages = await Car.countDocuments();

    // Respond with the list of cars, page number, and total number of pages
    res.json({
      message: "Get Car List Successfully",
      cars,
      page,
      total: totalPages,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ error: "An internal server error occured." });
  }
};

carController.editCar = async (req, res, next) => {
  try {
    const carId = red.params.id;

    // Find the car by ID in the database
    const car = await Car.findById(carId);

    if (!car) {
      return res.status(404).json({ error: "Car not found." });
    }

    // Update the car properties based on the request body
    car.make = req.body.make || car.make;
    car.model = req.body.model || car.model;
    car.release_date = req.body.release_date || car.release_date;
    car.transmission_type = req.body.transmission_type || car.transmission_type;
    car.size = req.body.size || car.size;
    car.style = req.body.style || car.style;
    car.price = req.body.price || car.price;

    // Save the updated car to the database
    const updatedCar = await car.save();

	// Respond with the success message and the updated car data
	res.json({
		message: 'Update Car Successfully!',
		car: Car.updatedCar,
	});
  } catch (err) {
    console.error('Error:', err);
	res.status(500).json({ error: 'An internal server error occured.'});
  }
};

carController.deleteCar = async (req, res, next) => {
  try {
    const carId = req.params.id;
	 // Find the car by ID in the database
	 const car = await Car.findById(carId);

	 if (!car) {
		return res.status(404).json({ error: 'Car not found.' });
	 }
	 // Delete the car from the database
	 await car.remove();

    // Respond with the success message and the deleted car data
	res.json({
		message: 'Delete Car Successfully',
		car,
	});
  } catch (err) {
	console.error('Error:', err);
	res.status(500).json({ error: 'An internal server error occurred.'});
  }
};

module.exports = carController;
