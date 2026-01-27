const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("Rishit_Project", "root", "root", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});
module.exports = sequelize;




///     MAIN CONNECTION CODE FOR HOSTINGER    ///


// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize(
//   "u118145129_influencer_db",        // ✅ DB NAME
//   "u118145129_influencer_use",      // ✅ DB USER
//   "123!@#Aq",             // ✅ DB PASSWORD
//   {
//     host: "auth-db1132.hstgr.io",
//     dialect: "mysql",
//     port: 3306,
//     logging: false,

//     pool: {
//       max: 5,
//       min: 0,
//       acquire: 30000,
//       idle: 10000,
//     },

//     dialectOptions: {
//       connectTimeout: 60000,
//     },
//   }
// );

// module.exports = sequelize;    wapas mera localhost wala code dedena