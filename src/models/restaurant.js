import DefineMap from 'can-define/map/';
import DefineList from 'can-define/list/';
import set from 'can-set';
import superMap from 'can-connect/can/super-map/';
// from stealjs:
import loader from '@loader';

// defines restaurant model
const Restaurant = DefineMap.extend( "Restaurant", {
  seal: false
}, {
  '_id': 'any'
});

//algebra helps contruct query strings in an efficient way
// you can do set algebra but also you can ensure that your
// data feeds into your requests correctly
const algebra = new set.Algebra(
  set.props.id('_id'),
  set.props.dotNotation('address.state'),
  set.props.dotNotation('address.city')
);
// changes query path to handle dots rather than defaulting to brackets when it is an object
// like {address: {state: il, city: chicago}} so that it sends ?address.state=il as the query string
// rather than ?address[state]=il


Restaurant.List = DefineList.extend({
  '#': Restaurant
});

// connects models and  to api URL, adds ability to .getList, .get, and .save
// but really does a lot of things to setup API and caching. similar to "middleware"
//more info on superMap at https://canjs.com/doc/can-connect/can/super-map/super-map.html
Restaurant.connection = superMap({
  url: loader.serviceBaseURL + '/api/restaurants',
  Map: Restaurant,
  List: Restaurant.List,
  name: 'restaurant',
  algebra
});


export default Restaurant;
