    const auth = firebase.auth();
    const db = firebase.firestore(); // requer firestore ativado

    auth.onAuthStateChanged(user => {
      if (!user) {
        window.location.href = "login.html";
      } else {
        // Avatar do usuário
        const name = user.displayName || "Usuário";
        const email = user.email;
        const photo = user.photoURL || "https://www.gravatar.com/avatar/?d=mp";

        document.getElementById("user-info").innerHTML = `
          <img src="${photo}" style="width:40px; border-radius:50%; vertical-align:middle; margin-right:10px;">
          <strong>${name}</strong> <br><small>${email}</small>
        `;

        carregarNoticias();
      }
    });

    function logout() {
      auth.signOut().then(() => window.location.href = "login.html");
    }

    function carregarNoticias() {
      const container = document.getElementById("noticias");
      db.collection("noticias").orderBy("data", "desc").get()
        .then(snapshot => {
          if (snapshot.empty) {
            container.innerHTML = "<p>Nenhuma notícia publicada.</p>";
            return;
          }
          container.innerHTML = "";
          snapshot.forEach(doc => {
            const noticia = doc.data();
            const dataFormatada = new Date(noticia.data.toDate()).toLocaleString("pt-BR");
            container.innerHTML += `
              <div style="margin:10px; padding:10px; border:1px solid #ccc;">
                <h3>${noticia.titulo}</h3>
                <p>${noticia.conteudo}</p>
                <small><i>Publicado em ${dataFormatada}</i></small>
              </div>
            `;
          });
        });
    }

function publicar() {
  const titulo = document.getElementById("titulo").value;
  const conteudo = document.getElementById("conteudo").value;

  if (titulo && conteudo) {
    db.collection("noticias").add({
      titulo,
      conteudo,
      data: new Date()
    }).then(() => {
      alert("Notícia publicada!");
      carregarNoticias();
    });
  } else {
    alert("Preencha todos os campos.");
  }
}
