
import  { cursor } from './function/cursor';
import  { ViewPort } from './lib/viewPort';
import { SrollPosition } from './function/scroll'
import  { changeOfProject } from './projet/projetMV';
import { animation } from "./animation/animation";
import { inTheProject } from "./projet/page__projet";

  let srollPosition = new SrollPosition(document.querySelector('.sroll__barre'))
  srollPosition.detectScroll();
animation();
inTheProject();


  