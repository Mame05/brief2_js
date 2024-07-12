
const form = document.getElementById('form');
const libelle = document.getElementById('libelle');
const categorie = document.getElementById('categorie');
const description = document.getElementById('description');

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

// Contrainte de validation pour le libellé
const isValidLibelle = libelle =>{
    const re = /^.{10,40}$/
    return re.test(String(libelle).toLocaleLowerCase());
}

// Contrainte de validation pour la description
const isValidDescription = description =>{
    const re = /^.{10,255}$/
    return re.test(String(description).toLocaleLowerCase());
}
const validateInputs = () => {
        const libelleValue = libelle.value.trim();
        const descriptionValue = description.value.trim();
        const categorieValue = categorie.value.trim();


        // Libellé
        if(libelleValue === ''){
            setError(libelle, 'Le champ ne doit pas être vide');
        } else if (!isValidLibelle(libelleValue )){
            setError(libelle, "Le libelle de l'idée doit contenir entre 10 et 40 caractères")
        }else {
            setSuccess(libelle);
        }

        // Description
        if(descriptionValue === ''){
            setError(description, 'Le champ ne doit pas être vide');
        }  else if (!isValidDescription(descriptionValue)){
            setError(description, 'La description doit contenir entre 10 et 255 caractères')
        }else {
            setSuccess(description);
        }

        // Catégoire
        if(categorieValue === ''){
            setError(categorie, 'Le champ ne doit pas être vide');
        } else {
            setSuccess(categorie);
        }

        // Vérifier si tous les champs sont valides pour afficher un message de succès
        if (isValidLibelle(libelleValue) && isValidDescription(descriptionValue) && (categorieValue)) {
        // Masquer le formulaire
        document.getElementById('container').style.display = 'none';
        // Afficher le message de succès
        document.getElementById('messageSucces').style.display = 'block';
        } else {
            // Afficher un message d'erreur générique si un champ est invalide
            document.getElementById("messageErreur").style.display = "block";
            // Cacher le message de succès s'il est affiché
            document.getElementById("messageSucces").style.display = "none";
            // Masquer le formulaire
        document.getElementById('container').style.display = 'none';
        }
};
