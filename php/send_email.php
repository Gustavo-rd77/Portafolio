<?php
if(isset($_POST)){
    $error = '';
    $name = isset($_POST["name"])? trim($_POST["name"]) : false;
    $email = isset($_POST["email"]) ? $_POST["email"]: false;
    $text = isset($_POST["text"]) ? trim($_POST["text"]): false;
    if($name && $text && $email){
        if(preg_match('/[a-zA-ZÀ-ÿ\s]/',$name)){
            if(filter_var($email,FILTER_VALIDATE_EMAIL)){
                if(strlen($text) != 0){
                    //mensaje a enviar
                    $message = $name."<br>".$email."<br>"."Mensaje: <br>".$text;
                    // envio de email
                    require_once 'email.php';
                }else{
                    echo "<i class='material-icons warning-color'>error_outline</i><span class='error-contact'>Mensage requerido</span>";
                }
            }else{
               echo "<i class='material-icons warning-color'>error_outline</i><span class='error-contact'>Email invalido</span>";
            }
        }else{
            echo "<i class='material-icons warning-color'>error_outline</i><span class='error-contact'>Nombre invalido</span>";
        }

    }else{
        echo "<span class='error-contact'>Completar campos</span>";
        
    }
}
?>

            