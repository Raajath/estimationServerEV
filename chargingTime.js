const estimateChargingTime= async (req, res)=>{
  const {soc, batteryCapacity, connectorPowerKWH}=req.body;
  const estimationResult=((batteryCapacity*soc)/100)/connectorPowerKWH;
  if (isNaN(estimationResult)) {
    res.status(400).send({error: 'Invalid input or empty input'});
  }
  res.status(200).send({expectedTimeHours: estimationResult});
};
module.exports={estimateChargingTime};
