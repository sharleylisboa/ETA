function publicar() {
  const titulo = document.getElementById('titulo').value.trim();
  const conteudo = document.getElementById('conteudo').value.trim();
  const arquivoInput = document.getElementById('arquivo');
  const arquivo = arquivoInput.files[0];

  if (!titulo && !conteudo && !arquivo) {
    alert("Preencha a notícia ou envie um anexo.");
    return;
  }

  const nova = {
    titulo,
    conteudo,
    data: new Date().toLocaleString(),
    anexo: null,
    anexoTipo: null
  };

  if (arquivo) {
    const reader = new FileReader();
    reader.onload = function (e) {
      nova.anexo = e.target.result;
      nova.anexoTipo = arquivo.type;

      salvarNoticia(nova);
    };
    reader.readAsDataURL(arquivo);
  } else {
    salvarNoticia(nova);
  }
}

function salvarNoticia(nova) {
  const noticias = JSON.parse(localStorage.getItem('noticias') || '[]');
  noticias.push(nova);
  localStorage.setItem('noticias', JSON.stringify(noticias));

  document.getElementById('titulo').value = "";
  document.getElementById('conteudo').value = "";
  document.getElementById('arquivo').value = "";
  listarNoticias();
}

function remover(index) {
  const noticias = JSON.parse(localStorage.getItem('noticias') || '[]');
  noticias.splice(index, 1);
  localStorage.setItem('noticias', JSON.stringify(noticias));
  listarNoticias();
}

function listarNoticias() {
  const container = document.getElementById('noticias-publicadas');
  container.innerHTML = "";
  const noticias = JSON.parse(localStorage.getItem('noticias') || '[]');

  noticias.reverse().forEach((n, i) => {
    const card = document.createElement('div');
    card.className = "card";
    card.innerHTML = `
          <h3>${n.titulo || ''}</h3>
          <p>${n.conteudo || ''}</p>
          ${n.anexo ? renderAnexo(n.anexo, n.anexoTipo) : ''}
          <small>${n.data}</small><br>
          <button onclick="remover(${noticias.length - 1 - i})">Remover</button>
        `;
    container.appendChild(card);
  });
}

function renderAnexo(base64, tipo) {
  if (tipo.startsWith("image/")) {
    return `<img src="${base64}" alt="Imagem" style="max-width: 100%; margin-top: 10px; border-radius: 8px;">`;
  } else if (tipo === "application/pdf") {
    return `<a href="${base64}" target="_blank" style="display:inline-block; margin-top:10px; color:blue;">📎 Ver PDF</a>`;
  } else if (tipo.startsWith("video/")) {
    return `
          <video controls style="max-width: 100%; margin-top: 10px; border-radius: 8px;">
            <source src="${base64}" type="${tipo}">
            Seu navegador não suporta vídeos.
          </video>`;
  }
  return '';
}

listarNoticias();
