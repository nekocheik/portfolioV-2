
import  { cursor } from './function/cursor';
import  { ViewPort } from './lib/viewPort';
import { SrollPosition } from './function/scroll'
import  { changeOfProject } from './projet/projetMV';
import { animation } from "./animation/animation";
import { inTheProject } from "./projet/page__projet";
import { menuBurger } from "./function/menuBurger";


//  préload Image 

let srollPosition = new SrollPosition(document.querySelector('.sroll__barre'))
srollPosition.detectScroll();
animation();
inTheProject();

var preload = require('../assets/images/présentation_project/*.svg');

// function preloader( Image ) {
// var preloadLink = document.createElement("link");
// preloadLink.rel = "preload";
// preloadLink.as = "image";
// preloadLink.href = "Image";
// document.head.appendChild(preloadLink);
// }

// preloader( preload.alien );
// preloader( preload.MontreConnecter1 )
// preloader( preload.logoSocomptoir )


new menuBurger()
  

var scene = document.getElementById('projects');

var parallaxInstance = new Parallax( scene , {
  relativeInput: true 
});
