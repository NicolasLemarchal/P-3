// Gestion du bouton d'envoie
const boutonEnvoie = document.querySelector(".btn_envoie");
boutonEnvoie.addEventListener("click", async function(event) {
    event.preventDefault()
    // Création de l’objet du nouveau login.
    const login = {
        "email": document.getElementById("email").value,
        "password": document.getElementById("mdp").value
    };
    // Récupération du token de login depuis l'API
    const response = await fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(login)
    });
    let loginToken = await response.json();
    // Vérification de la validité de la requête
    if (typeof loginToken.token !== 'undefined') {
        window.localStorage.setItem("token", loginToken.token);
        document.location.href="http://127.0.0.1:5500/FrontEnd/index.html"
    }else {
        alert("Erreur dans l'identifiant ou le mot de passe");
    }
});
