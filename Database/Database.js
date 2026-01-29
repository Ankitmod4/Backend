// const { Sequelize } = require("sequelize");
// const sequelize = new Sequelize("Rishit_Project", "root", "root", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 3306,
//   logging: false,
// });
// module.exports = sequelize;




///     MAIN CONNECTION CODE FOR HOSTINGER    ///

const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "u118145129_influencer_db",
  "u118145129_influencer_use",
  "123!@#Aq",
  {
    host: "auth-db1132.hstgr.io",
    dialect: "mysql",
    port: 3306,
    logging: false,

    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 10000,
    },

    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
      connectTimeout: 60000,
    },
  }
);
(async () => {
  try {
    await sequelize.authenticate();
    console.log("🔥 DB CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.error("💀 DB CONNECTION FAILED:", err);
  }
})();

module.exports = sequelize;
