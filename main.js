
var Q = require('q');
var request = require('superagent');
var _ = require('lodash');

module.exports.getEntities = function(config, cb){
    var url = typeof config === 'string' ? config : config.url;

    var deferred = Q.defer();
    request.get(url)
      .set('Accept', 'application/json')
      .end(function(err, res){
        if(err){
          deferred.reject(err);
          cb && cb(err);
        } else {
          console.log('got response: ', JSON.stringify(res.body.length));
          deferred.resolve(res.body);
          cb && cb(null, res.body);
        }
      });

    return deferred.promise;
};


module.exports.translate = function(translations){
  return function(entity){
    //translate the thing
    entity.original = translateAttributeSet(translations)(entity.original);
    entity.journal = entity.journal.map(translateAttributeSet(translations));
  };
};

function translateAttributeSet(translations){
  return function(attributeSet){
    attributeSet.use = translateAttributes(translations)(attributeSet.use);
    attributeSet.require = translateAttributes(translations)(attributeSet.require);
    return attributeSet;
  }
}

function translateAttributes(translations){
  return function(attributes){
    for(att in attributes){
      if(_.includes(attributes, att)){
        attributes[att]
      }
    }
  }
}
