function carregarNoticias() {
  const container = document.getElementById('news-container');
  container.innerHTML = "";
  const noticias = JSON.parse(localStorage.getItem('noticias') || '[]');

  if (noticias.length === 0) {
    container.innerHTML = "<p>Nenhuma notícia publicada ainda.</p>";
    return;
  }

  noticias.reverse().forEach(n => {
    const card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `
          <h3>${n.titulo || ''}</h3>
          <p>${n.conteudo || ''}</p>
          ${n.anexo ? renderAnexo(n.anexo, n.anexoTipo) : ''}
          <small>${n.data}</small>
        `;
    container.appendChild(card);
  });
}

function renderAnexo(base64, tipo) {
  if (tipo.startsWith("image/")) {
    return `<img src="${base64}" alt="Imagem" style="max-width: 100%; margin-top: 10px; border-radius: 8px;">`;
  } else if (tipo === "application/pdf") {
    return `<a href="${base64}" target="_blank" style="display:inline-block; margin-top:10px; color:blue;">📎 Ver PDF</a>`;
  }
  return '';
}

carregarNoticias();