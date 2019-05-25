class menuBurger {
  
  constructor(){
    // this.navMenu = document.querySelector('nav');
    this.button =  document.querySelector('.Menu__burger .croi');
    this.sections = document.querySelectorAll('.Menu__burger li');
    this.useMenu();
  }
  
  useMenu(){
    console.log(this.button)
    let d = document.querySelector('body')
    this.button.addEventListener( 'click', (e)=>{
      console.log(  this.button )
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

