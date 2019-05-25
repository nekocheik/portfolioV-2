
import  { cursor } from './function/cursor';
import  { ViewPort } from './lib/viewPort';
import { SrollPosition } from './function/scroll'
import  { changeOfProject } from './projet/projetMV';
import { animation } from "./animation/animation";
import { inTheProject } from "./projet/page__projet";
import { menuBurger } from "./function/menuBurger";


//  préload Image 

var images = new Array()
function preload() {
  for ( let i = 0; i < 3 ; i++) {
    images[i] = new Image()
    images[i].src = preload[i]
  }
}

preload(
  '../../assets/images/présentation_project/MontreConnecter.1.svg',
  '../../assets/images/présentation_project/logoSocomptoir.svg' ,
  '../../assets/images/présentation_project/alien.svg'
)

let srollPosition = new SrollPosition(document.querySelector('.sroll__barre'))
srollPosition.detectScroll();
animation();
inTheProject();

new menuBurger()
  

var scene = document.getElementById('projects');

var parallaxInstance = new Parallax( scene , {
  relativeInput: true 
});
