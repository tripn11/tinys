//Animating the sticky nav bar

const amount = [];

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
    const price = amount.length > 0 ? amount.reduce((total,item)=>total + item) : 0;
    const displayPriceButton = document.querySelector('button span');
    displayPriceButton.innerHTML = `&#8358;${price}`;
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

smoothScrolling();
getMeals();
window.addEventListener("scroll", animate)