/**
 * spring-example
 * 
 * An example of promise-based spring
 * animations with a queue. Might be a bit slow
 * because animations are only resolved when the spring 
 * is completely stable.
 * 
 * @author    Sam Olaogun
 * @license   MIT
 */
'use strict';

const style = getComputedStyle(circle);

const width = parseInt(style.width);
const height = parseInt(style.height);

const transform = {
    x: width / 2,
    y: height / 2
};

const callback1 = e =>
    circle.style.transform = `translate(${transform.x = e.x}px, ${transform.y}px)`;

const callback2 = e =>
    circle.style.transform = `translate(${transform.x}px, ${transform.y = e.x}px)`;

let queue = Promise.resolve([width / 2, height / 2]);
document.addEventListener('click', e => {
    queue = queue.then(([x, y]) =>
        Promise.all([
            new Spring(callback1, x, e.clientX - width / 2, {
                k: .2,
                d: 1
            }),
            new Spring(callback2, y, e.clientY - height / 2, {
                k: .2,
                d: 1
            })
        ]));
});