const EventEmitter = require("events");
class MyEmitter extends EventEmitter {}
const myEmitter = new MyEmitter();

const handler1 = () => console.log("handler1");

/*
const alert = () => console.log('some event');

myEmitter.on('event', alert);
myEmitter.once('event', alert);

myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.emit('event');*/

/*
// max listeners
myEmitter.setMaxListeners(5);
console.log(myEmitter.getMaxListeners());

myEmitter.on('event', (a, b) => {
    setImmediate(() => {
        console.log('asynchronously');
    })
});
myEmitter.on('event', (a,b) => {
    process.nextTick(() => {
        console.log('on tick');
    })
});
myEmitter.on('event', () => console.log('synchronously'));

myEmitter.emit('event');

// listener count and names
console.log(myEmitter.listenerCount('event'));
console.log(myEmitter.eventNames());*/

/*
// prepend listener (в начало стэка)
const hi = () => console.log('hi');
const hello = () => console.log('hello');

myEmitter.on('event', hi);
myEmitter.on('event', hello);
myEmitter.prependListener('event', hello);
// myEmitter.prependOnceListener('event', hello);

myEmitter.emit('event');*/

/*myEmitter.on('event', handler1);
myEmitter.emit('event');
myEmitter.emit('event');
myEmitter.off('event', handler1);
myEmitter.emit('event');
myEmitter.removeAllListeners();
myEmitter.emit('event');
myEmitter.emit('event');*/
