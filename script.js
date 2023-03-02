//Animating the sticky nav bar

const amount = [];

const ios = () => {
    const myVideo = document.getElementById('welcome-video');
    const isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  
  if (isiOS) {
    myVideo.setAttribute('playsinline', '');
    myVideo.addEventListener('canplaythrough', function() {
      myVideo.play();
    });
  } else {
    myVideo.autoplay = true;
    myVideo.play();
  }
}

const navAnime = ()=>{
    const navElement = document.getElementsByTagName("nav")[0];
    if(window.scrollY >= window.innerHeight) {
        navElement.setAttribute('id','scrolled');
    }else{
        navElement.getAttribute('id') ? navElement.removeAttribute('id') : null;
    }
}

//sliding in the images in the webpage
const imageSlide = ()=> {
    const images = document.querySelectorAll("picture > img");
    images.forEach((image)=>{
    const middle = image.offsetTop + (image.height/2);
    const bottom = image.offsetTop + image.height;
    const slidePoint = middle - window.innerHeight;
    const exitPoint = bottom;
        if(window.scrollY>=slidePoint && window.scrollY <= exitPoint){
            image.classList.add("appear");
        }else{
            image.classList.remove("appear");
        }
    })
}

const player = () => {
    const video = document.querySelector('#trust-the-chef video');
    const start = video.offsetTop + (video.height/2);
    const end = video.offsetTop + video.height - 100;
    const scrollPoint = window.scrollY + window.innerHeight;
    if(scrollPoint >= start && window.scrollY <= end) {
        video.play();
    }else {
        video.pause();
    }
}
//animation on scroll controller
const animate = () => {
   navAnime();
   imageSlide();  
   player(); 
}


// for flipping the meal images
const flip = (e) => {
    e.target.parentElement.parentElement.parentElement.classList.add('flipped');
}

const displayPrice = () => {
    const displayPriceButton = document.querySelector('button span');
    const button = document.querySelector('form > button');
    const price = amount.length > 0 ? amount.reduce((total,item)=>total + item) : 0;
    // displayPriceButton.innerHTML = price > 0 ? `&#8358;${price}` : '';
    if (price > 0) {
        displayPriceButton.innerHTML = `&#8358;${price}`;
        button.removeAttribute('disabled');
    } else {
        displayPriceButton.innerHTML = '';
        button.setAttribute('disabled','');
    }
}

const select = (element) => {
    let price = element.previousElementSibling.textContent;
    price = Number(price.slice(2));
    amount.push(price);
    displayPrice();
}

const unselect = (element) => {
    let price = element.previousElementSibling.textContent;
    price = Number(price.slice(2));
    const index = amount.indexOf(price) 
    amount.splice(index,1);
    displayPrice();
}

const noted = (e) => {
    let element;
    if (e.target.tagName === 'DIV'){
        element = e.target.parentElement.parentElement.parentElement;
    }else {
        element = e.target.parentElement.parentElement.parentElement.parentElement;
    }

    element.classList.remove('flipped')


    //to change the button content when clicked take note of price
    if(e.target.tagName ==='BUTTON') {
        if(e.target.textContent === 'Select') {
            e.target.textContent = 'Unselect'; 
            select(e.target);
        } else {
            e.target.textContent='Select';
            unselect(e.target);
        }
    }
}

const getMeals = () => {
    const mealCards = document.querySelectorAll('.front-side');
    mealCards.forEach((mealCard) =>{
        mealCard.addEventListener('click', flip);
    })

    const backOfMealCards = document.querySelectorAll('.back-side')
    backOfMealCards.forEach((mealCard)=>{
        mealCard.addEventListener("click", noted)
    })
}

// to achieve smooth scrolling
    const scroller = (e) => {
        e.preventDefault();
        let href;
        if(e.target.tagName ==='BUTTON') {
            href = e.target.parentElement.getAttribute('href');
        }else {
            href = e.target.getAttribute("href");
        }
        
        const offsetTop = document.querySelector(href).offsetTop;
        scroll({
        top: offsetTop,
        behavior: "smooth"
        });
  }

const smoothScrolling = () => {
    const links = document.querySelectorAll("a.scroll");

    links.forEach((link)=>{
        link.addEventListener("click", scroller);
    }) 
}

const showNavMobile = (e) => {
    const iconType = e.target.getAttribute('name');
    const nav = document.querySelector('nav');

    if(iconType === 'menu-outline') {
        e.target.parentElement.style.visibility = 'hidden';
        setTimeout(()=>{e.target.parentElement.nextElementSibling.style.visibility = 'visible';},300);
        nav.style.transform ='translateX(10%)';
        nav.style.visibility='visible'; //this is necessary for the mobile because the nav keeps appearing then translating to 100% when loaded and when scrolled to important point
    } else {
        e.target.parentElement.style.visibility = 'hidden';
        setTimeout(()=>{e.target.parentElement.previousElementSibling.style.visibility = 'visible';},300);
        nav.style.transform ='translateX(100%)';
        nav.style.visibility='hidden';
    }
}

//for mobile nav-icon 
const showNav = () => {
    const navIcons = document.querySelectorAll(".nav-icon");
    navIcons.forEach((icon)=> {icon.addEventListener('click',showNavMobile)})
}


//for controlling the showing of complete meals in mobile

const controlShowMeals = (e) => {
    const action = e.target.getAttribute('id');
    const meals = document.querySelectorAll('.flip-box');
    const show = document.getElementById('show');
    const hide = document.getElementById('hide');
    const anchor = document.querySelector('.flip-box:nth-of-type(3)');
    if(action === 'show') {
        show.style.display='none';
        hide.style.display='block';
        meals.forEach((meal)=>{
            meal.style.display='block';
        })
    }else {
        show.style.display='block';
        hide.style.display='none';

        for(let i=3; i<meals.length; i++) {
            meals[i].style.display='none';
        }

        scroll({
            top:anchor.offsetTop + anchor.parentElement.offsetTop + anchor.parentElement.parentElement.offsetTop - window.innerHeight/2
        })
    }
}

const showMeals = () => {
    const control = document.querySelectorAll('.show-meals');
    control.forEach((item) => {
        item.addEventListener('click', controlShowMeals);
    }) 
}



showMeals();
showNav();
smoothScrolling();
getMeals();
window.addEventListener("scroll", animate)
document.addEventListener('DOMContentLoaded',ios);