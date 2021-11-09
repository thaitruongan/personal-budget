const Pool = require('pg').Pool;

const pool = new Pool({
  user:"postgres",
  password:"tta12345",
  database:"personal_budget",
  host:"localhost",
  post:"5432"
});

module.exports = pool