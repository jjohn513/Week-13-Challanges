
const http = require('http')
const express = require('express')
var cors = require('cors')
 
const employeeRouter = require('./routes/employees')


const app = express()
app.use(express.json())

app.use(cors({origin: 'http://localhost:8100'}))

app.use('/employees', employeeRouter)

// default URL to API
app.use('/', function(req, res) {
    res.send('TOP SOUND DIRECTORY, WELCOME (medium/hard)')
})

const server = http.createServer(app)
const port = 3000
server.listen(port)

console.debug('Server listening on port ' + port)