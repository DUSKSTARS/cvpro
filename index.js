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

            // format carre de l'image
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

            // ... ton code actuel jusqu'à la génération des paragraphes

            ajouterParagraphe("Compétences", $("#cv-competences").text());
            ajouterParagraphe("Expérience", $("#cv-experience").text());
            ajouterParagraphe("Formation", $("#cv-formation").text());

            // Ajouter la certification et la date en bas à droite
            let pageHeight = doc.internal.pageSize.getHeight();
            let pageWidth = doc.internal.pageSize.getWidth();
            let margeDroite = 20;

            // Texte à ajouter
            let texteCertif = "Je certifie exactes les informations ci-dessus";
            let texteDate = "Ce CV est complété le " + new Date().toLocaleDateString();

            // Position verticale : un peu au-dessus du bas
            let yPosition = pageHeight - 20;

            // Ajouter le texte à droite
            doc.setFontSize(12);
            doc.text(texteCertif, pageWidth - margeDroite, yPosition, { align: "right" });
            doc.text(texteDate, pageWidth - margeDroite, yPosition + 7, { align: "right" });

            doc.save("CV_" + $("#cv-nom").text() + "_" + $("#cv-prenom").text() + ".pdf");

        });

    });
});
