'use strict';

//list of bats
//useful for ALL 5 steps
//could be an array of objects that you fetched from api or database
const bars = [{
  'id': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'name': 'freemousse-bar',
  'pricePerHour': 50,
  'pricePerPerson': 20
}, {
  'id': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'name': 'solera',
  'pricePerHour': 100,
  'pricePerPerson': 40
}, {
  'id': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'name': 'la-poudriere',
  'pricePerHour': 250,
  'pricePerPerson': 80
}];

//list of current booking events
//useful for ALL steps
//the time is hour
//The `price` is updated from step 1 and 2
//The `commission` is updated from step 3
//The `options` is useful from step 4
const events = [{
  'id': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'booker': 'esilv-bde',
  'barId': 'f944a3ff-591b-4d5b-9b67-c7e08cba9791',
  'time': 4,
  'persons': 8,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '65203b0a-a864-4dea-81e2-e389515752a8',
  'booker': 'societe-generale',
  'barId': '165d65ec-5e3f-488e-b371-d56ee100aa58',
  'time': 8,
  'persons': 30,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}, {
  'id': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'booker': 'otacos',
  'barId': '6e06c9c0-4ab0-4d66-8325-c5fa60187cf8',
  'time': 5,
  'persons': 80,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'treasury': 0,
    'privateaser': 0
  }
}];

//list of actors for payment
//useful from step 5
const actors = [{
  'eventId': 'bba9500c-fd9e-453f-abf1-4cd8f52af377',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '65203b0a-a864-4dea-81e2-e389515752a8',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'eventId': '94dab739-bd93-44c0-9be1-52dd07baa9f6',
  'payment': [{
    'who': 'booker',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'bar',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'treasury',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'privateaser',
    'type': 'credit',
    'amount': 0
  }]
}];


//Step 1 functions :
//This function calculate the price of an event, it takes the id as argument
function priceCalculation(event_id){
  let selected_bar;
  let selected_event;

  for(let j=0; j<events.length; j++){
    if(events[j].id == event_id){
      selected_event = events[j];
    }
  }

  for(let i=0; i<bars.length; i++)
  {
    if (bars[i].id == selected_event.barId){
      selected_bar=bars[i];
    }
  }


  let time_price = selected_event.time*selected_bar.pricePerHour;
  let person_price = selected_event.persons*selected_bar.pricePerPerson;

  return time_price+person_price;
}

//This function refresh the prices for all events
function priceRefresh()
{
  for(let i=0; i<events.length; i++)
  {
    events[i].price = priceCalculation(events[i].id);
  }
}
//End of Step 1 functions

//Step 2 function(s) :

function priceCalculationWithDiscount(event_id){
  let selected_bar;
  let selected_event;

  for(let j=0; j<events.length; j++){
    if(events[j].id == event_id){
      selected_event = events[j];
    }
  }

  for(let i=0; i<bars.length; i++)
  {
    if (bars[i].id == selected_event.barId){
      selected_bar=bars[i];
    }
  }


  let time_price = selected_event.time*selected_bar.pricePerHour;


  let person_price = selected_event.persons*selected_bar.pricePerPerson;
  if(selected_event.persons>60){
    person_price = person_price/2;
  }
  else if (selected_event.persons>20) {
    person_price = person_price - 0.3*person_price;
  }
  else if (selected_event.persons>10) {
    person_price = person_price - 0.1*person_price;
  }

  return time_price+person_price;
}

function priceRefreshWithDiscount()
{
  for(let i=0; i<events.length; i++)
  {
    events[i].price = priceCalculationWithDiscount(events[i].id);
  }
}



//End of Step 2 function(s)

//Step 3 function(s) :

function commissionCalculation()
{
  for(let i=0; i<events.length; i++)
  {
    let commission = events[i].price*0.3;
    events[i].commission.treasury = events[i].persons;
    events[i].commission.insurance = commission/2;
    events[i].commission.privateaser = (commission/2)-events[i].persons;

  }
}

//End of Step 3 functions

//Step 4 function(s) :

function calculationWithDeductible()
{
  for(let i=0; i<events.length; i++)
  {
    if(events[i].options.deductibleReduction)
    {
      events[i].price += events[i].persons;
      events[i].commission.privateaser += events[i].persons;
    }
  }
}

//End of Step 4 functions

//Step 5 function(s)

function payingTheActors()
{
  for(let e = 0; e<events.length; e++)
  {
    for(let a = 0; a<actors.length; a++)
    {
      if(actors[a].eventId == events[e].id)
      {
        for(let p = 0; p < actors[a].payment.length; p++)
        {
          if(actors[a].payment[p].who == "booker")
          {
            actors[a].payment[p].amount = events[e].price;
          }
          if(actors[a].payment[p].who == "bar")
          {
            actors[a].payment[p].amount = events[e].price - events[e].commission.insurance - events[e].commission.treasury - events[e].commission.privateaser;
          }
          if(actors[a].payment[p].who == "insurance")
          {
            actors[a].payment[p].amount = events[e].commission.insurance;
          }
          if(actors[a].payment[p].who == "treasury")
          {
            actors[a].payment[p].amount = events[e].commission.treasury;
          }
          if(actors[a].payment[p].who == "privateaser")
          {
            actors[a].payment[p].amount = events[e].commission.privateaser;
          }
        }
      }
    }
  }
}






priceRefresh();
priceRefreshWithDiscount();
commissionCalculation();
calculationWithDeductible();
payingTheActors();
console.log(bars);
console.log(events);
console.log(actors);
