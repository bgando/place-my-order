##DoneJS Questions & Notes
superMap - has fallthrough caching. use to setup model connection to api

##CanJS
you can make your own versions of can-import because you have access to steal-import
computes
DefineMaps - use this to create your view model and models
DefineLists - use this to create collections

##StealJS
@loader

##Streams
Change side effects and imperative logic in list.js to streams
Use can-define-stream-kefir, npm install --save
import plugin in list.js which gives canDefineStream mixin where you can call it with the 
view model (canDefineStream(ViewModel))
This allows you to define the city to a composite if the city is set
  give city a stream propery/method that returns a stream
  stream: function(setStream) {
    var nullStream = this.toStream('.state').mape(()=>null)
    //this creates a null stream
    //return merge of setStream with the nullstream
    return setStream.merge(nullStream)
  }
  ex. vm.city = "chicago", the stream's next will be chicago
  convert state value to a stream

as state changes, the streams of values is created
whichever stream happens last is the value of city

follow this guide to learn more about streams and refactoring imperative code to streams: https://canjs.com/doc/guides/recipes/weather-report-simple.html

