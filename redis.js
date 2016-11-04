const redis = require('redis');

var client = redis.createClient();

client.set('moralOfThis', 'aa', redis.print);

client.get('moralOfThis', function(err, reply){
  console.log('moralOfThis is');
  console.log(reply);
  console.log(query);

})
