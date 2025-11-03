const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(express.json());

// Import routes
const userRoutes = require('./routes/userRoutes');
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Server running ✅');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
