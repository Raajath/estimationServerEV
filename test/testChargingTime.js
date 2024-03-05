const {app} = require('../index');
const request = require('supertest');
const {describe, it} = require('mocha');
const chai = require('chai');
const expect = chai.expect;

describe('Post estimated charging time (in hours) from SOC,batteryCapacity,connectorPower', () => {
  it('Should estimate correct time given correct input', async () => {
    const batteryInput = {
      soc: 50,
      batteryCapacity: 40,
      connectorPower: 10,
    };

    const estimatedResponse = await request(app)
        .post('/estimate')
        .send(batteryInput)
        .expect(200);
    expect(estimatedResponse.body.expectedTime).to.equals(2);
  });

  it('Should give 400 status and error for bad requests', async () => {
    const batteryInput =[{},
      {
        batteryCapacity: 40,
        connectorPower: 10,
      },
      {
        batteryCapacity: 40,
        connectorPower: 10,
      },
      {
        soc: '50',
        batteryCapacity: 'hdf',
        connectorPower: 'dc',
      },

    ];

    for (const testData of batteryInput) {
      const estimatedResponse = await request(app)
          .post('/estimate')
          .send(testData)
          .expect(400);
      expect(estimatedResponse.body.error).to.equals('Invalid input or empty input');
    }
  });
});

describe('Wrong Endpoint request', ()=>{
  it('should give 404 error when  wrong endpoint is entered', async ()=>{
    const res=await request(app)
        .post('/')
        .expect(404);
    expect(res.body.error).equals('Not found');
  });
});
