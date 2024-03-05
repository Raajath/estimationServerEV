const estimateChargingTime= async (req, res)=>{
  const {soc, batteryCapacity, connectorPower}=req.body;
  const estimationResult=((batteryCapacity*soc)/100)/connectorPower;
  if (isNaN(estimationResult)) {
    res.status(400).send({error: 'Invalid input or empty input'});
  }
  res.status(200).send({expectedTime: estimationResult});
};

module.exports={estimateChargingTime};
