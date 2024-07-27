class SliderAfterToBefore {
    _slides = []
    blocks = []
    _sliders = []
    isMove = false
    activeIndex = null
    cordinatsSliders = []
    constructor({ slider, classSlide, classSlider, textSlider }) {
        this.textSlider = textSlider
        this.classSlider = classSlider
        this.wrapp = slider
        this.wrapp.addEventListener('mousemove', this.moveSlider)
        this.sliderWidth = this.wrapp.clientWidth
        this.slides = classSlide
    }

    get slides() {
        return this._slides
    }

    set slides(className) {
        this._slides = this.wrapp.querySelectorAll(className)

        this.slides.forEach((el, i, arr) => {
            const block = document.createElement('div')
            block.classList.add('block')
            el.parentNode.replaceChild(block, el)
            block.append(el)
            block.style.zIndex = i + 1 
            this.blocks[i] = block
            
            if (i === 0) return
            const cordinat = ((this.sliderWidth / arr.length ) / this.sliderWidth) * (arr.length - i) * this.sliderWidth
            block.style.width = `${cordinat}px`

            const btn = document.createElement('button')
            btn.classList.add('divider__btn')
            btn.innerHTML = this.textSlider[i - 1] ?? `<${i}>`

            const slider = document.createElement('div')
            slider.classList.add('divider', this.classSlider[i - 1] ?? 'divider')
            slider.append(btn)
            slider.style.left = `${cordinat}px`

            this.wrapp.insertBefore(slider, this.blocks[i])
            this.cordinatsSliders[i - 1] = cordinat
            this.sliders = {
                divider: slider,
                btn: btn,
                index: i - 1
            }
        })
    }

    get sliders() {
        return this._sliders
    }

    set sliders(obj) {
        this.sliders.push(obj)

        obj.btn.addEventListener('mousedown', () => this.start(obj.index))
        obj.btn.addEventListener('mouseup', () => this.end())

        obj.btn.addEventListener('touchstart', () => this.start(obj.index))
        obj.btn.addEventListener('touchend', () => tthis.end())
        obj.btn.addEventListener('touchmove', this.moveSlider)
    }

    start = (i) => {
        this.isMove = true
        this.activeIndex = i
    }

    end = () => {
        this.isMove = false
        this.activeIndex = null
    }

    changeStyleBlock = (i, cordinat) => {
        this.sliders[i].divider.style.left =  `${cordinat}px`
        this.blocks[i + 1].style.width = `${cordinat}px`
        this.cordinatsSliders[i] = cordinat
    }

    moveSlider = (e) => {
        const rect = this.wrapp.getBoundingClientRect()
        const clientX = e.clientX ?? e.changedTouches[0].clientX 
        const x = clientX - rect.left
        if (x <= 0 || x >= this.sliderWidth || !this.isMove) return
        const cordinat = (x / this.sliderWidth) * this.sliderWidth

        for (let i = 0; i < this.cordinatsSliders.length; i++) {
            const c = this.cordinatsSliders[i]

            if (c <= cordinat && i < this.activeIndex && i != this.activeIndex) this.changeStyleBlock(i, cordinat)
            
            if (c >= cordinat && i > this.activeIndex && i != this.activeIndex) this.changeStyleBlock(i, cordinat)
        }
        
        this.changeStyleBlock(this.activeIndex, cordinat)
    }
}

export default SliderAfterToBefore