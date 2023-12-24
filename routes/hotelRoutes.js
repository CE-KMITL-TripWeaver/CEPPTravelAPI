const express = require('express');
const router = express.Router();

const {getAllHotels,getSinglehotel,createHotel,updatehotel,deletehotel} = require('../controllers/hotelsController')

router.route('/').get(getAllHotels);
router.route('/:id').get(getSinglehotel);
router.route('/create').post(createHotel);
router.route('/delete/:id').delete(deletehotel);
router.route('/update/:id').put(updatehotel);


module.exports = router; 