const express = require('express');
const router = express.Router();

const { getAllPlaces, createPlace, deletePlace, getSinglePlace, updatePlace, deleteAllPlaces} = require("../controllers/placesController");


router.route('/').get(getAllPlaces);
router.route('/:id').get(getSinglePlace);
router.route('/create').post(createPlace);
router.route('/delete/:id').delete(deletePlace);
router.route('/update/:id').put(updatePlace);
router.route('/deleteAll').delete(deleteAllPlaces);


module.exports = router;