'use strict'
const eventsPool = require('./eventsPool')
require('./manager')

eventsPool.on('new-flight', flightEventHandler)

function flightEventHandler(payload){
    // console.log(`-the status- of the flight ${payload.event} ${payload.time}`);
    setTimeout(()=>{
    console.log(`Pilot: flight with ID: ${payload.details.flightID} took-off`)
     payload.event= 'took-off',
      payload.time=new Date();        
      eventsPool.emit('took-off', payload)
}, 4000);


setTimeout(()=>{
    console.log(`Pilot: flight with ID: ${payload.details.flightID} has been Arrived`)
         payload.event='Arrived',
          payload.time= new Date(), 
        eventsPool.emit('Arrived', payload)
    }, 7000);

}