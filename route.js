const {Router} = require('express');
const router = Router();
const {estimateChargingTime}=require('./chargingTime');

router.post('/estimate', estimateChargingTime);

module.exports={router};
