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

const callback1 = e =>
    circle.style.left = `${e.x}px`;

const callback2 = e =>
    circle.style.top = `${e.x}px`;

let queue = Promise.resolve([width / 2, height / 2]);
document.addEventListener('click', e => {
    queue = queue.then(([x, y]) =>
        Promise.all([
            new Spring(callback1, x, e.clientX - width / 2, {
                k: 1,
                d: 5
            }),
            new Spring(callback2, y, e.clientY - height / 2, {
                k: 1,
                d: 5
            })
        ]));
});