const eventsPool = require('./eventsPool')

require('./manager')
require('./pilot')

eventsPool.on('new-flight', theNewFlight)
eventsPool.on('took-off', tookOffFlight)
eventsPool.on('Arrived', arrivedFlight)


function theNewFlight(payload){
    console.log("Flight:", payload)
}
function tookOffFlight(payload){
    console.log("Flight:", payload)

}
function arrivedFlight(payload){
    console.log("Flight:", payload)

}
