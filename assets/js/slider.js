export class Slider{
    constructor(name,){
        this.name= name
        this.carousel = document.getElementById("carusel");
        this.content = document.getElementById("content");
        this.next = document.getElementById("next");
        this.prev = document.getElementById("prev");
        this.block = document.getElementById("fhree__block");
        this.wrapper = document.getElementById('wrapper')
        this.width = this.wrapper.scrollWidth;
        this.scrollWidth=this.content.scrollWidth- this.wrapper.scrollWidth
        this.scrol = this.carousel.scrollLeft*2
        this.width = 0
    }
    slide_left(){
        next.style.display = 'flex'
        this.width -= this.block.scrollWidth
        this.content.scrollBy(-(this.block.scrollWidth + this.name.gap), 0);
        setTimeout(() => {
            
            if(this.name.loop){
                if (this.width < this.content.scrollLeft) {
                    this.content.scrollBy(this.content.scrollWidth, 0);
                    console.log(this.width);
                    console.log(`left ${this.content.scrollLeft}`);
                    console.log('прокрут');
                    this.width = this.content.scrollLeft
                }
                
            }
        }, 500);
            
    }
    slide_right(){
            this.width += this.block.scrollWidth
            prev.style.display = 'flex'
            this.content.scrollBy(this.block.scrollWidth + this.name.gap, 0);
            setTimeout(() => {
                const scrol = this.carousel.scrollLeft
                console.log(`width ${this.width}`);
                console.log(`left ${this.content.scrollLeft}`);
                if(this.name.loop){
                    console.log(999);
                    if (this.width >= this.content.scrollWidth) {
                        this.content.scrollBy(-this.content.scrollWidth, 0);
                        console.log('прокрут');
                        this.width = 0
                    }
                    
                }
        }, 500);
        
    }
}


