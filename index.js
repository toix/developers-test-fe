import './styling/main.scss';

import 'bootstrap';

import {initialize} from './js/Gallery';

document.addEventListener("DOMContentLoaded", function() {
    let gallery = document.querySelector('.gallery');
    initialize(gallery);
});