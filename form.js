const form = document.getElementById('form');
const libelle = document.getElementById('libelle');
const categorie = document.getElementById('categorie');
const description = document.getElementById('description');
const ideeList = document.getElementById('ideeList');

form.addEventListener('submit', e => {
    e.preventDefault();
    validateInputs();
});

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
};

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidLibelle = (value) => {
    return value.length >= 10 && value.length <= 40;
}

const isValidDescription = (value) => {
    return value.length >= 10 && value.length <= 255;
}

const validateInputs = () => {
    const libelleValue = libelle.value.trim();
    const categorieValue = categorie.value.trim();
    const descriptionValue = description.value.trim();

    let isFormValid = true;

    // Libelle
    if (libelleValue === '') {
        isFormValid = false;
    } else if (!isValidLibelle(libelleValue)) {
        isFormValid = false;
    } else {
        isFormValid;
    }

    // Catégorie
    if (categorieValue === '') {
        isFormValid = false;
    } else {
        isFormValid;

    }

    // Description
    if (descriptionValue === '') {
        isFormValid = false;
    } else if (!isValidDescription(descriptionValue)){
        isFormValid = false;
    } else {
        isFormValid;

    }

    if (isFormValid) {
        // Ajouter l'idée
        addIdea(libelleValue, categorieValue, descriptionValue);

        // Masquer le formulaire d'ajout
        document.getElementById('form').style.display = 'none';

         // Masquer le message d'erreur
         document.getElementById('messageErreur').style.display = 'none';

        // Afficher le message de succès
        document.getElementById('messageSucces').style.display = 'block';

        // Masquer le message de succès après 2 secondes et réafficher le formulaire
        setTimeout(function() {
        document.getElementById('messageSucces').style.display = 'none';
        document.getElementById('form').style.display = 'block';
        document.getElementById('form').reset();  // Réinitialiser le formulaire
        }, 2000);
    } else{
        // Masquer le formulaire d'ajout
        document.getElementById('form').style.display = 'none';

        // Masquer le message de succès
        document.getElementById('messageSucces').style.display = 'none';

        // Afficher le message d'erreur
        document.getElementById('messageErreur').style.display = 'block';

         // Masquer le message d'erreur après 2 secondes et réafficher le formulaire
        setTimeout(function() {
        document.getElementById('messageErreur').style.display = 'none';
        document.getElementById('form').style.display = 'block';
        document.getElementById('form').reset();  // Réinitialiser le formulaire
        }, 2000);

    }
};

const addIdea = (libelle, categorie, description) => {
    const row = document.createElement('tr');

    row.innerHTML = `
        <td>${libelle}</td>
        <td>${categorie}</td>
        <td>${description}</td>
        <td>
            <a href="#" class="btn btn-success btn-sm approver">Approuver</a>
            <a href="#" class="btn btn-danger btn-sm desapprouver">Désapprouver</a>
            <a href="#" class="btn btn-danger btn-sm delete" onclick="return confirm('Êtes-vous sûr de vouloir supprimer cette idée ?');">
                <i class="fas fa-trash-alt"></i>
            </a>
        </td>`;
        // dans tableau ou y ajoute une nouvelle ligne (<tr>, contenu dans la variable row) à la fin de ce corps de table.
    document.getElementById('ideeList').querySelector('tbody').appendChild(row);
    // Ajouter des événements aux nouveaux boutons
    row.querySelector('.approver').addEventListener('click', () => {
    const cells = row.querySelectorAll('td');
    const Cell = cells[cells.length - 1]; // Dernière cellule pour les actions
    Cell.textContent = 'Approuvée';
    });
    row.querySelector('.desapprouver').addEventListener('click', () => {
        const cells = row.querySelectorAll('td');
        const Cell = cells[cells.length - 1]; // Dernière cellule pour les actions
        Cell.textContent = 'Désapprouvée';
    });
    row.querySelector('.delete').addEventListener('click', () => {
        row.remove();
        deleteIdea(libelle);
    });
};





