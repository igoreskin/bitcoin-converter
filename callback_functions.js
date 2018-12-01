// function typical(a, b, callback) {
//   let x = a + b;
//   callback(x);
// }
// console.log(typical(3, 4, function(n) {
//   console.log(n)
// }));

var request = require("request");

function getPrice(callback) {
  request({
    url: "http://blockchain.info/stats?format=json",
    json: true
  }, function(err, res, body) {
    let price = body.market_price_usd;
    let blocks = body.n_blocks_total;
    callback(price, blocks);
  });
}

function hello() {
  console.log("hello there");
}

getPrice(function(ice, cream) {
  console.log(ice);
  console.log(cream);
  hello();
});

