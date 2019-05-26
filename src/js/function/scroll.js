import { ViewPort } from "../lib/viewPort";
import { changeOfProject } from '../projet/projetMV';

class SrollPosition  {
  constructor( element ){
    this.element = element ;
    this.positionX = -100;
    this.numberMove = 0 ;
    this.memoNumberMove = this.numberMove ;
    this.inversion = false;
    this.waitTime = {
      waite : false ,
      waiting : function () {
        this.waite = true ,
        setTimeout(() => {
          this.waite = false
        }, 1500 );
      }
    } ;
    this.bottomPage = false ;
    this.projectStyles = {
      translateZ : 0 ,
      opacity : 1 ,
    }
  };

  detectScroll(){
    this.element.style.transform = `translateX( ${this.positionX}vw)`;
    this.detectSwipe();
    this.checkInversionPosition()
    
    document.addEventListener("mousewheel", (event)=>{
      if ( !this.checkBottomPage() || this.waitTime.waite  ) {
        return
      }
      
      if( this.positionX < 0 ){
        this.positionX = this.positionX + ( event.deltaY / 2.7 );
        this.projectStyles.translateZ = this.projectStyles.translateZ + ( event.deltaY / 4.5) * 75;
        
        if( this.positionX >= 0 ) {

          this.waitTime.waiting()

          this.positionX = -100 ;
          this.projectStyles.translateZ = 2024;
          
          changeOfProject();
          
          TweenLite.to(".project", 0, 
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
        this.checkInversionPosition(this.positionX)
        this.inversion = true;
      }
    })};
    
    
    
    
    detectSwipe(){
      
      document.addEventListener('touchstart' , (evnt)=>{
        let startClientY = evnt.changedTouches[0].clientY ;
        document.addEventListener('touchmove' , (event)=>{
          if (!this.checkBottomPage() || this.waitTime.waite  ) {
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
            this.projectStyles.translateZ = this.projectStyles.translateZ + (touchDelta  / 6.5) ;
            if (this.positionX > 0 ) {
              // not animation for back of the barre 
              this.positionX = 0 ;

              changeOfProject();

              this.waitTime.waiting()

              this.positionX = -100 ;
              this.projectStyles.translateZ = 2024;
              
              changeOfProject();
              
              TweenLite.to(".project", 0, 
              {css:{    
                transform : `translate3d( 0px , 0px , ${ this.projectStyles.translateZ }px)`,
              },});

            }if ( this.positionX < -100 ) {
              this.positionX = -100
            }
            this.element.style.transform = `translateX( ${this.positionX}vw)`
            this.projecTransform3d();
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
        if ( MemoPositionX <= this.positionX  ) {
          this.inversionPositionX();
        }
      }, 5800)
    }

    inversionPositionX(){
      this.projectStyles.translateZ = 0;
      this.positionX = -100;
      this.projectStyles.opacity = 1 ;
      this.element.style.transform = `translateX( ${this.positionX}vw)`;
      this.projecTransform3d();
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
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  