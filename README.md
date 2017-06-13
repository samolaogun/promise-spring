# Promise Spring

"Promise Spring" is a spring dynamics simulation in JavaScript. Plainly, it's promise based animation system, useful for animating content in a sequential manner.

## Installation
The only currently availible option is UMD, which can be found in the "dist" folder.
```
<script src="promise-spring.js"></script>
```

## Usage
```javascript
const Spring = new Spring(callback, [, startingValue [, endingValue]][,options]);
```
- callback
    - called once each frame, add your own logic; argument list below. Required field.
    - `x` - current position of the spring
    - `v` - current velocity of the spring
- startingValue
    - value that the spring should start at. 
- endingValue
    - value that the spring should animate to
- options
    options for how the spring should animate.
    
    - `k` **number** stiffness of the spring, numbers from 0 to 1 work best.
    - `d` **number** damping of the spring, numbers from 0 to 1 work best.
    - `v` **number** inital velocity of the spring.
    
## Quick Start Guide

A promise based system yields many opportunities as to how you carry out your animations. Additionally, the callback architecture allows you to animate a wide range of properties at your own discretion.

```javascript
// callback takes in a range of properties, including position and velocity
const someCallback = ({ x, v }) =>
    console.log(`position: ${x}, velocity: ${v}`);

// animate from 0 to 200 with a damping coefficient of 40
new Spring(someCallback, 0, 200, { d: 40 });

// animate from 0 to 200 then 200 to 400 then 400 to 100
new Spring(someCallback, 0, 200)
    .then(xi => new Spring(someCallback, xi, 400))
    .then(xi => new Spring(someCallback, xi, 100));

// animate from 0 to 400 and to 0 to 400 simultaneously and 400 to 200 and 400 to 100 simultaneously
Promise.all([
    new Spring(someCallback, 0, 400),
    new Spring(someOtherCallback, 0, 400)
]).then([(xi1, xi2]) => 
    Promise.all([
        new Spring(someCallback, xi1, 200),
        new Spring(someOtherCallback, xi2, 100)
    ])
);
```
## License

See it [here](http://github.com/samolaogun/spring/blob/master/LICENSE).

