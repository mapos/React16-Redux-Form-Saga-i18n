var config = {
  development: {
    database: {
      host: "127.0.0.1",
      port: "27017",
      name: "site_dev",
    },
    server: {
      host: "127.0.0.1",
      port: "3000",
    },
    jwt: {
      supersecret: "ThisMySe+ce+,=",
      expirein: 1440,
      refreshExpireIn: 7776000,
    },
  },
  test: {
    database: {
      host: "127.0.0.1",
      port: "27017",
      name: "test",
    },
    server: {
      host: "127.0.0.1",
      port: "3000",
    },
    jwt: {
      supersecret: "ThisMySe+ce+,=",
      expirein: 1440,
      refreshExpireIn: 7776000,
    },
  },
};
module.exports = config;
