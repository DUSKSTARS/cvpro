$(document).ready(function () {
    // Aperçu en direct de la photo dans le formulaire
$("#photo").change(function(){
    let file = this.files[0]; // récupère le fichier sélectionné
    if(file){
        let reader = new FileReader();
        reader.onload = function(e){
            $("#img").attr("src", e.target.result); // met à jour l'image du formulaire
        }
        reader.readAsDataURL(file);
    } else {
        $("#img").attr("src", "benin.png"); // image par défaut si aucun fichier
    }
});


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

        // 2️⃣ Envoi en base
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

        

        // 3️⃣ Génération PDF
        $("#downloadCV").off("click").on("click", function(){
            html2pdf().from(document.getElementById("cv")).set({
                margin:1,
                filename:'CV_'+$("#nom").val()+'_'+$("#prenom").val()+'.pdf',
                html2canvas:{scale:2},
                jsPDF:{orientation:'portrait', unit:'in', format:'a4'}
            }).save();
        });

    });

});
