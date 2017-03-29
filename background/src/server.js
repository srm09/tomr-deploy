var express = require('express')
var app = express(),
    path = require('path')
var Chance = require('chance'),
    chance = new Chance();
var request = require('request')
var bodyParser = require('body-parser');
var PORT = 8080, nodeCount=0
var data_nodes = []
/*var data_nodes = [{
    ipAddress: '127.0.0.1',
    keys: ["sagar", "muchhal"]
},
{
    ipAddress: '127.0.0.1',
    keys: ["sagar", "muchhal"]
},
{
    ipAddress: '127.0.0.1',
    keys: ["sagar", "muchhal"]
}]*/

var baseURL = "http://data-client:8080/client/rest"
var uploadData = "/upload/data"
var addRemoveNodeBase = "/elastic"
var addNode ="/add/", removeNode = "/remove/"

app.use('/public', express.static('public'))
app.set('view engine', 'ejs')
app.use(bodyParser.json()); // support json encoded bodies

var loadIndexPage = function(req, res) {
    res.render('index', {nodes: data_nodes})
}

// To check health of the application
app.get('/', (req, res) => { res.sendStatus(200) })

app.get('/index', loadIndexPage)

app.get('/data-node/:dns/:ip/:status', (req, res) => {
  var dns = req.params.dns
  var ip = req.params.ip
  var status = req.params.status
  data_nodes.push({
    'dnsName':dns,
    'ipAddress':ip,
    'name':'data-node-'+nodeCount,
    'status': status
  })
  nodeCount++
  res.sendStatus(200);
})

app.get('/data-nodes', (req, res) => {
  res.set('Content-Type', 'application/json')
  var nodes = {
      dataNodes: data_nodes
  }
  res.send(JSON.stringify(nodes))
})

app.post('/data-node/keys', (req, res) => {
  var keys= req.body.keys
  var ipAddress = req.body.ipAddress
  console.log('key list received: '+keys)
  updateDataNodeKeys(ipAddress, keys)
  res.sendStatus(200);
})

app.get('/data-node/keys/:ip', (req, res) => {
    var ip = req.params.ip
    var data_node = data_nodes.find((node) => {
        return node.ipAddress === ip
    })
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({
        keys: data_node.keys,
        ipAddress: ip
    }))
})

// Database population and fetch APIs
app.get('/upload/:key/:value', (req, res) => {
    key = req.params.key
    value = req.params.value
    data = generateData(1, key, value)
    console.log(data)
    postData(baseURL+uploadData, "POST", data, (err, resp, body) => {
        console.log('done sending single request')
    })
    res.sendStatus(200)
})

app.get('/upload/:keys', (req, res) => {
    noOfKeys = req.params.keys
    console.log("noOfKeys: "+noOfKeys.toString())
    data = generateData(noOfKeys)
    console.log(data)
    postData(baseURL+uploadData, "POST", data, (err, resp, body) => {
        console.log('done')
    })
    res.sendStatus(200)
})

// Addition adnn removal of nodes
app.get('/elastic/add/:ipAddress', (req, res) => {
    var ip = req.params.ipAddress
    var url = baseURL+addRemoveNodeBas+addNode+ip
    sendElasticRequest(url, (err, resp, body) => {
        console.log('Node add request sent')
    })
})

app.get('/elastic/remove/:ipAddress', (req, res) => {
    var ip = req.params.ipAddress
    var url = baseURL+addRemoveNodeBas+removeNode+ip
    sendElasticRequest(url, (err, resp, body) => {
        console.log('Node Remove request sent')
    })
})

app.listen(PORT, () => {
  console.log('Example app listening on port '+PORT)
});

function sendElasticRequest(url, callback) {
    request(url, callback)
}

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

function updateDataNodeKeys(ipAddress, keys) {
    for (var i=0; i <data_nodes.length; ++i) {
        var node = data_nodes[i]
        if(node.ipAddress === ipAddress) {
            node['keys'] = keys
        }
    }
}