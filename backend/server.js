const express = require('express')
const app = express()
const port = 6969
const cors = require('cors')
const api = require('./api files/requesthandler')
const bodyParser = require('body-parser');

app.use(cors({origin: true, credentials: false}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('../public'))



app.post('/api', (req, res) => {
    //console.log(req.body);
    api(req.url, req.body, res)
})

app.get('/', (req, res) => {
  res.send('Hello World!')

})

app.listen(port, () => {
  console.log(`Backend listening on http://127.0.0.1:${port}`)
})
