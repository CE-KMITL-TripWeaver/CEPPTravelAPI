const express = require('express');
const router = express.Router();

const { getAllAccommodation, createAccommodation, deleteAccommodation, getSingleAccommodation, updateAccommodation, deleteAllAccommodation, searchAccommodationByDistrict} = require("../controllers/accommodationController");


router.route('/').get(getAllAccommodation);
router.route('/:id').get(getSingleAccommodation);
router.route('/create').post(createAccommodation);
router.route('/delete/:id').delete(deleteAccommodation);
router.route('/update/:id').put(updateAccommodation);
router.route('/deleteAll').delete(deleteAllAccommodation);
router.route('/searchs/data').get(searchAccommodationByDistrict);


module.exports = router;