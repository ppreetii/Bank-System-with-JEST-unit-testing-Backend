const request = require("supertest");
const { app } = require("../src/server/index");
const sequelize = require("../src/database/config/database");

const CONSTANTS = require("../src/constants/common");
const mockData = require("../tests/data/transaction-mock");
const userMockData = require("../tests/data/user-mock");

const BASE_URL = CONSTANTS.BASE_URL + CONSTANTS.TRANSACTION;
const USER_BASE_URL = CONSTANTS.BASE_URL + CONSTANTS.USER;

beforeEach(async () => {
  try {
    await sequelize.truncate({ cascade: true, restartIdentity: true });
  } catch (error) {
    throw error;
  }
});
afterAll(async () => {
  try {
    await sequelize.truncate({ cascade: true, restartIdentity: true });
  } catch (error) {
    throw error;
  }
});

describe("POST: /api/v1.0/trnsactions/", () => {
  test("It should withdraw amount for a given user", async () => {
    //Create User whose userId = 1
    let reqBody = userMockData.registerUser;
    let res = await request(app)
      .post(`${USER_BASE_URL}${CONSTANTS.USER_ROUTES.REGISTER}`)
      .send(reqBody);
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBe(1);
    expect(res.body.balance).toBe("0.00");

    //Deposit 1000 into user account with userId = 1
    reqBody = mockData.depositBody;

    res = await request(app).post(`${BASE_URL}`).send(reqBody);
    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toEqual(1);
    expect(res.body.balance).toEqual("1000.00");
    expect(res.body.transactionId).toBe("1");

    //Withdraw 500 from user account with userId = 1
    reqBody = mockData.withdrawBody;

    res = await request(app).post(`${BASE_URL}`).send(reqBody);
    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toEqual(1);
    expect(res.body.balance).toEqual("500.00");
    expect(res.body.transactionId).toBe("2");
  });
  test("It should fail to withdraw amount for Insufficient balance", async () => {
    //Create User whose userId = 1
    let reqBody = userMockData.registerUser;
    let res = await request(app)
      .post(`${USER_BASE_URL}${CONSTANTS.USER_ROUTES.REGISTER}`)
      .send(reqBody);
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBe(1);
    expect(res.body.balance).toBe("0.00");

    //Deposit 1000 into user account with userId = 1
    reqBody = mockData.depositBody;

    res = await request(app).post(`${BASE_URL}`).send(reqBody);
    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toEqual(1);
    expect(res.body.balance).toEqual("1000.00");
    expect(res.body.transactionId).toBe("1");

    //Withdraw 1001 from user account with userId = 1
    reqBody = mockData.withdrawBody;
    reqBody.amount = 1001

    res = await request(app).post(`${BASE_URL}`).send(reqBody);
    expect(res.statusCode).toBe(400);
    
  });

  test("It should fail to withdraw amount for INVALID user", async () => {
    //Create User whose userId = 1
    let reqBody = userMockData.registerUser;
    let res = await request(app)
      .post(`${USER_BASE_URL}${CONSTANTS.USER_ROUTES.REGISTER}`)
      .send(reqBody);

    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBe(1);
    expect(res.body.balance).toBe("0.00");

    //Deposit 1000 into user account with userId = 1
    reqBody = mockData.depositBody;

    res = await request(app).post(`${BASE_URL}`).send(reqBody);

    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toEqual(1);
    expect(res.body.balance).toEqual("1000.00");
    expect(res.body.transactionId).toBe("1");

    //Withdraw 500 from user account with userId = 2
    reqBody = mockData.withdrawBody;
    reqBody.userId = 2;
    res = await request(app).post(`${BASE_URL}`).send(reqBody);
    expect(res.statusCode).toBe(404);
  });

  test("It should deposit amount for a given user", async () => {
    //Create User whose userId = 1
    let reqBody = userMockData.registerUser;
    let res = await request(app)
      .post(`${USER_BASE_URL}${CONSTANTS.USER_ROUTES.REGISTER}`)
      .send(reqBody);
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBe(1);
    expect(res.body.balance).toBe("0.00");

    //Deposit 1000 into user account with userId = 1
    reqBody = mockData.depositBody;

    res = await request(app).post(`${BASE_URL}`).send(reqBody);
    expect(res.statusCode).toBe(200);
    expect(res.body.userId).toEqual(1);
    expect(res.body.balance).toEqual("1000.00");
    expect(res.body.transactionId).toBe("1");
  });

  test("It should fail to deposit amount for INVALID user", async () => {
    //Create User whose userId = 1
    let reqBody = userMockData.registerUser;
    let res = await request(app)
      .post(`${USER_BASE_URL}${CONSTANTS.USER_ROUTES.REGISTER}`)
      .send(reqBody);
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBe(1);
    expect(res.body.balance).toBe("0.00");

    //Deposit 1000 into user account with userId = 2
    reqBody = mockData.depositBody;
    reqBody.userId = 2;

    res = await request(app).post(`${BASE_URL}`).send(reqBody);
    expect(res.statusCode).toBe(404);
  });
});
