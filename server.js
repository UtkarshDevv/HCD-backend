import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import submitZohoForm from './submitZohoForm.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use('/api', submitZohoForm);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
