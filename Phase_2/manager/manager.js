'use strict';

require('dotenv').config();
const port = process.env.PORT || 3000;

// const { faker } = require('@faker-js/faker');
// const uuid = require('uuid');

const ioClient = require('socket.io-client');

const host = `http://localhost:${port}`;
const socket = ioClient.connect(host); //this will emmit an event (automatically) this event:called --> connection (يلي  موجود بالسيرفر)


socket.on('new-flight', handelNewFlight)

function handelNewFlight (payload){
   
    console.log(`Manager: new flight with ID ${payload.details.flightID} have been scheduled`)
   
}

setTimeout(() => {
    
    socket.on('Arrived', (payload) => {
        console.log(`Manager: we’re greatly thankful for the amazing flight, ${payload.details.pilot}`)
     })
  },1);