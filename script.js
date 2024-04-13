const imgContainer = document.getElementById('img-container');
const loader = document.getElementById('loader');

let ready = false;
let picsLoaded = 0;
let totalPics = 0;
let picsArray = [];

//=======================================================================UNSPLASH API

const count = 30;
const API_KEY = 'XuKVCR-sIDQV_RA3V-zGl5-V_DupUUp63P4umljue2M';
const API_URL = `https://api.unsplash.com/photos/random?client_id=${API_KEY}&count=${count}`;


//CHECK IF ALL PICS WERE LOADED
function imgLoaded(){
    picsLoaded++;
    if(picsLoaded === totalPics){
        ready = true;
        loader.hidden = true;
    }
}

//================================HELPER FUNCTION TO SET ATTRIBUTES ON DOM ELEMENTS
function setAttr(element, attributes){
    for (const key in attributes){
    element.setAttribute(key, attributes[key]);
    }
}


//===============================CREATE ELEMENTS FOR LINKS & PHOTOS & ADD TO THE DOM
function displayPics(){
    picsLoaded = 0;
    totalPics = picsArray.length;
    // RUN FUNCTION FOR EACH OBJECT IN picsArray
    picsArray.forEach((pic) => {
        //CREATE <a> TO LINK TO UNSPLASH
        const item = document.createElement('a');
        //CALL FUNCTION setAttr & CREATE OBJECTS
        setAttr(item, {
            href: pic.links.html,
            target: '_blank',
        })
        //CREATE <img> FOR PHOTO
        const img = document.createElement('img');
        //AGAIN CALL FUNCTION setAttr & CREATE OBJECTS
        setAttr(img, {
            src: pic.urls.regular,
            alt: pic.alt_description,
            title: pic.alt_description,
        });

        
        //EVENT LISTENER TO CHECK WHEN EACH IS FINISHED LOADING
        img.addEventListener('load', imgLoaded);

        //PUT <img> INSIDE <a> THEN PUT BOTH INSIDE imgContainer ELEMENT
        item.appendChild(img);
        imgContainer.appendChild(item);
    });
}


//=========================================================GET PICS FROM UNSPLASH API
async function getPics(){
    try{
        const response = await fetch(API_URL);
        picsArray = await response.json();
        displayPics();
    }
    catch (error){
        //CATCH ERROR HERE
    }
}

//CHECK TO SEE IF SCROLLING THE BOTTOM LOADS MORE PICS
window.addEventListener('scroll', () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        console.log('LOAD MORE');
        ready = false;
        getPics();
    }
});



//========================================================ON LOAD
getPics();