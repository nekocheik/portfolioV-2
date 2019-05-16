import {  changeOfProject  } from './changeOfProject';
import { ViewPort } from "./viewPort";
import { changeOfProject } from '../projet/projetMV';

class SrollPosition  {
  
  constructor( element ){
    this.element = element ;
    this.positionX = -100;
    this.numberMove = 0 ;
    this.memoNumberMove = this.numberMove ;
    this.inversion = false;
    this.waitTime = false ;
    this.bottomPage = false ;
    this.translateZ = 0 ;
    this.onTransition = false ; 
  };
  detectScroll(){
    this.element.style.transform = `translateX( ${this.positionX}vw)`;
    this.inversionPosition();
    this.detectSwipe()
    
    document.addEventListener("mousewheel", (event)=>{
      if ( !this.checkBottomPage() || this.onTransition  ) {
        return
      }
      
      
      if( this.positionX < 0 ){
        this.positionX = this.positionX + ( event.deltaY / 2.7 );
        this.translateZ = this.translateZ + ( event.deltaY / 4.5) * 75;
        
        if (this.positionX >= 0 &&  !this.waitTime  ) {
          this.positionX = 0 ;
          this.translateZ = 2024;
          
          
          this.onTransition = true ;
          this.waitTime = true
          
          
          setTimeout(()=>{
            this.waitTime = false ; 
          }, 1500)
          this.transitionSetTimeout();
          
          console.log('ok');
          changeOfProject();
          
          
          TweenLite.to(".project", 0, 
          {css:{    
            transform : `translate3d( 0px , 0px , ${ this.translateZ }px)`,
          },});

          this.translateZ = 0 ;


        }if (this.positionX < -100 ) {
          this.positionX = -100
          this.translateZ = 0;
        }if ( this.positionX >= 0 ) {
          this.positionX = 0 ;
          this.translateZ = 100;
        }
        this.element.style.transform = `translateX( ${this.positionX}vw)`;
        this.projecTransform3d();
        this.inversion = true;
      }
    })};
    
    transitionSetTimeout(){
      setTimeout(() => {
        this.onTransition = false ;
      }, 3500);
    }
    
    projecTransform3d() {
      TweenLite.to(".project", 3, 
      {css:{    
        transform : `translate3d( 0px , 0px , -${ this.translateZ }px)`,
      },
      ease:Power2.easeOut});  
    }

    
    
    inversionPosition(){
      setInterval(() => {
        if (this.inversion) {
          if (this.positionX > -100 || !this.onTransition ) {
            
            if (this.positionX > -100) {
              this.positionX = this.positionX - 0.3;
            }
            
            if (!this.onTransition) {
              this.translateZ = this.translateZ - 0.3;
              this.projecTransform3d();
              this.element.style.transform = `translateX( ${this.positionX}vw)`
            }
            
          }else{
            this.inversion = false;
          }
        }
      }, 10);
    };
    
    
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
          this.inversion = true;
        }
      }, 1500)
    }
    
    checkBottomPage(){
      let viewPort = new ViewPort( document.querySelector('main') , 'bottom' , 'bottom' , ( document.body.clientHeight * ( 40 / 100 ) ) ) ;
      viewPort.detectViewport( (callback)=>{
        if( callback ){
          this.bottomPage = true ;
        }else{
          this.bottomPage = false;
        }
      })
      return  this.bottomPage ;
    }
  }
  
  
  
  
  export{ SrollPosition  };
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  