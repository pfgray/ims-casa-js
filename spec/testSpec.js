
var casa = require('../main.js');

describe('getEntities', function () {
    var entities = null;

    function createMockRequest(url, data){
      return {
        get:function(url){
          expect(url).toBe(url);
          return this;
        },
        set:function(){
          return this;
        },
        end: function(cb){
          setTimeout(function(){
            cb(null, {
              body:data
            });
          });
        }
      };
    }

    it('should request the correct url if the first parameter is a string', function(){
      var mockReq = createMockRequest('http://example.com/out/payloads', []);
      runs(function() {
        casa.$init(null, mockReq, null);
        casa.getEntities('http://example.com/out/payloads')
        .then(function(res){
          entities = res;
        })
        .catch(function(){
          throw 'failed';
        });
      });

      waitsFor(function(){
        return entities !== null;
      });

      runs(function(){
        expect(entities.length).toBe(0);
      });
    });

    it('should request the correct url if it is supplied in the configuration', function(){
      var mockReq = createMockRequest('http://example.com/out/payloads', []);
      runs(function() {
        casa.$init(null, mockReq, null);
        casa.getEntities({
          url:'http://example.com/out/payloads'
        })
        .then(function(res){
          entities = res;
        })
        .catch(function(){
          throw 'failed';
        });
      });

      waitsFor(function(){
        return entities !== null;
      });

      runs(function(){
        expect(entities.length).toBe(0);
      });
    });
});
