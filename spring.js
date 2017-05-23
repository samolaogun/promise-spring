/**
 * Spring
 * 
 * @description The way that a spring animation works no different than physical oscillation.
 * In both real life and in the digital world, springs can be represented by a function 
 * called a "damped oscillation". For a function to be damped simply means that as the
 * function progresses, or as the x value of the function increases, the y value, or the 
 * function output approches a single value, which in this case is 0. I chose to 
 * create this animation using javascript because CSS animations are clamped to a specific range, 
 * which means that they do not support elastic behaviors such as this.
 * Keep in mind that this is a true spring animation (a spring is never truly stable), but 
 * more just a visual illusion (the limit can never be reached).
 * @author Sam Olaogun
 */
'use strict';

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame;

/**
 * Hookes Law:
 * f = -kx where k = an integer and x = displacement
 * 
 * Pseudo conditions:
 * Essentially,  phase shifts and scales make the conditions mutable
 * 
 * Spring Constance (Tension) - Ranges from 0 to 1. Mind that as you increase
 * the domain (the tension value), the tension increase. Because the domain is scaled 
 * so the function traverses more x values in the function, which approaches a limit, quickly.
 * 
 * Mass - The relative mass of the element
 * 
 * Initial Velocity - Phase shift to change (left, down)
 * shift function down and to the right to fix init velocity and
 * change crest height (1.6142) to fit by plugging the new x offset
 * value into the function (intercept, x+= val).
 * 
 * Precision - The threshold / accuracy of the simulation.
 * Without precision, the spring will never be stable
 */

/**
 * @description Solves 
 * 
 * @param {number} [k=.5] - Spring constant (Tension)
 * @param {number} [m=1] - Mass
 * @param {number} [d=.5] - Damping/Efficiency
 * @param {number} xf - Final position
 * @param {number} [x=0] - Initial Displacement 
 */
function Spring({ k = .5, m = 1, d = .5, xf = 200, x = 0 }) {
    this.k = k;
    this.m = m;
    this.d = d;
    this.xf = xf;
    this.x = x;

    // Initial velocity
    this.v0 = 0;
    this.v = this.v0;

    // fTotal - Total force
    this.fTotal = -this.k * (this.xf - this.x);

    // precision - Simulation accuracy, prevents floating-point error
    this.precision = 0.01;

    this.start = true;

    return (el, prop, unit = 'px') => {
        this.el = el;
        this.prop = prop;
        this.unit = unit;

        this.render();
    }
}

/**
 * @description Increments position each frame
 * @param {number} currTime Time in seconds when the next frame is fired
 */
Spring.prototype.step = function(currTime) {
    if (this.start) {
        this.start = !this.start;
        this.startTime = currTime;
    }

    // Time in seconds
    let t = (this.startTime - currTime) / 1000;

    // Change in displacement 1px = 1m
    this.dx = this.xf - this.x;

    // Current force, N
    let f = -this.k * this.dx + this.fTotal;

    // Current acceleration, N / px
    let a = f / this.m;

    // Instantaneous Velocity = Velocity + Acceleration
    this.v = this.v + a;

    // Displacement = Instantaneous Velocity * Time
    this.x = this.v * t;

    if (Math.abs(f) < this.precision) return;

    this.render();
}

Spring.prototype.render = function() {
    this.el.style.transform = `translateX(${this.x}${this.unit})`;
    console.log()
    requestAnimationFrame(this.step.bind(this));
}

module.exports = Spring;