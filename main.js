import './src/sass/style.sass'
import SliderAfterToBefore from './src/script/slider-after-to-before'

new SliderAfterToBefore({
    slider: document.querySelector('.slider'),
    classSlide: '.bg',
    classSlider: {
        0: 'divider--1',
        1: 'divider--2',
    },
    textSlider: {
        0: '3',
        1: '2',
        2: '1'
    },
})