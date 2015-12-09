ims-casa
=====
This library eases the translation of casa entities. more info on casa [here](http://imsglobal.github.io/casa/)

    var casa = require('ims-casa');
    casa.translate(customProperties)(entity)

A call to `casa.translate()` will return a function that translates an entity. This comes in handy when you have a list of entities that you'd like to translate, for example:

    var entities = [];
    var translatedEntities = entities.map(casa.translate());
    
As it's first parameter, `casa.translate` accepts a map of custom guids that will be used in translation.

The translator will translate:  
<pre>
{
  "identity":{"originator_id":"guid","id":"ident"},
  "original":{
    "timestamp":"2015-06-16T20:34:13.874Z",
    "uri":"http://example.com",
    "share":true,
    "propagate":true,
    "use":{
      <b>"1f2625c2-615f-11e3-bf13-d231feb1dc81":"Title of App"</b>
    },"require":{}
  },
  "journal":[]
}
</pre>
to:  
<pre>
{
  "identity":{"originator_id":"guid","id":"ident"},
  "original":{
    "timestamp":"2015-06-16T20:34:13.874Z",
    "uri":"http://example.com",
    "share":true,
    "propagate":true,
    "use":{
      <b>"title":"Title of App"</b>
    },"require":{}
  },
  "journal":[]
}
</pre>
