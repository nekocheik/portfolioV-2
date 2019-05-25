import { ViewPort } from "../lib/viewPort";


var animation = function (params) {
  let  titleProjet = document.querySelector('.projects h3')
  let viewPort = new ViewPort(titleProjet) ;
  viewPort.detectViewport( function(callback){
    if( callback ){
      titleProjet.classList.add('transtision')
    }else{
      titleProjet.classList.remove('transtision')
    }
  })

}

export{animation}