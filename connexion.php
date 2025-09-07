<?php
    $db = new PDO("mysql:host=localhost;dbname=cvpro", "root","");

    
function gRM($length = 8) {
    $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $mat = '';

    for ($i = 0; $i < $length; $i++) {
        $randomIndex = rand(0, strlen($characters) - 1);
        $mat .= $characters[$randomIndex];
    }

    return $mat;
}

$uploadDirectory = "image/";
$photoPath = $uploadDirectory . basename($_FILES["photo"]["name"]);

// Nouveau tableau avec les champs supplémentaires
$tab = [
    gRM(),
    $_POST["filiere"],
    $_POST["niveau"],
    $_POST["nom"],
    $_POST["prenom"],
    $_POST["sexe"],
    $_POST["dat"],
    $_POST["annee"],
    $photoPath,
    $_POST["competences"],   // nouveau champ
    $_POST["experience"],    // nouveau champ
    $_POST["formation"]      // nouveau champ
];

    
    $inser = "INSERT INTO stages(
    mat, filiere, niveau, nom, prenom, sexe, dat, annee, photo, competences, experience, formation
) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)";

    $rid = $db->prepare($inser);
    

    if ($rid->execute($tab) === TRUE) {
        move_uploaded_file($_FILES["photo"]["tmp_name"], $photoPath); // Déplace la photo vers le dossier de stockage
        echo "Enregistrement réussi.";
    }


?>
