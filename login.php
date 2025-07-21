<?php
session_start();
require 'conexao.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $email = $_POST['email'];
  $senha = $_POST['senha'];

  $stmt = $conn->prepare("SELECT id, nome, senha FROM usuarios WHERE email = ?");
  $stmt->bind_param("s", $email);
  $stmt->execute();

  $resultado = $stmt->get_result();
  if ($resultado->num_rows === 1) {
    $usuario = $resultado->fetch_assoc();

    if (password_verify($senha, $usuario['senha'])) {
      $_SESSION['usuario'] = $usuario['nome'];
      echo "Login bem-sucedido! Seja bem-vindo, " . $_SESSION['usuario'];
      // redirecionar para a área protegida:
      // header("Location: painel.php");
    } else {
      echo "Senha incorreta.";
    }
  } else {
    echo "Usuário não encontrado.";
  }

  $stmt->close();
}
?>

<form method="post">
  Email: <input type="email" name="email" required><br>
  Senha: <input type="password" name="senha" required><br>
  <button type="submit">Entrar</button>
</form>