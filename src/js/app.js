
import  { cursor } from './function/cursor';
import  { ViewPort } from './lib/viewPort';
import { SrollPosition } from './function/scroll'
import  { changeOfProject } from './projet/projetMV';
import { animation } from "./animation/animation";
import { inTheProject } from "./projet/page__projet";
import { menuBurger } from "./function/menuBurger";
import { buttonProject } from "./function/button";


let srollPosition = new SrollPosition(document.querySelector('.sroll__barre'))
srollPosition.detectScroll();
animation();
inTheProject();
new menuBurger();
buttonProject();
  


