const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())

app.use('/api',require('./routes/envelopes'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});