;(function(){
  
  var root = this;
  
  var _ = require('lodash');
  
  var casa = {};
  
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = casa;
    root.casa = casa;
  } else {
    root.casa = casa;
  }

  var ATTRIBUTES = {
    //foundational:
    "1f2625c2-615f-11e3-bf13-d231feb1dc81" : "title",
    "b7856963-4078-4698-8e95-8feceafe78da" : "description",
    "c4ed1e3c-9ed7-4355-b293-3ed2fbb4a5fb" : "short_description",
    "c80df319-d5da-4f59-8ca3-c89b234c5055" : "categories",
    "c6e33506-b170-475b-83e9-4ecd6b6dd42a" : "tags",
    "d59e3a1f-c034-4309-a282-60228089194e" : "authors",
    "273c148d-de83-499e-b554-4cac9b262ab6" : "organization",

    //client
    "e730536a-22d0-4265-8aca-f1d2c23fafe0" : "acceptable",
    "ef1c6344-5e2e-4dba-8fff-1638852694f8" : "browser_features",
    "8d72d66c-0320-4861-8793-c5aebd195fc2" : "android_app",
    "4439d4f9-3b62-4710-9535-ae3ebf885dac" : "ios_app",
    "08099f0d-a38e-422a-8a0b-214d4808d7c8" : "media_support",

    //interoperability:
    "f6820326-5ea3-4a02-840d-7f91e75eb01b" : "lti",

    //privacy
    "63a39b88-2603-4bce-ac5b-8247bf262986" : "privacy",
    "1d5b3bbe-5715-4064-adb8-65209eeda3fe" : "privacy_url",

    //accessibility
    "40ece2ef-fd81-4e15-af82-146214f9e7a3" : "accessibility_url",
    "221efedc-d6d7-4a79-bd6f-74f2efba4c67" : "vpat_url",

    //random?
    "d25b3012-1832-4843-9ecf-3002d3434155" : "icon"
  };

  casa.translate = translateEntity;

  function translateEntity(translations){
    return function(entity){
      entity.original = translateAttributeSet(translations)(entity.original);
      if(entity.journal){
          entity.journal = entity.journal.map(translateAttributeSet(translations));
      }
      return entity;
    };
  }

  function translateAttributeSet(translations){
    return function(attributeSet){
      attributeSet.use = translateAttributes(translations)(attributeSet.use);
      attributeSet.require = translateAttributes(translations)(attributeSet.require);
      return attributeSet;
    };
  }

  function translateAttributes(translations){
    translations = _.merge(ATTRIBUTES, translations);
    return function(attributes){
      //console.log('translating attributes:', attributes);
      var translatedAttributes = {};
      for(var att in attributes){
        if(translations[att]){
          //console.log('found recognized translation:', att);
          translatedAttributes[translations[att]] = attributes[att];
        }
      }
      return translatedAttributes;
    };
  }
}.call(this));