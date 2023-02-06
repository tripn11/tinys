const animate = () => {
    let navChangePoint = window.innerHeight;
    let scrollPosition = window.scrollY;
    let navElement = document.getElementsByTagName("nav")[0];
    if(scrollPosition >= navChangePoint) {
        navElement.setAttribute('id','scrolled');
    }else{
        navElement.getAttribute('id') ? navElement.removeAttribute('id') : null;
    }
}

window.addEventListener("scroll", animate)