<?php
      $db = new PDO("mysql:host=localhost;dbname=etustage","root","");

      $id =(int)$_POST['idser'];
      $filiere = $_POST['filiere'];
      $niveau = $_POST['niveau'];
      $nom = $_POST['nom'];
      $prenom = $_POST['prenom'];
      $sexe = $_POST['sexe'];
      $dateDeNaissance = $_POST['dat'];
      $annee = $_POST['annee'];

      $change = "UPDATE stage SET filiere='$filiere', niveau='$niveau', nom='$nom', prenom='$prenom', sexe='$sexe', dat='$dateDeNaissance', annee='$annee', photo='$photoPath' WHERE id=$idser";
      $req = $db->prepare($change);
      $req->execute(array($filiere, $niveau, $nom, $prenom, $sexe, $dateDeNaissance, $annee, $photoPath));

?>





<?php
    require 'database.php';

    if(!empty($_GET['id'])) 
    {
        $id = checkInput($_GET['id']);
    }
     
    // $db = Database::connect();
    $statement = $db->prepare("SELECT items.id, items.name, items.description, items.price, items.image, categories.name AS category FROM items LEFT JOIN categories ON items.category = categories.id WHERE items.id = ?");
    $statement->execute(array($id));
    $item = $statement->fetch();
    // Database::disconnect();

    function checkInput($data) 
    {
      $data = trim($data);
      $data = stripslashes($data);
      $data = htmlspecialchars($data);
      return $data;
    }

?>

<!DOCTYPE html>
 <html>
    <head>
        <title>Burger Code</title>
        <meta charset="utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/css/bootstrap.min.css">
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js"></script>
        <link href='http://fonts.googleapis.com/css?family=Holtwood+One+SC' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" href="../css/styles.css">
    </head>
    
    <body>
         <div class="container admin">
            <div class="row">
               <div class="col-sm-6">
                    <form>
                      <div class="form-group">
                        <label>Nom:</label><?php echo '  '.$item['name'];?>
                      </div>
                      <div class="form-group">
                        <label>Prix:</label><?php echo '  '.number_format((float)$item['price'], 2, '.', ''). ' €';?>
                      </div>
                    </form>
                    <br>
                    <div class="form-actions">
                      <a class="btn btn-primary" href="../index.php"><span class="glyphicon glyphicon-arrow-left"></span> Retour</a>
                      <a class="btn btn-primary" href="../index.php"><span class="glyphicon glyphicon-arrow-left"></span> RetValider</a>
                    </div>
                </div> 
                <div class="col-sm-6 site">
                    <div class="thumbnail">
                        <img src="<?php echo '../images/'.$item['image'];?>" alt="...">
                        <div class="price"><?php echo number_format((float)$item['price'], 2, '.', ''). ' €';?></div>
                          <div class="caption">
                            <h4><?php echo $item['name'];?></h4>
                            <p><?php echo $item['description'];?></p>
                            <a href="#" class="btn btn-order" role="button"><span class="glyphicon glyphicon-shopping-cart"></span> Commander</a>
                          </div>
                    </div>
                </div>
            </div>
        </div>   
    </body>
</html>

