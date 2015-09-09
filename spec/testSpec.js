var casa = require('../main.js');

var request = require('superagent');
var _ = require('lodash');

describe('translate()', function () {
  
    function clone(obj){
      return JSON.parse(JSON.stringify(obj));
    }

    var baseEntity = {
      "identity":{"originator_id":"guid","id":"ident"},
      "original":{
        "timestamp":"2015-06-16T20:34:13.874Z",
        "uri":"http://example.com",
        "share":true,
        "propagate":true,
        "use":{},"require":{}
      },
      "journal":[]
    };
    
    function getNewEntityWithAttr(guid, obj){
      var entity = clone(baseEntity);
      function populateAttrs(attributeSet){
        _.each(["use", "require"], function(attr){
          attributeSet[attr] = obj;
        });
      }
      populateAttrs(entity.original);
      _.each(entity.journal, populateAttrs);
      return entity;
    }

    it('should translate the "title" attribute', function(){
      var entity = getNewEntityWithAttr(
        "1f2625c2-615f-11e3-bf13-d231feb1dc81",
        "Title"
      );
      var translated = casa.translate()(entity);
      console.log('got: ', translated);
      expect(translated.original.use.title).toBe("Title");
      /*
        "1f2625c2-615f-11e3-bf13-d231feb1dc81":"Statistical Mechanics",
        "d59e3a1f-c034-4309-a282-60228089194e":[{
          "name":"Massachusetts Institute of Technology"
        }],
        "b7856963-4078-4698-8e95-8feceafe78da":"asdf"
      */
      
    });

    it('should translate the "description" attribute', function(){
      
    });
});
