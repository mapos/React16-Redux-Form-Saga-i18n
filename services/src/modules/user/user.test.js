const request = require("supertest");
const server = require("../../server");
const User = require("./user.model");

const seedUser = {
  email: "mapoart@gmail.com",
  password: "mypassword",
  username: "mapoart",
  name: "Marcin Polak",
  admin: true,
};

const registerUser = {
  email: "test@gmail.com",
  password: "mypassw++ord",
  username: "testuser",
  name: "Tomasz Testowski",
  admin: false,
};

/** @test {User Service} */
describe("User Service Test", async () => {
  beforeAll(async () => {
    await new User(seedUser).save();
  });

  describe("Common functions", async () => {
    it("should show welcome api text", async () => {
      const data = await request(server).get("/users/ping").expect(200);
    });
  });

  describe("Register functions", async () => {
    let token;
    let refreshToken;
    it("should register new user", async () => {
      await request(server)
        .post("/users/register")
        .send(
          Object.assign(
            {},
            {
              email: registerUser.email,
              password: registerUser.password,
              username: registerUser.username,
              name: registerUser.name,
              admin: registerUser.admin,
            }
          )
        )
        .expect(200)
        .set("Accept", "application/json")
        .expect(function (res) {
          expect(res.body).toHaveProperty("refreshToken");
          expect(res.body).toHaveProperty("token");
          expect(res.body).toHaveProperty("name", registerUser.name);
          expect(res.body).toHaveProperty("message", "Welcome");
          token = res.body.token;
          refreshToken = res.body.refreshToken;
        });
    });

    it("should return users list with just registered token", async () => {
      await request(server)
        .get("/users")
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .expect(function (res) {
          expect(res.body.docs[0]).toHaveProperty("name", seedUser.name);
          expect(res.body.docs[0]).toHaveProperty("email", seedUser.email);
          expect(res.body.docs[0]).toHaveProperty(
            "username",
            seedUser.username
          );
          expect(res.body.docs[0]).toHaveProperty("admin", seedUser.admin);
          expect(res.body.docs[1]).toHaveProperty("name", registerUser.name);
          expect(res.body.docs[1]).toHaveProperty("email", registerUser.email);
          expect(res.body.docs[1]).toHaveProperty(
            "username",
            registerUser.username
          );
          expect(res.body.docs[1]).toHaveProperty("admin", registerUser.admin);
          //console.log(res.body)
        });
    });

    it("should not register new user as EMAIL already exists", async () => {
      await request(server)
        .post("/users/register")
        .send(
          Object.assign(
            {},
            {
              email: registerUser.email,
              password: registerUser.password,
              username: registerUser.username + "XX",
              name: registerUser.name,
              admin: registerUser.admin,
            }
          )
        )
        .expect(409)
        .set("Accept", "application/json")
        .expect(function (res) {
          expect(res.body).toHaveProperty("message", "email is already taken");
        });
    });

    it("should not register new user as USERNAME already exists", async () => {
      await request(server)
        .post("/users/register")
        .send(
          Object.assign(
            {},
            {
              email: "notexists" + registerUser.email,
              password: registerUser.password,
              username: registerUser.username,
              name: registerUser.name,
              admin: registerUser.admin,
            }
          )
        )
        .expect(409)
        .set("Accept", "application/json")
        .expect(function (res) {
          expect(res.body).toHaveProperty(
            "message",
            "username is already taken"
          );
        });
    });

    it("should not register no required fields", async () => {
      await request(server)
        .post("/users/register")
        .send(
          Object.assign(
            {},
            {
              email: "notexists" + registerUser.email,
              username: "notexists" + registerUser.username,
            }
          )
        )
        .expect(400)
        .expect(function (res) {
          expect(res.body.errors.password).toHaveProperty(
            "message",
            "Path `password` is required."
          );
        });
    });
  });

  describe("Login functions", async () => {
    let token;
    it("should not allow to login as wrong authenticate details", async () => {
      await request(server)
        .post("/users/login")
        .send(
          Object.assign(
            {},
            {
              email: seedUser.email,
              password: "wrong password",
            }
          )
        )
        .set("Accept", "application/json")
        .expect(401, {
          field: "email",
          message: "Authentication failed",
        });
    });
    // We get token by login
    it("should get valid token for login to get users", async () => {
      await request(server)
        .post("/users/login")
        .send(
          Object.assign(
            {},
            {
              email: seedUser.email,
              password: seedUser.password,
            }
          )
        )
        // .expect(function(t){
        //   console.log(t)
        // })
        .expect(200)
        .set("Accept", "application/json")
        .expect(function (res) {
          expect(res.body).toHaveProperty("token");
          expect(res.body).toHaveProperty("name", seedUser.name);
          expect(res.body).toHaveProperty("message", "Welcome");
          token = res.body.token;
        });
    });

    it("should return users list", async () => {
      await request(server)
        .get("/users")
        .set("Authorization", "Bearer " + token)
        .expect(200)
        .expect(function (res) {
          expect(res.body.docs[0]).toHaveProperty("name", seedUser.name);
          expect(res.body.docs[0]).toHaveProperty("email", seedUser.email);
          expect(res.body.docs[0]).toHaveProperty(
            "username",
            seedUser.username
          );
          expect(res.body.docs[0]).toHaveProperty("admin", seedUser.admin);
        });
    });
  });

  // '{"success":false,"message":"Authentication failed."}'

  afterAll(() => User.remove({}));
});

/**
 * Other interesting examples for testing with 'Jest'
 *
 * *** Multiple asymmetric matchers
 * const expected = [
 *   expect.stringMatching(/^Alic/),
 *   expect.stringMatching(/^[BR]ob/),
 * ];
 * it('matches even if received contains additional elements', () => {
 *  expect(['Alicia', 'Roberto', 'Evelina'])
 *     .toEqual(expect.arrayContaining(expected));
 * });
 *
 * *** Promises
 * test('resolves to lemon', async () => {
 *  await expect(Promise.resolve('lemon')).resolves.toBe('lemon');
 *  await expect(Promise.resolve('lemon')).resolves.not.toBe('octopus');
 * });
 *
 * test('fetchData() rejects to be error', () => {
 *  // make sure to add a return statement
 *  return expect(Promise.reject('octopus')).rejects.toBeDefined();
 * });
 *
 */
