// Récupération des travaux depuis l'API
const works = await fetch("http://localhost:5678/api/works").then(works => works.json());
// Récupération du token de login de l'utilisateur
let token = window.localStorage.getItem("token");

function verifLogin() {
    if ( token !== null ) {
        genererWorks(works)
        showHideElement()
    }else {
        genererWorks(works)
    }
}

function showHideElement() {
    const hideElem = document.querySelector(".hide");
    hideElem.classList.toggle("hide");

    const filters = document.getElementById("filters");
    filters.classList.toggle("hide_style");
    const icone1 = document.getElementById("icone1");
    icone1.classList.toggle("hide");
    const icone2 = document.getElementById("icone2");
    icone2.classList.toggle("hide");
    const modal1 = document.getElementById("modal1");
    modal1.classList.toggle("hide");
    const modal2 = document.getElementById("modal2");
    modal2.classList.toggle("hide");
    const login= document.getElementById("login");
    login.classList.toggle("hide");
    const logout= document.getElementById("logout");
    logout.classList.toggle("hide");
}

function genererWorks(works) {
    for (let i = 0; i < works.length; i++) {
        // Création des balises avec document.createElement
        const figure = works[i];
        // Récupération de l'élément du DOM qui accueillera les travaux
        const divGallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un travail d'architecture
        const workElement = document.createElement("figure");
        // Création des autres balises 
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const legendeElement = document.createElement("figcaption");
        legendeElement.innerText = figure.title;

        // On rattache la balise figure a la div gallery
        divGallery.appendChild(workElement);
        // Ajout réel à la page web en rattachant les éléments à un parent
        workElement.appendChild(imageElement);
        workElement.appendChild(legendeElement);
    }
}

function genererImageModalBoxWorks(works) {
    for (let i = 0; i < works.length; i++) {
        // Création des balises avec document.createElement
        const figure = works[i];
        // Récupération de l'élément du DOM qui accueillera les travaux
        const divModalBox = document.querySelector("#box_modal1_div");
        // Création d’une balise dédiée à un travail d'architecture
        const workElement = document.createElement("figure");
        // Création des icones 
        // <i class="fa-solid fa-arrows-up-down-left-right hover-icon" style="color: transparent;"></i>
        const stayIconeElement = document.createElement("i");
        stayIconeElement.classList.add("fa-solid");
        stayIconeElement.classList.add("fa-arrows-up-down-left-right");
        stayIconeElement.classList.add("hover-icon");
        // <i class="fa-regular fa-trash-can stay-icon" style="color: white;"></i>
        const hoverIconeElement = document.createElement("i");
        hoverIconeElement.classList.add("fa-regular");
        hoverIconeElement.classList.add("fa-trash-can");
        hoverIconeElement.classList.add("stay-icon");
        // Création des autres balises 
        const imageElement = document.createElement("img");
        imageElement.src = figure.imageUrl;
        const legendeElement = document.createElement("figcaption");
        legendeElement.innerText = ("éditer");

        // On rattache la balise figure a la div box modale
        divModalBox.appendChild(workElement);
        // Ajout réel à la page web en rattachant les éléments à un parent
        workElement.appendChild(stayIconeElement);
        workElement.appendChild(hoverIconeElement);
        workElement.appendChild(imageElement);
        workElement.appendChild(legendeElement);
    }
}

verifLogin()

//Gestion des boutons 
const boutonTous = document.querySelector(".btn_tous");
boutonTous.addEventListener("click", function(event) {
    event.preventDefault()
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(works);
});

const boutonObjets = document.querySelector(".btn_objets");
boutonObjets.addEventListener("click", function (event) {
    const worksFiltreesObjets = works.filter(function (works) {
        return works.categoryId == 1;
    });
    event.preventDefault()
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(worksFiltreesObjets);
});

const boutonAppartements = document.querySelector(".btn_appartements");
boutonAppartements.addEventListener("click", function (event) {
    const worksFiltreesObjets = works.filter(function (works) {
        return works.categoryId == 2;
    });
    event.preventDefault()
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(worksFiltreesObjets);
});

const boutonHotel_Restaurants = document.querySelector(".btn_hotel_restaurants");
boutonHotel_Restaurants.addEventListener("click", function (event) {
    const worksFiltreesObjets = works.filter(function (works) {
        return works.categoryId == 3;
    });
    event.preventDefault()
    document.querySelector(".gallery").innerHTML = "";
    genererWorks(worksFiltreesObjets);
});

// Gestion des box-modales
let modal = null

const openModal = function (event) {
    event.preventDefault()
    genererImageModalBoxWorks(works)
    const target = document.querySelector(event.target.getAttribute('href'))
    target.style.display = null
    target.removeAttribute("aria-hidden")
    modal = target
    modal.querySelector(".js-modal-close").addEventListener("click", closeModal)
    modal.querySelector(".overlay").addEventListener("click", closeModal)
}

const closeModal = function (event) {
    if (modal === null) return
    event.preventDefault()
    modal.style.display = "none"
    modal.setAttribute("aria-hidden", "true")
    modal.querySelector(".js-modal-close").removeEventListener("click", closeModal)
    modal.querySelector(".overlay").addEventListener("click", closeModal)
}

document.querySelectorAll(".js-modal").forEach(a => {
    a.addEventListener("click", openModal)
})

const logout = function (event) {
    window.localStorage.removeItem("token");
    document.location.href="http://127.0.0.1:5500/FrontEnd/index.html"
}

const login = function (event) {
    document.location.href="http://127.0.0.1:5500/FrontEnd/login.html"
}

document.querySelector("#logout").addEventListener("click", logout)
document.querySelector("#login").addEventListener("click", login)
