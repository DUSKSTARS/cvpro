<?php
 $id =(int)$_POST['idUser'];
 $db = new PDO("mysql:host=localhost;dbname=etustage","root","");
 $supprime = "DELETE FROM stage WHERE id=:id";
 $req = $db->prepare($supprime);
 $req->bindValue(':id',$id);
 $req->execute();
?>