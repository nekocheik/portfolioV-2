class menuBurger {
  constructor(){
    this.button =  document.querySelector('.Menu__burger .croi');
    this.sections = document.querySelectorAll('.Menu__burger div');
    this.useMenu();
  }
  
  useMenu(){
    let d = document.querySelector('body')
    this.button.addEventListener( 'click', (e)=>{
      this.sections.forEach( section  => { section.classList.toggle('active') });
      this.button.classList.toggle('active')
    });
  }
  
  move(){
    window.addEventListener('scroll', function ( event ) {
      let p = nav.querySelector('p');
      if ( p.className === 'active' ) {
        nav.classList.add('move')
        var navLinks = document.querySelectorAll('nav a');
        navLinks.forEach( link => { link.classList.remove('active') });
      }
    })
  }
  
}

export  {menuBurger }

