var express = require("express");
var app = express();
var request = require("request");
var bodyparser = require("body-parser");
var bitcore = require("bitcore-lib");
var axios = require("axios");

app.use(express.static(__dirname+'/public'));

app.use(bodyparser.urlencoded({
  extended: true
}));

app.use(bodyparser.json());

app.set("view engine", "ejs");

function brainWallet(uinput, callback) {
  let input = new Buffer.from(uinput);
  let hash = bitcore.crypto.Hash.sha256(input);
  let bn = bitcore.crypto.BN.fromBuffer(hash);
  let pk = new bitcore.PrivateKey(bn).toWIF();
  let addy = new bitcore.PrivateKey(bn).toAddress();
  callback(pk, addy);
}

function getPrice(callback) {
  request({
    url: "https://blockchain.info/ticker",
    // url: "https://api.cryptonator.com/api/ticker/btc-usd",
    json: true 
  }, function(err, res, body) {
    callback(body.USD.last);
    // callback(res.body.ticker.price)
    // console.log(res.body.ticker.price);
  });
}

app.get("/", function(req, res) {
  getPrice(function(lastPrice) {
    res.render("index", {
      lastPrice: lastPrice
    });
  });
});

app.get("/brain", function(req, res) {
  getPrice(function(lastPrice) {
    res.render("brain", {
      lastPrice: lastPrice
    });
  });
});

app.get("/converter", function(req, res) {
  getPrice(function(lastPrice) {
    res.render("converter", {
      lastPrice: lastPrice
    });
  });
});

app.post("/wallet", function(req, res) {
  let brainsrc = req.body.brainsrc;
  console.log(brainsrc);
  brainWallet(brainsrc, function(priv, addr) {
    res.render("account", {
      brainsrc: brainsrc,
      addr: addr,
      priv: priv
    });
    // res.send("The Brain wallet of: " + brainsrc + "<br>Addy: " + addr + "<br>Private Key: " + priv);
  });
});

// request({
//   url: `https://blockchain.info/address/1xm4vFerV3pSgvBFkyzLgT1Ew3HQYrS1V?format=json`,
//   json: true
// }, function(error, response, body) {
//   balance = JSON.stringify(body.final_balance);
//   total_received = JSON.stringify(body.total_received);
//   total_sent = JSON.stringify(body.total_sent);
// });

// app.get("/address-info", function(req, res) {
//   res.send("Balance: " + balance + "<br>Total received: " + total_received + "<br>Total sent: " + total_sent);
// });

// app.listen(80, function() {
//   console.log("go");
// });

// app.listen(port, function () {
//   console.log("The app is running on http://localhost:" + port);
// });

let port = process.env.PORT;
if (port == null || port == "") {
  port = 80;
}
app.listen(port, function () {
  console.log("The app is running on http://localhost:" + port);
  });