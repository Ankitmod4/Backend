require("dotenv").config();
const express = require('express');
const app = express();
const cors = require('cors');
const sequelize = require('./Database/Database');
const router = require('./Routes/route');


app.use(cors());





app.use(express.json());
const PORT = 8080;
app.use('/api', router); 




sequelize.sync({alter: true})
  .then(() => {
    console.log('✅ All tables created / updated successfully');
  })
  .catch((err) => {
    console.log('❌ Error creating tables:', err);
  });
  

// Test route
app.get('/', (req, res) => res.send('Hello world'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});