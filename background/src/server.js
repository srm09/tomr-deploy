var express = require('express')
var app = express(),
    path = require('path')
var PORT = 8080
var data_nodes = []

app.get('/', (req, res) => {
    res.sendStatus(200)
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

app.listen(PORT, () => {
  console.log('Example app listening on port '+PORT)
});
