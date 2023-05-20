const express = require('express');
const app = express();

app.use(express.static('public'));
// Allows the user to path to localhost:3000/<file in /public>

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
