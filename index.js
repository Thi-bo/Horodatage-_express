// index.js
// where your node app starts

// init project

var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});
// Gestionnaire de route pour l'API d'horodatage
app.get('/api/:date?', (req, res) => {
  const dateString = req.params.date;

  if (dateString) {


  // Vérifier si le paramètre est un horodatage Unix valide
  const unixDate = Number(dateString);
  if (!isNaN(unixDate)) {
    const date = new Date(unixDate);
    const unix = date.getTime(); // Horodatage Unix en millisecondes
    const utc = date.toUTCString(); // Date au format UTC

    res.json({ unix, utc });
  } else {
    // Sinon, supposer que c'est une date au format textuel
    const date = new Date(dateString);

    // Vérifier si la date est valide
    if (date.toString() !== 'Invalid Date') {
      const unix = date.getTime(); // Horodatage Unix en millisecondes
      const utc = date.toUTCString(); // Date au format UTC

      res.json({ unix, utc });
    } else {
      res.json({ error: 'Invalid Date' });
    }
  }

} else {
  // Si aucune date n'est fournie, renvoyer l'heure actuelle
  const now = new Date();
  const unix = now.getTime(); // Horodatage Unix en millisecondes
  const utc = now.toUTCString(); // Date au format UTC

  res.json({ unix, utc });
}
});



// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
