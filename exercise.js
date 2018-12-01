var express = require("express");
var app = express();
var request = require("request");

request({
  url: "http://blockchain.info/stats?format=json",
  json: true
}, function(error, response, body) {
  btcPrice = body.market_price_usd;
  btcBLocks = body.n_blocks_total;
  tradeVolume = body.trade_volume_btc
})

app.get("/", function(req, res) {
  res.send("Bitcoin to the moon: " + btcPrice);
});

app.get("/block", function(req, res) {
  res.send("Current blockhight: " + btcBLocks);
});

app.get("/trade-volume", function(req, res) {
  res.send("Trade volume in BTC: " + btcBLocks);
});

app.get("/html", function(req, res) {
  res.sendfile("./index.html");
});

app.listen(80, function() {
  console.log("go");
})

