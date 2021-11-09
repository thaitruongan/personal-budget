const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors')

dotenv.config({ path: "./config/config.env" });

const app = express();
app.use(morgan("dev"));
app.use(express.json());
app.use(cors())
app.use(express.static('public'));

app.use('/', (req, res) => {
  res.render('./public/index.html')
})
app.use('/api/envelopes',require('./routes/envelopes'));
app.use('/api/transactions',require('./routes/transactions'));
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});