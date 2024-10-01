const express = require('express');
const axios = require('axios');
const app = express();
const bodyParser = require('body-parser');
const PORT = 5050;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }))

//uvIndex to null before
app.get('/', function(req, res) {
    res.render('pages/index', { uvIndex: null });
  });
  
//grabbing form submissions for API call
app.post('/getUv', (req, res) => {
    const lat = req.body.lat; 
    const long = req.body.long;  
    //kwy given by API
    const key = 'openuv-ku3wrm1psya0z-io';  
    //server request for OpenUV API
    axios.get(`https://api.openuv.io/api/v1/uv?lat=${lat}&lng=${long}`, {
      headers: { 'x-access-token': key }
    })
    //response data grabs the specific uv index
    .then(response => {
      const uvIndex = response.data.result.uv;
      res.render('pages/index', {
         uvIndex : uvIndex, 
        });
    })
  });

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});