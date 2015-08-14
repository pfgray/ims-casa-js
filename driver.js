
var casa = require('./main.js');

casa.getEntities({
  url:'http://paulgray.net/mit.json'
})
.then(function(entities){
  console.log('got entities: ', JSON.stringify(entities, null, 4));
})
.catch(function(err){
  console.log('got error: ', err);
});
