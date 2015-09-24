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
        ["use", "require"].forEach(function(attr){
          attributeSet[attr][guid] = obj;
        });
      }
      populateAttrs(entity.original);
      entity.journal.map(populateAttrs);
      return entity;
    }

    /**
    * This function will test that casa.translate() will translate an attribute
    * with the supplied guid.
    */
    function testPair(guid, human, obj){
      var entity = getNewEntityWithAttr(guid, obj);
      var translated = casa.translate()(entity);
      if(typeof translated.original.use[human] === 'undefined'){
        throw Error('Translated attribute was undefined');
      }
      expect(translated.original.use[human]).toBe(obj);
    }

    it('should translate the "title" attribute', function(){
      testPair(
        '1f2625c2-615f-11e3-bf13-d231feb1dc81',
        'title',
        'Title of the App'
      );
    });

    it('should translate the "description" attribute', function(){
      testPair(
        'b7856963-4078-4698-8e95-8feceafe78da',
        'description',
        'Description of the app'
      );
    });

    it('should translate the "authors" attribute', function(){
      testPair(
        'd59e3a1f-c034-4309-a282-60228089194e',
        'authors',{
          "name":"Massachusetts Institute of Technology"
        }
      );
    });

    it('should translate the "lti" attribute', function(){
      testPair(
        'f6820326-5ea3-4a02-840d-7f91e75eb01b',
        'lti',{
          "name":"Massachusetts Institute of Technology"
        }
      );
    });

    it('should translate the "caliper" attribute', function(){
      testPair(
        'd96e4185-c52d-4f46-9fcb-59d28087c7d1',
        'caliper',{
          "name":"Massachusetts Institute of Technology"
        }
      );
    });

    it('should translate the "short_description" attribute', function(){
      testPair(
        'c4ed1e3c-9ed7-4355-b293-3ed2fbb4a5fb',
        'short_description',{
          "name":"Massachusetts Institute of Technology"
        }
      );
    });

});
