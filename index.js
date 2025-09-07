$(document).ready(function () {
    // Cette fonction s'exécute lorsque le document HTML est complètement chargé

    // Définit les valeurs par défaut pour certains champs du formulaire
    $("#filiere").val("1");
    $("#niveau").val("1");
    $("#nom").val("toto");
    $("#prenom").val("tata");
    $("#sexe").val("1");
    $("#dat").val("2023-07-31");
    $("#annee").val("1");

    // Cette fonction liste les éléments existants depuis un script PHP appelé "liste.php"
    let listeElement = function(){
        $.ajax({
            type: "POST",
            url: "liste.php",
            success: function (response) {
                $("tbody").html(response); // Met à jour le contenu du tableau HTML avec la réponse du serveur
            },
            error: function (response) {
                alert("mal"); // Affiche une alerte en cas d'erreur
            }
        });
    }
    listeElement(); // Appelle la fonction pour charger la liste initiale des éléments

    // Cette partie du code gère la modification en temps réel des informations du formulaire
    $(".info").on("input", function () {
        let valeurSaisie = $(this).val(); // Récupère la valeur saisie
        let nameElement = $(this).attr("id"); // Récupère l'ID de l'élément
        $("."+nameElement).text(valeurSaisie); // Met à jour l'affichage en temps réel
    });

    // Cette partie du code gère l'affichage de l'image sélectionnée dans un champ de type "file"
    $("#photo").change(function(){
        var input = this;
        var reader = new FileReader();
        reader.onload = function(e){
            $("#img").attr("src", e.target.result); // Affiche l'image sélectionnée
        };
        reader.readAsDataURL(input.files[0]);
    });

    // Cette partie du code gère la suppression d'un élément de la base de données
    $(document).on("click",".supUser", function () {
        let idUser = $(this).attr("idUser");
        if(confirm("je vais supprimer cette ligne, c'est aussi ton intention ?")){
            $.ajax({
                type: "POST",
                url: "supprimer.php",
                data: {
                    idUser : idUser,
                },
                success: function (response) {
                    listeElement(); // Met à jour la liste après la suppression
                }
            });
        }
    });

    // Cette partie du code gère la modification d'un élément de la base de données
    $(document).on("click",".edUser", function () {
        let idser = $(this).attr("idser");
        if(confirm("je vais modifier cette ligne")){
            $.ajax({
                type: "POST",
                url: "modifier.php",
                data: {
                    idser : idser,
                },
                success: function (response) {
                    listeElement(); // Met à jour la liste après la modification
                }
            });
        }
    });

    // Cette partie du code gère la soumission du formulaire pour ajouter de nouveaux éléments
    $("#valider").on("click", function () {
        // Change le texte du bouton "Valider" pendant la soumission
        $(this).html('Patientez svp ... <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>').attr("disabled", "");
        $(".error").html(""); // Efface les messages d'erreur précédents

        let msgText;
        // Vérifie que les champs obligatoires ne sont pas vides
        $(".info").each(function () {
            let valeur = $(this).val();
            if(!valeur){
                let titre = $(this).prev().text();
                if(!msgText){
                    msgText = "Veuillez saisir votre <b>"+titre;
                } else {
                    msgText = msgText + ", "+titre;
                }
            }
        });
        
        if(msgText){
            // Affiche un message d'erreur si des champs sont vides
            msgText = msgText + "</b> svp.";
            let msgHtml = '<div style="display: none;" class="alert alert-danger alert-dismissible fade show mt-2 mb-0" role="alert">'+msgText+'<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button></div>';
            $(".error").append(msgHtml);
            $(".alert").show("slow");                               
        } else {
            // Si tous les champs sont remplis, envoie les données du formulaire au script "connexion.php"
            let formData = new FormData();
            formData.append('nom', $("#nom").val());
            formData.append('prenom', $("#prenom").val());
            formData.append('sexe', $("#sexe").val());
            formData.append('dat', $("#dat").val());
            formData.append('filiere', $("#filiere").val());
            formData.append('niveau', $("#niveau").val());
            formData.append('annee', $("#annee").val());
            formData.append('photo', $("#photo")[0].files[0]);
           
            $.ajax({
                type: "POST",
                url: "connexion.php",
                data: formData,
                contentType: false,
                processData: false,
                success: function (response) {
                    listeElement(); // Met à jour la liste après l'ajout
                    alert("Enregistrement réussi !");
                },
                error: function (response) {
                    alert(" Erreur d'enregistrement !");
                }
            });
        }

        // Rétablit le texte du bouton "Valider" après la soumission
        $(this).html('Valider <i class="fas fa-check-double ms-2"></i>').removeAttr("disabled");
    });
});
