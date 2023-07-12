'use strict';
require('dotenv').config();
const port = process.env.PORT || 3000;

//The client-side code establishes a connection to the server using the socket.io-client library.
const ioClient = require('socket.io-client');

//The client connects to the '/airline' namespace of the server using --> ioClient.connect(sub_Host).
const sub_Host = `http://localhost:${port}/airline`;    //nameSpace -->  '/airline'
const socket = ioClient.connect(sub_Host);           //nameSpace-->  '/airline'

//The client connects to the root namespace ('/') of the server using ioClient.connect(host)
const host = `http://localhost:${port}`;
const main_Socket = ioClient.connect(host);   //   --> '/' home root


// The client sets up an event listener for the 'new-flight' event emitted by the server in the root namespace.
  main_Socket.on('new-flight',NewFlight)    //   --> '/'

  //When the client receives a 'new-flight' event, the NewFlight function is called. This function simulates the flight lifecycle by emitting 'took-off' and 'Arrived' events with delays using the socket and main_Socket instances, respectively.
  function NewFlight(payload){

    setTimeout(() => {
      console.log(`Pilot: flight with ID ${payload.details.flightID} took-off`)
        payload.event = 'took-off';
        payload.time = new Date();
        socket.emit('took-off', payload);  //-->  '/airline'
    }, 4000);


    setTimeout(() => {
      console.log(`Pilot: flight with ID ${payload.details.flightID} has Arrived`)
        payload.event = 'Arrived';
        payload.time = new Date();
        main_Socket.emit('Arrived', payload);     //   --> '/'
    }, 7000);
  
  }

