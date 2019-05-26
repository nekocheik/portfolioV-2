import { changeOfProject , numberProject } from '../projet/projetMV';
import { inTheProject } from '../projet/page__projet';
const { detect } = require('detect-browser');



let buttonProject = function(){
  let precedent = document.querySelector('.button__precedent');
  let next = document.querySelector('.button__next');
  let projects = document.querySelectorAll('.the__project')


const browser = detect();
if ( browser.name === 'safari' && browser.os === 'Mac OS' ) {
  next.className = "button__next active";
  precedent.className = "button__precedent active";
}


  next.addEventListener('click', ()=>{
    if ( next.className === "button__next active") {
      let value = numberProject ;
      value++;
      changeOfProject( value );
    }

    if ( next.className === "button__next visible") {
      let number ; 
      for (let index = 0; index < projects.length; index++) {
        if ( projects[index].className === 'the__project visible') {
          number = index ;
         }
         projects[index].classList.remove('visible') ;
       }
      number++;
      if ( number > 3 ) {
        number = 0 ;
      }

      projects[number].classList.add('visible') ;
    }
    
  })
  
  precedent.addEventListener('click', ()=>{
    if ( precedent.className === "button__precedent active") {
      let value = numberProject ;
      value--;
      changeOfProject( value );
    }

    if (precedent.className === "button__precedent visible") {
      let number;
      for (let index = 0; index < projects.length; index++) {
        if ( projects[index].className === 'the__project visible') {
          number = index ;
         }
         projects[index].classList.remove('visible');
       }
        number--;
        if ( number < 0 ) {
          number = 3 ;
        }
      projects[number].classList.add('visible');
    }
    
  })
}




export { buttonProject };