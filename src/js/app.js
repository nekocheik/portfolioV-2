
import  { cursor } from './function/cursor';
import  { ViewPort } from './lib/viewPort';
import  { changeOfProject } from './projet/projetMV';

// let requireCusor = require('../assets/images/icons/cursor.svg'); 
// console.log(requireCusor)



class SrollPosition  {
  
  constructor( element ){
    this.element = element ;
    this.positionX = -100;
    this.numberMove = 0 ;
    this.memoNumberMove = this.numberMove ;
    this.inversion = false;
    this.waitTime = false ;
    this.bottomPage = false ;
    this.projectStyles = {
      translateZ : 0 ,
      opacity : 1 ,
    }
  };

  detectScroll(){
    this.element.style.transform = `translateX( ${this.positionX}vw)`;
    // this.inversionPosition();
    this.detectSwipe()
    
    document.addEventListener("mousewheel", (event)=>{
      if ( !this.checkBottomPage() ) {
        return
      }
      
      if( this.positionX < 0 ){
        this.positionX = this.positionX + ( event.deltaY / 2.7 );
        this.projectStyles.translateZ = this.projectStyles.translateZ + ( event.deltaY / 4.5) * 75;
        
        if( this.positionX >= 0 ) {
          this.positionX = 0 ;
          this.projectStyles.translateZ = 2024;
          
          changeOfProject();
          
          TweenLite.to(".project", 1, 
          {css:{    
            transform : `translate3d( 0px , 0px , ${ this.projectStyles.translateZ }px)`,
          },});

          // for restes property for next project
          this.projectStyles.translateZ = 0 ;
          this.projectStyles.opacity = 1

        }if (this.positionX < -100 ) {
          this.positionX = -100
          this.projectStyles.translateZ = 0;
        }if ( this.positionX >= 0 ) {
          this.positionX = 0 ;
          this.projectStyles.translateZ = 100;
        }
        
        this.element.style.transform = `translateX( ${this.positionX}vw)`;
        this.projecTransform3d();
        this.inversion = true;

      }
    })};
    
    
    
    
    detectSwipe(){
      
      document.addEventListener('touchstart' , (evnt)=>{
        let startClientY = evnt.changedTouches[0].clientY ;
        document.addEventListener('touchmove' , (event)=>{
          console.log(event)
          if (!this.checkBottomPage()) {
            return
          }
          
          this.inversion = false;
          let touchDelta = event.changedTouches[0].clientY  - startClientY ;
          
          if (touchDelta < 0 ) {
            touchDelta = touchDelta.toString();
            touchDelta = touchDelta.replace(/-/, ' ')
            touchDelta = ( Number(touchDelta) / 100 ) * 100;
          }else{
            return
          }
          if( this.positionX < 0 ){
            this.positionX = this.positionX + ( touchDelta / 10 );
            if (this.positionX > 0 ) {
              this.positionX = 0 ;
              changeOfProject();
            }if ( this.positionX < -100 ) {
              this.positionX = -100
            }
            this.element.style.transform = `translateX( ${this.positionX}vw)`
            this.checkInversionPosition(this.positionX)
          }
        });
        
        document.addEventListener('touchstart' , (event)=>{
          startClientY = 0 ;
        })
      })
    }
    
    checkInversionPosition(positionX){
      let MemoPositionX = positionX ;
      setTimeout(()=>{
        if ( MemoPositionX , this.positionX  || this.positionX === 0 ) {
          this.inversion = true ;
        }
      }, 1500)
    }
    
    checkBottomPage(){
      let options = {
        root: document.querySelector('body'),
        rootMargin: '0px',
        threshold: 1.0
      }

      let viewPort = new ViewPort( document.querySelector('body') , 'bottom' , 'bottom' ) ;
      viewPort.detectViewport( (callback)=>{
        if( callback ){
          this.bottomPage = true ;
        }else{
          this.bottomPage = false;
        }
      })
      return  this.bottomPage ;
    }

    projecTransform3d() {
      this.projectStyles.opacity = this.projectStyles.opacity - 0.008;
      TweenLite.to(".project", 3, 
      {css:{    
        transform : `translate3d( 0px , 0px , -${ this.projectStyles.translateZ }px)`,
        opacity : this.projectStyles.opacity ,
      },
      ease:Power2.easeOut});  
    }


  }
  
  
  
  
  export{ SrollPosition  };
  
  
  
  
  
  
  
  

let srollPosition = new SrollPosition(document.querySelector('.sroll__barre'))
srollPosition.detectScroll();


// let viewPort = new ViewPort( dom , 'bottom' , 'bottom' , 0  )
// viewPort.detectViewport( (callback)=>{
//   if (callback) {

//   }
// })
  
  
  
  
  
  
  