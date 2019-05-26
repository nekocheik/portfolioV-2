import { numberProject } from "./projetMV";

function inTheProject() {
  let project = document.querySelector('.project')
  let mainHidden = document.querySelectorAll('[data-display=visible]')
  
  project.addEventListener('click', ()=>{
    Theproject();
    
    let precedent = document.querySelector('.button__precedent');
    let next = document.querySelector('.button__next');
    next.className = "button__next visible";
    precedent.className = "button__precedent visible";

    mainHidden.forEach(element => {
      element.style.display = "none";
    });
    
    let projects = document.querySelectorAll('.the__project')
    projects[numberProject].classList.add('visible')
  })
}

var Theproject = function ( numberProject ){
  
  TweenLite.to(".circlesWhite", 10, 
  {css:{    
    animation: 'rotationCircle initial initial' ,
    zIndex: '-100',
  },
  ease:Power2.easeOut});
  //////////
  TweenLite.to("#Ellipse_14 circle", 6, 
  {css:{    
    strokeDasharray: '10px' ,
    transitionDuration: '100ms' ,
  },
  ease:Power2.easeOut});
  
  TweenLite.to("#Ellipse_13", 6, 
  {css:{    
    strokeDasharray: '3259px',
    strokeDashoffset: '3259px',
    animation: 'write 3s forwards',
  },
  ease:Power2.easeOut});
  
  TweenLite.to("#Ellipse_12", 3, 
  {css:{    
    strokeDasharray: '1991px',
    strokeDashoffset: '1991px',
    animation: 'write 3s forwards',
  },
  ease:Power2.easeOut});
  
  TweenLite.to("#Ellipse_11", 4, 
  {css:{    
    strokeDasharray: '1301px',
    strokeDashoffset: '1301px',
    animation: 'write 3s forwards',
  },
  ease:Power2.easeOut});
  
  
  
  if ( window.innerWidth < 800  ) {
    TweenLite.to(".sphere", 3, 
    {css:{    
      top: "-50px",
      animation : "circleGoCenter 0s" ,
      position: 'sticky',
    }, 
    ease:Power2.easeOut});
  }else{
    TweenLite.to(".sphere", 3, 
    {css:{    
      top: "-300px",
      width: "40vw",
      height: "40vw",
      animation : "circleGoCenter 0s" ,
    }, 
    ease:Power2.easeOut});
  }
  
  
}

export { inTheProject }


