var express = require('express')
var app = express(),
    path = require('path')
var Chance = require('chance'),
    chance = new Chance();
var request = require('request')
var PORT = 8080
var data_nodes = []

var baseURL = "http://data-client:8080/client/rest/upload/data"

app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/data-node/:dns/:ip', (req, res) => {
  var dns = req.params.dns
  var ip = req.params.ip
  data_nodes.push({
    'dnsName':dns,
    'ipAddress':ip
  })
  res.sendStatus(200);
})

app.get('/data-nodes', (req, res) => {
  res.set('Content-Type', 'application/json')
  var nodes = {
      dataNodes: data_nodes
  }
  res.send(JSON.stringify(nodes))
})

app.get('/upload/:key/:value', (req, res) => {
    key = req.params.key
    value = req.params.value
    data = generateData(1, key, value)
    console.log(data)
    postData(baseURL, "POST", data, (err, resp, body) => {
        console.log('done sending single request')
    })
    res.sendStatus(200)
})

app.get('/upload/:keys', (req, res) => {
    noOfKeys = req.params.keys
    console.log("noOfKeys: "+noOfKeys.toString())
    data = generateData(noOfKeys)
    console.log(data)
    postData(baseURL, "POST", data, (err, resp, body) => {
        console.log('done')
    })
    res.sendStatus(200)
})

app.listen(PORT, () => {
  console.log('Example app listening on port '+PORT)
});

function postData(url, method, requestData, callback) {
    request({
        url: url,
        method: method,
        json: true,
        headers: {
            "content-type": "application/json"
        },
        body: requestData
    }, callback)
}

function packageKVPair(key , value) {
    return {
            key     : key,
            value   : value
        }
}

function packagePayload(pairs) {
    return { data: pairs }
}

function generateData(number, key, value) {
    if((key === undefined) || (value === undefined)) {
        var pairs = [] 
        for (var i=0; i<number; ++i) {
            pairs.push(packageKVPair(chance.guid(), chance.word()))
        }
        return packagePayload(pairs)
    }
    return packagePayload([packageKVPair(key, value)])
}
