# Spring

Physics has always been an interest of mine. Here's a simple simulation of Hooke's law and Damping with JavaScript. It's promise based, so using it at first might be a bit tricky, but it plays nicely with the Web Animations API. Here it goes.

```javascript
const Spring = new Spring(callback, [, startingValue [, endingValue]][,options]);
```

| Parameter      | Description                              | Default Value     |
| ------------- | ---------------------------------------- | ----------------- |
| callback      | called once each frame, add your own logic; argument list below | Required field.   |
| startingValue | value that the spring should start at    | 0                 |
| endingValue   | value that the spring should animate to  | 100               |
| options       | options for how the spring should animate | Refer to options. |

## Callback

| Parameter | Description                    |
| -------- | ------------------------------ |
| x        | current position of the spring |
| v        | current velocity of the spring |

## Usage

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

## Options

| Property | Description             | Default Value |
| -------- | ----------------------- | ------------- |
| k        | stiffness of the spring | 1             |
| d        | damping of the spring   | 0.25          |

## License

See it [here](http://github.com/samolaogun/spring/blob/master/LICENSE).

