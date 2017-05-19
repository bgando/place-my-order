import Component from 'can-component';
import DefineMap from 'can-define/map/';
import './list.less';
import view from './list.stache';
import Restaurant from 'place-my-order/models/restaurant';
import State from 'place-my-order/models/state';
import City from 'place-my-order/models/city';
import canDefineStream from 'can-define-stream-kefir';

export const ViewModel = DefineMap.extend({
  get states() {
    return State.getList({});
  },
  state: {
    type: 'string',
    value: null
  },
  get cities() {
    let state = this.state;

    if(!state) {
      return null;
    }

    return City.getList({ state });
  },
  city: {
    type: 'string',
    stream: function(setStream){
        var nullStream = this.toStream(".state").map(() => null);
        return setStream.merge(nullStream);
    }
  },
  get restaurants() {
    let state = this.state;
    let city = this.city;

    if(state && city) {
      return Restaurant.getList({
        'address.state': state,
        'address.city': city
      });
    }

    return null;
  }
});

canDefineStream(ViewModel);

export default Component.extend({
  tag: 'pmo-restaurant-list',
  ViewModel,
  view
});


// import Component from 'can-component';
// import DefineMap from 'can-define/map/';
// import './list.less';
// import view from './list.stache';
// import Restaurant from 'place-my-order/models/restaurant';
// import State from 'place-my-order/models/state';
// import City from 'place-my-order/models/city';

// export const ViewModel = DefineMap.extend({
//   // returns state promise
//   get states() {
//     return State.getList({});
//   },
//   state: {
//     type: 'string',
//     value: null,
//     set() {
//       // Remove the city when the state changes
//       // imperative and could/should be removed w/streams
//       this.city = null;
//     }
//   },
//   get cities() {
//     let state = this.state;

//     if(!state) {
//       return null;
//     }

//     return City.getList({ state });
//   },
//   city: { 
//     type: 'string',
//     value: null
//     // we have this property but we don't know it's behavior because state changes it. streams will help
//   },
//   get restaurants() {
//     let state = this.state;
//     let city = this.city;

//     if(state && city) {
//       //service layer expects address.state/address.city bc mongoDB
//       return Restaurant.getList({
//         'address.state': state,
//         'address.city': city
//       });
//     }

//     return null;
//   }
// });

// // restaurants is can be an aysnc getter.
// // why did we break up the promise and the getter?
// //    in order to be able to check the state of the promise such as resolved, rejected, etc
// // how does a getter automatically update? this was covered yesterday

// export default Component.extend({
//   tag: 'pmo-restaurant-list',
//   ViewModel,
//   view
// });
