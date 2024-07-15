var selectedRow = null;

// Show Alerts
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Clear All Fields
/*function ClearFields(){
    document.querySelector('#libelle').value = "";
    document.querySelector('#categorie').value = "";
    document.querySelector('#description').value = "";
}*/

// Add Data
document.querySelector("#form").addEventListener("submit", (e) => {
    e.preventDefault();

    // Get Form Values
    const libelle = document.querySelector("#libelle").value;
    const categorie = document.querySelector("#categorie").value;
    const description = document.querySelector("#description").value;

    // Validate
    if (libelle == "" || categorie == "" || description == "") {
        showAlert("Merci de compléter tous les champs", "danger")
    } else {
        if (selectedRow == null) {
            const list = document.querySelector("#idee-list");
            const row = document.createElement("tr");

            row.innerHTML = `
            <td>${libelle}</td>
            <td>${categorie}</td>
            <td>${description}</td>
            <td>
                <a href="#" class="btn btn-success btn-sm approver">Approuver</a>
                <a href="#" class="btn btn-danger btn-sm desapprouver">Déapprouver</a>
                <a href="#" class="btn btn-danger btn-sm delete" onclick="return confirm('Êtes-vous sûr de vouloir supprimer cet idée ?');">
                    <i class="fas fa-trash-alt"></i>
                </a>
            </td>`;
            list.appendChild(row);
            showAlert("Idée ajoutée", "success");

            // Réinitialiser le formulaire après l'ajout
            document.getElementById("form").reset();

            // Sauvegarder dans le localStorage
            saveIdeasToStorage();
        }
    }

});
// Fonction pour sauvegarder les idées dans le localStorage
function saveIdeasToStorage() {
    const rows = document.querySelectorAll("#idee-list tr");
    const ideas = [];
    rows.forEach(row => {
        const libelle = row.cells[0].textContent;
        const categorie = row.cells[1].textContent;
        const description = row.cells[2].textContent;
        const actions = row.cells[3];
        ideas.push({ libelle, categorie, description, actions });
    });
    localStorage.setItem("ideas", JSON.stringify(ideas));
}
// Charger les idées depuis le localStorage au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    afficherIdeesFromStorage();
});

// Fonction pour afficher les idées sauvegardées depuis le localStorage
function afficherIdeesFromStorage() {
    const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
    const list = document.querySelector("#idee-list");
    list.innerHTML = ""; // Efface le contenu actuel du tableau

    ideas.forEach(idea => {
        const row = document.createElement("tr");
        row.innerHTML = `
        <td>${idea.libelle}</td>
        <td>${idea.categorie}</td>
        <td>${idea.description}</td>
        <td>
            <a href="#" class="btn btn-success btn-sm approver">Approuver</a>
            <a href="#" class="btn btn-danger btn-sm desapprouver">Déapprouver</a>
            <a href="#" class="btn btn-danger btn-sm delete" onclick="return confirm('Êtes-vous sûr de vouloir supprimer cet idée ?');">
                <i class="fas fa-trash-alt"></i>
            </a>
        </td>`;
        list.appendChild(row);
    });
}

// Delete Data

document.querySelector("#idee-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("L'idée a été supprimée", "danger");
    }
});

// Modèle d'idée avec une propriété d'état
/*function Idea(libelle, categorie, description, status = 'Pending') {
    this.libelle = libelle;
    this.categorie = categorie;
    this.description = description;
    this.status = status; // Ajout de la propriété d'état
}*/


// Approve Idea
function approveIdea(row) {
    const cells = row.querySelectorAll('td');
    const statusCell = cells[cells.length - 1]; // Dernière cellule pour les actions

    // Vérifier si déjà approuvé
    if (statusCell.textContent.trim() === 'Approuvé') {
        showAlert("L'idée est déjà approuvée", "warning");
    } else {
        statusCell.textContent = 'Approuvé';
        showAlert("L'idée a été approuvée", "success");
        // Mettre à jour l'état dans le localStorage
        updateIdeaStatus(row, 'Approuvé');
    }
}

// Disapprove Idea
function disapproveIdea(row) {
    const cells = row.querySelectorAll('td');
    const statusCell = cells[cells.length - 1]; // Dernière cellule pour les actions

    // Vérifier si déjà désapprouvé
    if (statusCell.textContent.trim() === 'Désapprouvé') {
        showAlert("L'idée est déjà désapprouvée", "warning");
    } else {
        statusCell.textContent = 'Désapprouvé';
        showAlert("L'idée a été désapprouvée", "danger");
        // Mettre à jour l'état dans le localStorage
        updateIdeaStatus(row, 'Désapprouvé');
    }
}

// Fonction pour mettre à jour l'état d'une idée dans le localStorage
function updateIdeaStatus(row, status) {
    const ideas = JSON.parse(localStorage.getItem("ideas")) || [];
    const index = row.rowIndex - 1; // rowIndex commence à 1, mais l'index dans le tableau commence à 0
    ideas[index].status = status;
    localStorage.setItem("ideas", JSON.stringify(ideas));
}

// Écouter les clics sur les boutons d'approuvement et de désapprouvement
document.querySelector("#idee-list").addEventListener("click", (e) => {
    const target = e.target;
    if (target.classList.contains("approver")) {
        const row = target.parentElement.parentElement;
        approveIdea(row);
    } else if (target.classList.contains("desapprouver")) {
        const row = target.parentElement.parentElement;
        disapproveIdea(row);
    }
});
