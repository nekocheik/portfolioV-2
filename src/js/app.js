
import  { cursor } from './function/cursor';
import  { ViewPort } from './lib/viewPort';
import { SrollPosition } from './function/scroll'
import  { changeOfProject } from './projet/projetMV';
import { animation } from "./animation/animation";
import { inTheProject } from "./projet/page__projet";
import { menuBurger } from "./function/menuBurger";

  let srollPosition = new SrollPosition(document.querySelector('.sroll__barre'))
  srollPosition.detectScroll();
animation();
inTheProject();

new menuBurger()
  

var scene = document.getElementById('projects');

var parallaxInstance = new Parallax( scene , {
  relativeInput: true 
});

// sceneTwo = document.querySelector('#sceneTwo');

// console.log(scene)

// var parallaxInstance = new Parallax( '#sceneTwo' , {
//   relativeInput: true 
// });