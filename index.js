$(document).ready(function () {

    // Aperçu de la photo en direct
    $("#photo").change(function(){
        let file = this.files[0];
        if(file){
            let reader = new FileReader();
            reader.onload = function(e){
                $("#img").attr("src", e.target.result); // aperçu dans le formulaire
            }
            reader.readAsDataURL(file);
        } else {
            $("#img").attr("src", "benin.png");
        }
    });

    // Remplir le CV et envoyer en base
    $("#valider").on("click", function () {

        // 1️⃣ Remplir le CV
        $("#cv-nom").text($("#nom").val());
        $("#cv-prenom").text($("#prenom").val());
        $("#cv-sexe").text($("#sexe").val() == "1" ? "Masculin" : "Féminin");
        $("#cv-dat").text($("#dat").val());
        $("#cv-filiere").text($("#filiere option:selected").text());
        $("#cv-niveau").text($("#niveau option:selected").text());
        $("#cv-annee").text($("#annee option:selected").text());
        $("#cv-competences").html($("#competences").val().replace(/\n/g, "<br>"));
        $("#cv-experience").html($("#experience").val().replace(/\n/g, "<br>"));
        $("#cv-formation").html($("#formation").val().replace(/\n/g, "<br>"));

        let file = $("#photo")[0].files[0];
        if(file){
            let reader = new FileReader();
            reader.onload = function(e){
                $("#cv-photo").attr("src", e.target.result);
            }
            reader.readAsDataURL(file);
        }

        $("#cv").show();

        // 2️⃣ Envoi en base (optionnel)
        let formData = new FormData();
        formData.append('nom', $("#nom").val());
        formData.append('prenom', $("#prenom").val());
        formData.append('sexe', $("#sexe").val());
        formData.append('dat', $("#dat").val());
        formData.append('filiere', $("#filiere").val());
        formData.append('niveau', $("#niveau").val());
        formData.append('annee', $("#annee").val());
        formData.append('photo', file);
        formData.append('competences', $("#competences").val());
        formData.append('experience', $("#experience").val());
        formData.append('formation', $("#formation").val());

        $.ajax({
            type: "POST",
            url: "connexion.php",
            data: formData,
            contentType: false,
            processData: false,
            success: function(response){
                alert("Enregistrement réussi !");
            },
            error: function(){
                alert("Erreur lors de l'enregistrement !");
            }
        });

        // 3️⃣ Génération PDF multi-page
        $("#downloadCV").off("click").on("click", function(){
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4'); // Portrait, mm, A4
            let y = 10; // position verticale initiale

            // Photo
            let img = $("#cv-photo")[0];
            if(img.src){
                doc.addImage(img, 'PNG', 80, y, 50, 50);
                y += 60;
            }

            // Nom et prénom
            doc.setFontSize(16);
            doc.text("Nom: " + $("#cv-nom").text(), 20, y);
            y += 10;
            doc.text("Prénom: " + $("#cv-prenom").text(), 20, y);
            y += 10;

            // Infos personnelles
            doc.setFontSize(12);
            const infos = [
                "Sexe: " + $("#cv-sexe").text(),
                "Date de naissance: " + $("#cv-dat").text(),
                "Filière: " + $("#cv-filiere").text(),
                "Niveau: " + $("#cv-niveau").text(),
                "Année: " + $("#cv-annee").text()
            ];
            infos.forEach(info => {
                doc.text(info, 20, y);
                y += 10;
            });

            // Fonction pour ajouter des paragraphes multi-lignes
            function ajouterParagraphe(titre, texte){
                y += 5;
                doc.setFontSize(14);
                doc.text(titre, 20, y);
                y += 7;
                doc.setFontSize(12);
                let lignes = doc.splitTextToSize(texte, 170); // largeur max 170mm

                lignes.forEach(line => {
                    if(y > 280){ // passage à la page suivante si fin de page
                        doc.addPage();
                        y = 10;
                    }
                    doc.text(line, 20, y);
                    y += 7;
                });
            }

            ajouterParagraphe("Compétences", $("#cv-competences").text());
            ajouterParagraphe("Expérience", $("#cv-experience").text());
            ajouterParagraphe("Formation", $("#cv-formation").text());

            doc.save("CV_" + $("#cv-nom").text() + "_" + $("#cv-prenom").text() + ".pdf");
        });

    });
});
