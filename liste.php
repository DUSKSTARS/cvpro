<?php
      $db = new PDO("mysql:host=localhost;dbname=etustage","root","");

      
      $insere = "SELECT * FROM stage ORDER BY id DESC";
      $req = $db->prepare($insere);
      $req->execute();
      $num = 1;

      
// function generateRandomMatricule($length = 8) {
//     $characters = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
//     $matricule = '';

//     for ($i = 0; $i < $length; $i++) {
//         $randomIndex = rand(0, strlen($characters) - 1);
//         $matricule .= $characters[$randomIndex];
//     }

//     return $matricule;
// }

// $matricule = generateRandomMatricule();
      
      while($element = $req->fetch()){
        echo"
        

        <tr>
            <td>".$num."</td>
            <td>".$element['mat']."</td>
            <td>".$element['filiere']."</td>
            <td>".$element['niveau']."</td>
            <td>".$element['nom']."</td>
            <td>".$element['prenom']."</td>
            <td>".$element['sexe']."</td>
            <td>".$element['dat']."</td>
            <td>".$element['annee']."</td>
            <td>
              <img src='$element[photo]' class='img-fluid object-fit:cover;' style='width:50px; height:50px;'>
            </td>
            <td>
                <button class='btn btn-success edUser' idUser='".$element['id']."'>Editer<i class='fa fa-pencil ms-2' aria-hidden='true'></i></button>
                <button class='btn btn-danger supUser' idUser='".$element['id']."'>Supprimer<i class='fa fa-trash m-2' aria-hidden='true'></i></button>
            </td>
        </tr>

        ";
        $num++;
      }
?>