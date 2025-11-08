const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require('path');
const { connectDB } = require('./backend/db/config');
const professionalRoutes = require('./backend/routes/professional');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());


app.use(express.static(path.join(__dirname, 'frontend')));


app.use('/', professionalRoutes);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`✅ Server running on http://localhost:${PORT}`);
    });
  } catch (e) {
    console.error('❌ Erro ao iniciar servidor:', e);
  }
};

startServer();
