const request = require("supertest");
const { app } = require("../src/server/index");
const sequelize = require("../src/database/config/database");

const CONSTANTS = require("../src/constants/common");
const mockData = require("../tests/data/user-mock");

const BASE_URL = CONSTANTS.BASE_URL + CONSTANTS.USER;

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

describe("POST: /api/v1.0/users/", () => {
  test("It should register a new user", async () => {
    let reqBody = mockData.registerUser;

    const res = await request(app)
      .post(`${BASE_URL}${CONSTANTS.USER_ROUTES.REGISTER}`)
      .send(reqBody);
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBe(1);
    expect(res.body.balance).toBe("0.00");
  });

  test("It should fail to register a user with same emailId", async () => {
    //create a user with email = testuser@gmail.com
    let reqBody = mockData.registerUser;

    let res = await request(app)
      .post(`${BASE_URL}${CONSTANTS.USER_ROUTES.REGISTER}`)
      .send(reqBody);
    expect(res.statusCode).toEqual(201);
    expect(res.body.id).toBe(1);
    expect(res.body.balance).toBe("0.00");

    //Try to create a new account with same email
    res = await request(app)
      .post(`${BASE_URL}${CONSTANTS.USER_ROUTES.REGISTER}`)
      .send(reqBody);
    expect(res.statusCode).toEqual(400);
  });
});
