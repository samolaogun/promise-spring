'use strict';
const Spring = require('./spring')
const s = new Spring({
    xf: 50
});

const box = document.createElement('div');
box.classList.add('spring');
document.body.appendChild(box);

s(box, 'transform', 'px');