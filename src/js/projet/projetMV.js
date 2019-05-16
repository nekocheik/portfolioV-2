
import { projects  } from './projects'; 

console.log('ok');

var numberProject = 0 ;

function changeOfProject() {
  renderChangeOfProject();
}

function renderChangeOfProject() {



  var project = document.querySelector('#home__page .project')
  project.innerHTML = "";
  numberProject++;
  
  if ( numberProject > projects.length - 1) {
    numberProject = 0
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
      this.a.href = `#hideenDiv`;
      this.img.src = project.assets.pesentation;
      view.a.appendChild(this.img);
      this.illustrationOfProject.appendChild(this.a);
      this.titlOfProject.innerHTML = `<h3 class='${project.modifier}'>${project.title}</h3> <h4 class="type__of__projet" >${project.subTitle}</h4>`;
    },
  }
  
  
  view.illustrationOfProject.className = 'illustration__of__project';
  
  
  view.illustrationOfProject.addEventListener('click', function(){
    Theproject( numberProject )
  })
  
  view.titlOfProject.className = 'title__of__project';
  view.render();
  return view
}


export { changeOfProject }