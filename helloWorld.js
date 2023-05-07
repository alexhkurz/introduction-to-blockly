const express = require('express');
const app = express();

app.use(express.static('public'));
// Allows the user to path to localhost:3000/<file in /public>
// Example: localhost:3000/index1.html

// Can send the html file, but does not know how to parse it
// For "rendering" actual files, need to use a view engine like EJS or Pug
app.get('/', (req, res) => {
  res.send('Hello World!');
  // res.render('index') // Needs view engine
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
