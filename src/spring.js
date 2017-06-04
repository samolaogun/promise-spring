/**
 * Spring
 * 
 * @description    Hooke's law simulation with dampened oscillation.
 * @author         Sam Olaogun
 * @license        MIT
 */
'use strict';

const requestAnimationFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame;

/**
 * @param {Function} callback
 * @param {Number} startPos
 * @param {Number} endPos
 * @param {Object} opts
 * 
 * @returns {Object}
 */
const Spring = function(callback, startPos = 0, endPos = 0, opts = {}) {
    const { d = 1, k = .25, v = 0 } = opts;

    this.callback = callback;

    // precision - prevent integer overflow
    this.precision = 0.0001;

    // k - spring constant (push back intensity)
    this.k = k;

    // d - damping
    this.d = d;

    // m - mass, a changeable mass is unpredicatable
    this.m = 10;

    // v - initial velocity
    this.v = v;

    // x - initial position
    this.x = startPos;

    // xi - record of initial position
    this.xi = startPos;

    // xf - final position
    this.xf = endPos;

    this._step = this._step.bind(this);
    this._controller = this._controller.bind(this);

    this.first = true;

    this.start();

    return new Promise(this._controller);
};

/**
 * @param {Function} resolve
 * @param {Function} reject
 */
Spring.prototype._controller = function(resolve, reject) {
    this.resolve = resolve;
    this.reject = reject;
};

Spring.prototype.start = function() {
    this.mayStep = true;
    requestAnimationFrame(this._step);
};

Spring.prototype.pause = function() {
    this.mayStep = false;
};

Spring.prototype._step = function() {
    if (this.mayStep) {
        if (this.first) {
            this.first = !this.first;
            this.startTime = performance.now() / 1000;
        }

        // t - current time in seconds, don't need that microsecond accuracy
        const t = +((performance.now() / 1000) - this.startTime).toPrecision(4);

        // dx - displacement, right is positive
        const dx = +(this.x - this.xf);

        // fs (f spring) - spring force
        const fs = +(-this.k * dx);

        // fd (f damping) - damping force
        const fd = +(-this.d * this.v);

        let wasSmaller = this.ft < this.precision && this.ft > -this.precision;

        // ft (f total) - total force
        this.ft = +(fs + fd);

        // a - acceleration (f = ma => a = f/m)
        const a = +(this.ft / this.m);

        // v - velocity, velocity == current velocity + delta velocity (a * t)
        this.v = +(this.v + (a * t));

        // x - current position (v = px/s, v * t = px)
        this.x = +(this.x + (this.v * t));

        this.callback({
            x: this.x,
            v: this.v
        });

        let isSmaller = this.ft < this.precision && this.ft > -this.precision;

        if (wasSmaller && isSmaller) {
            this.callback({
                x: this.xf,
                v: this.v
            });

            this.mayStep = false;
            this.resolve(this.xf);
            return;
        }

        requestAnimationFrame(this._step);
    }
};

module.exports = Spring;