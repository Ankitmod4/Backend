const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  "sql12815659",          // DB NAME
  "sql12815659",          // DB USER
  "4uPdKTG9Yd",           // DB PASSWORD
  {
    host: "sql12.freesqldatabase.com",
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
      ssl: false,          // 🔴 FreeSQLDatabase DOES NOT support SSL
      connectTimeout: 60000,
    },
  }
);

module.exports = sequelize;





///     MAIN CONNECTION CODE FOR HOSTINGER    ///

// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   "u118145129_influencer_db",
//   "u118145129_influencer_use",
//   "123!@#Aq",
//   {
//     host: "auth-db1132.hstgr.io",
//     dialect: "mysql",
//     port: 3306,
//     logging: false,

//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 60000,
//       idle: 10000,
//     },

//     dialectOptions: {
//       ssl: {
//         require: true,
//         rejectUnauthorized: false,
//       },
//       connectTimeout: 60000,
//     },
//   }
// );

module.exports = sequelize;
