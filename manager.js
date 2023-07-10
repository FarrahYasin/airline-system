'use strict'

const { faker } = require('@faker-js/faker');
const uuid = require('uuid');
const eventsPool = require('./eventsPool');

eventsPool.on('new-flight', flightEventHandler)

function flightEventHandler(payload){
console.log(`Manager: new flight with ID: ${payload.details.flightID} have been scheduled.`);
}

setInterval(()=>{
    eventsPool.emit('new-flight',  //this object is the payload that i send to  handler
               { event: 'new-flight', time: new Date(),
              details: {
                    airLine:'Royal Jordanian Airlines',
                    flightID:uuid.v4(),
                    pilot:faker.person.fullName(),
                    destination:`${faker.location.city()},${faker.location.country()}`

                       }   
                }
      )
 } ,10000)

setTimeout(()=>{
    eventsPool.on('Arrived',(payload)=>{
        console.log(`Manager: we’re greatly thankful for the amazing flight ${payload.details.pilot}`)
})
},1)

