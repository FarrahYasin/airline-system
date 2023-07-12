'use strict';
require('dotenv').config();
const port = process.env.PORT || 3000 ;

const { faker } = require('@faker-js/faker');
const uuid = require('uuid');

const ioServer = require('socket.io')(port);
// const finalIo = ioServer(port)   //this line the same prev line but in another way


ioServer.on('connection', (socket) =>{ //this 'connection' event : is emitted by Sockt.io (automatically) whenever a new client connects to the server.
   //The event handler function receives the (socket) object representing the connection to the client.
   
   console.log('Your socket id:', socket.id);//Inside the 'connection' event handler, the server logs the ID of the client's socket connection to the console.

    //The server sets up (اعداد) an event listener for the 'start' event -> emitted by the client. 
    socket.on('start', () => {
    //When the client emits the 'start' event, the server starts emitting a 'new-flight' event to all connected clients every 10 seconds using setInterval.
        setInterval(() => {
            ioServer.emit('new-flight', { 
              event: 'new-flight',
              time: new Date(), 
              details: { 
                airLine: 'Royal Jordanian Airlines', 
                destination: `${faker.location.city()},${faker.location.country()}`,
                pilot: faker.person.fullName(),
                flightID: uuid.v4(),

            }  
                                      }
                      )
          } , 10000) 
    })
  
//The server sets up event listeners for the 'new-flight' event emitted by the client. 
      socket.on('new-flight', theNewFlight)

      function theNewFlight(payload) {
      console.log('Flight: ', payload)
       }

 //The server sets up event listeners for the 'Arrived' event emitted by the client. 
     socket.on('Arrived', arrivedFlight)
    
     function arrivedFlight(payload) {
        //The flight details received (payload) in these events are logged to the console
        console.log('Flight: ', payload)
     
        //the server emits the 'Arrived' event to all connected clients using ioServer.emit()
        ioServer.emit('Arrived', payload)
      }


    });

    //nameSpace --> /airline

    // The server also sets up a separate namespace /airline using --> ioServer.of('/airline')
ioServer.of('/airline').on('connection', (socket) => {
 // the server sets up an event listener for the 'took-off' event emitted by the client
    socket.on('took-off', tookOffFlight)

    function tookOffFlight(payload) {
        //When the client emits the 'took-off' event, the server logs the flight details (payload) to the console.
        console.log('Flight: ', payload)
    }
})

// important notes:
// any 'emit' 'send ' inside the server or system it means --> send a message to the client
// any 'on'  'receive ' inside the server or system it means --> sreceive a message from the client

