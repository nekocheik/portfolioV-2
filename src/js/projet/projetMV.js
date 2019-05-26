import { projects  } from './projects'; 
import { inTheProject } from '../projet/page__projet'

var numberProject = 0 ;

function changeOfProject(value) {
  renderChangeOfProject(value);
}

function renderChangeOfProject(value) {
  
  
  
  var project = document.querySelector('#home__page .project')
  project.innerHTML = "";
  numberProject++;

    
  if (value || value === 0 ) {
    numberProject = value ;
    console.log('is true')
  }

  if ( numberProject > projects.length - 1) {
    numberProject = 0
  }

  if ( numberProject < 0 ) {
    numberProject =  3;
  }
  
  var tween = TweenLite.to(".circlesWhite", 15, 
  {css:{    
    animation: 'rotationCircle 15s infinite , retractation 4s forwards',
  }});  
  
  setTimeout(() => {
    var tween = TweenLite.to(".circlesWhite", 15, 
    {css:{    
      animation: 'rotationCircle 15s infinite',
    }});  
  }, 2900);
  
  
  var view = ChangeOfProjectView(projects[numberProject]);
  project.appendChild(view.illustrationOfProject)
  project.appendChild(view.titlOfProject);
  renderNavProject(project)
}

var ChangeOfProjectView = function(project) {
  var view = {
    img : document.createElement('img'),
    titlOfProject : document.createElement('div'),
    illustrationOfProject : document.createElement('div'),
    a :  document.createElement('a') ,
    button : document.createElement('button'),
    
    render: function() {
      this.a.href = `#home__page`;
      this.img.src = project.image;
      view.a.appendChild(this.img);
      this.illustrationOfProject.appendChild(this.a);
      this.titlOfProject.innerHTML = `<h3 class='${project.modifier}'>${project.title}</h3> <h4 class="type__of__project" >${project.subTitle}</h4>`;
    },
  }
  
  
  view.illustrationOfProject.className = 'illustration__of__project';
  
  
  
  view.illustrationOfProject.addEventListener('click', ()=>{
    let precedent = document.querySelector('.button__precedent');
    let next = document.querySelector('.button__next');
    next.className = "button__next visible";
    precedent.className = "button__precedent visible";
    inTheProject()
  })
  
  view.titlOfProject.className = 'title__of__project';
  view.render();
  return view
}


var renderNavProject = function (project){ 
  let nav = document.querySelector('.nav__project p');
  nav.classList.add('trasition__back');
  setTimeout(()=>{
    nav.innerHTML = "" ;
    nav.className = "trasition__come";
    setTimeout(()=>{
      nav.innerHTML = numberProject + 1;
      nav.className = "";
    }, 200)
  }, 400)
  
}




export { changeOfProject , numberProject }