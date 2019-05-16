import { ViewPort } from "../lib/viewPort";


class givPotionPointer {
  constructor ( element , child ){
    this.element = element ; 
    this.x = null ;
    this.y = null ;
    this.initialisation()
    this.detectMoveCursor();
    this.child = child ;
    this.scaleX = 0 ;
    this.scaleY = 0 ;
    
    this.clearDeformatiom();
  }
  
  detectMoveCursor(){
    window.addEventListener('mousemove', (event)=>{
      this.x = event.clientX  - ( this.element.getBoundingClientRect().width / 2 ) ;
      this.y =  window.pageYOffset + event.clientY  - ( this.element.getBoundingClientRect().height / 2 ) ;
      this.giveMemoXY()
      
      if ( this.memoX > this.x ) {
        this.scaleX++ ;
      }else{
        this.scaleX-- ;
      }
      
      if ( this.memoY > this.y ) {
        this.scaleY++ ;
      }else{
        this.scaleY-- ;
      }
      
      
      this.element.style.left = `${this.x}px`;
      this.element.style.top = `${this.y}px`;
      
      this.element.style.transform = `skew(${this.scaleX * 1.5 }deg , ${this.scaleY * 1.5 }deg)`
    }) 
  }
  
  
  giveMemoXY(){
    if ( !this.x && !this.y ) {
      this.memoX = this.x ;
      this.memoY = this.y ;
    }
  }
  
  clearDeformatiom(){
    setInterval(() => {
      if ( this.scaleY  < 0 ) {
        this.scaleY++ ;
      }else{
        this.scaleY--;
      }
      if (this.scaleX < 0 ) {
        this.scaleX++ ;
      }else{
        this.scaleX-- ;
      }
    }, 25);
    
    setInterval(() => {
      this.element.style.transform = `skew(${ this.scaleX }deg , ${this.scaleY }deg)`
    }, 10);
    
    setInterval(() => {
      this.memoX = this.x ;
      this.memoY = this.y ;
    }, 100);
  }
  
  initialisation(){
    
  }
}

var cursor = function(){
  let elipse = document.querySelector('.cursor.cursor__Two') ;
  let circle = document.querySelector('.cursor__one') ;
  if (window.innerWidth > 800 ) {
    let pointerCircle  = new givPotionPointer( circle ) ;
    let pointerEliplse = new givPotionPointer( elipse ) ;
  }
}

cursor();



export { cursor }
