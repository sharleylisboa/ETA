<?php
session_start();
if (!isset($_SESSION['usuario'])) {
  header("Location: login.php");
  exit;
}
?>

<h1>Olá, <?php echo $_SESSION['usuario']; ?>! Você está logado.</h1>
<a href="logout.php">Sair</a>