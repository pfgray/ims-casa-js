
var casa = require('../main.js');

describe('getEntities', function () {
    var entities = null;

    it('should request the correct url if the first parameter is a string', function(){

      var mockRequest = {
        get:function(url){
          expect(url).toBe('http://example.com/out/payloads');
          return this;
        },
        set:function(){
          return this;
        },
        end: function(cb){
          setTimeout(function(){
            cb(null, {
              body:[]
            });
          });
        }
      };

      runs(function() {
        casa.$init(null, mockRequest, null);
        casa.getEntities('http://example.com/out/payloads')
        .then(function(res){
          entities = res;
        })
        .catch(function(){
          throw 'wat';
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
