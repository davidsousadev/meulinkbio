const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;

// ===== MOCK DE DADOS =====
const profiles = {
  davidsousadev: {
    name: "David Sousa",
    nickname: "davidsousadev",
    photo: "https://avatars.githubusercontent.com/u/72691307?v=4",
    links: [
      { title: "GitHub", url: "https://cutme.vercel.app/github", icon: "bxl-github" },
      { title: "LinkedIn", url: "https://cutme.vercel.app/linkedin", icon: "bxl-linkedin" },
      { title: "Portfólio", url: "https://cutme.vercel.app/portfolio", icon: "bxs-briefcase" },
      { title: "TikTok", url: "https://cutme.vercel.app/tiktok", icon: "bxl-tiktok" },
      { title: "Instagram", url: "https://cutme.vercel.app/instagram", icon: "bxl-instagram" },
      { title: "Facebook", url: "https://cutme.vercel.app/facebook", icon: "bxl-facebook" },
      { title: "X", url: "https://cutme.vercel.app/x", icon: "bxl-twitter" },
      { title: "Snapchat", url: "https://cutme.vercel.app/snapchat", icon: "bxl-snapchat" },
      { title: "YouTube", url: "https://cutme.vercel.app/youtube", icon: "bxl-youtube" },
      { title: "Twitch", url: "https://cutme.vercel.app/twitch", icon: "bxl-twitch" }
    ]
  }
};

// ===== CONFIGURAÇÃO DO EXPRESS =====
app.use(express.static(path.join(__dirname, "../public")));

// ===== RODAPÉ =====
const footerHtml = () => {
  const year = new Date().getFullYear();
  return `<footer class="footer">
            &copy; ${year} - Desenvolvido por <a href="https://cutme.vercel.app/github" target="_blank">David Sousa</a>
          </footer>`;
};

// ===== FUNÇÃO DE SCRIPT DO MODO ESCURO =====
const themeScript = `
  <script>
    const btn = document.getElementById('theme-toggle');
    const body = document.body;

    // Verifica o tema salvo
    if (localStorage.getItem('theme') === 'light') {
      body.classList.add('light-mode');
      btn.innerHTML = "<i class='bx bxs-sun'></i>";
    }

    btn.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
      btn.innerHTML = isLight ? "<i class='bx bxs-sun'></i>" : "<i class='bx bxs-moon'></i>";
    });
  </script>
`;

// ===== ROTA PRINCIPAL =====
app.get("/:nickname", (req, res) => {
  const { nickname } = req.params;
  const profile = profiles[nickname];

  // ===== Página 404 =====
  if (!profile) {
    const html404 = `
      <!DOCTYPE html>
      <html lang="pt-BR">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Página não encontrada</title>
        <link rel="stylesheet" href="/style.css">
        <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
      </head>
      <body>
        <button id="theme-toggle" class="theme-toggle"><i class='bx bxs-moon'></i></button>
        <div class="container not-found">
          <h1>404</h1>
          <h2>Página não encontrada</h2>
          <p>Ops! O perfil que você está procurando não existe.</p>
        </div>
        ${footerHtml()}
        ${themeScript}
      </body>
      </html>
    `;
    return res.status(404).send(html404);
  }

  // ===== Página de Perfil =====
  const linksHtml = profile.links.map(
    link => `<a href="${link.url}" target="_blank" class="link">
               <i class='bx ${link.icon}'></i> <span>${link.title}</span>
             </a>`
  ).join("");

  const html = `
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${profile.name} | ${profile.nickname}</title>
      <link rel="stylesheet" href="/style.css">
      <link href='https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css' rel='stylesheet'>
    </head>
    <body>
      <button id="theme-toggle" class="theme-toggle"><i class='bx bxs-moon'></i></button>
      <div class="container">
        <div class="profile-photo">
          <img src="${profile.photo}" alt="${profile.name}">
        </div>
        <h1>${profile.name}</h1>
        <h2>@${profile.nickname}</h2>
        <div class="links">
          ${linksHtml}
        </div>
      </div>
      ${footerHtml()}
      ${themeScript}
    </body>
    </html>
  `;

  res.send(html);
});

// ===== INICIALIZA SERVIDOR =====
app.listen(PORT, () => console.log(`🚀 Servidor rodando em http://localhost:${PORT}`));
