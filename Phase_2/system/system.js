'use strict';


require('dotenv').config();
const port = process.env.PORT || 3000 ;
const { faker } = require('@faker-js/faker');
const uuid = require('uuid');
const ioServer = require('socket.io')(port);


let queue = {
  flights: {

  }
};


ioServer.on('connection', (socket) =>{ 
    console.log('Welcome, your socket id:', socket.id);

    socket.on('start', () => {
        setInterval(() => {
           
            ioServer.emit('new-flight', { event: 'new-flight', time: new Date(),  Details: { 
                airLine: 'Royal Jordanian Airlines', 
                flightID: uuid.v4(),
                pilot: faker.person.fullName(),
                destination: `${faker.location.city()},${faker.location.country()}`,
                }  
            } 
        )
        
    } , 10000) 
    })
  
    socket.on('get-all', ()=>{
        socket.emit('flight', queue)
    
        })


    socket.on('new-flight',(payload) =>{
        const id = uuid.v4();
        queue.flights[id] = payload;
        console.log('queue =',queue.flights[id]);
    
      })


 
socket.on('new-flight', newFlight)
function newFlight(payload) {
    console.log('Flight:', payload)
    
}

    socket.on('Arrived', flightArrived)
    function flightArrived(payload) {
        console.log('Flight:', payload)
        ioServer.emit('Arrived', payload)
    }

socket.on('disconnect', payload => {
    queue = {
        flights: {}
    }
})

} )



ioServer.of('/airline').on('connection', (socket) => {
    socket.on('took-off', flightTookOff)

    function flightTookOff(payload) {
        console.log('Flight:', payload)
    }
})

