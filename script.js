// SCRIPT para fixar o reload no topo da página
window.onload = function () {
  window.scrollTo(0, 0);
};

//SCRIPT para remover a hash e query string da URL
document.addEventListener('DOMContentLoaded', function () {
  if (window.location.hash || window.location.search) {
    const newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname;
    window.history.replaceState({}, document.title, newUrl);
  }
});

//SCRIPTS exibir aniamação do menu de navegação apanas na primeira vez
document.addEventListener('DOMContentLoaded', function () {
  const navButton = document.querySelector('.nav-btn');
  const nav = document.querySelector('.nav');
  const accessed = localStorage.getItem('accessed');

  if (!accessed) {
    // Adicionar um evento para esconder a animação após um tempo ou interação
    setTimeout(() => {
      navButton.setAttribute('aria-expanded', 'false');
      nav.classList.add('nav__hidden');
      localStorage.setItem('accessed', 'true');
    }, 7000);
  } else {
    navButton.setAttribute('aria-expanded', 'false');
    nav.classList.add('nav__hidden');
  }
});

// SCRIPTS para alterar o tema dark e light
const toggleTheme = document.getElementById('toggle-theme');
const html = document.querySelector('html');
const favoriteThemeDark =
  window.matchMedia('(prefers-color-scheme: dark)').matches === true;

// Verifica se o tema preferido é escuro e aplica o tema correspondente
if (favoriteThemeDark) {
  html.dataset.theme = 'dark';
  toggleTheme.textContent = 'DARK';
} else {
  html.dataset.theme = 'light';
  toggleTheme.textContent = 'LIGHT';
}

// Botão para alternar entre os temas
toggleTheme.addEventListener('click', () => {
  if (html.dataset.theme === 'dark') {
    html.dataset.theme = 'light';
    toggleTheme.textContent = 'LIGHT';
  } else {
    html.dataset.theme = 'dark';
    toggleTheme.textContent = 'DARK';
  }
});

// CORRIGIR --------------
// SCRIPTS para o menu de navegação
const navButton = document.querySelector('.nav-btn');
const navLink = document.querySelectorAll('.nav-link');
const nav = document.querySelector('.nav');

setTimeout(() => {
  navButton.setAttribute('aria-expanded', 'false');
  nav.classList.add('nav__hidden');
}, 4000);

// Botão para abrir e fechar o menu de navegação
navButton.addEventListener('click', () => {
  const isNavHidden = nav.classList.contains('nav__hidden');
  if (isNavHidden) {
    nav.classList.remove('nav__hidden');
    navButton.setAttribute('aria-expanded', 'false');
  } else {
    nav.classList.add('nav__hidden');
    navButton.setAttribute('aria-expanded', 'true');
  }
});

// Esconde o menu quando um link é clicado
navLink.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.add('nav__hidden');
    navButton.setAttribute('aria-expanded', 'false');
  });
});

//SCRIPT para enviar formulário para o WhatsApp
// Elementos do formulário
const elements = {
  name: document.getElementById('name'),
  email: document.getElementById('email'),
  phone: document.getElementById('phone'),
  message: document.getElementById('message'),
  btnSubmit: document.getElementById('btnSubmit'),
  // btnWhatsApp: document.getElementById('btnWhatsApp'),
  modal: document.getElementById('confirmationModal'),
  confirmSend: document.getElementById('confirmSend'),
  cancelSend: document.getElementById('cancelSend'),
};

function validate() {
  // Regex otimizados
  const emailRegex = /^[a-z0-9._%+-]+@[a-z0-9]+\.[a-z]{2,}$/;
  const phoneRegex = /\(\d{2}\) \d \d{4}-\d{4}/;

  return (
    elements.name.value.length >= 3 &&
    emailRegex.test(elements.email.value) &&
    phoneRegex.test(elements.phone.value) &&
    elements.message.value.length >= 10
  );
}

function generateWhatsAppLink() {
  const { name, email, phone, message } = elements;
  const text =
    `Olá! Me chamo ${name.value}\n` +
    `Mensagem: ${message.value}\n\n` +
    `Contato: ${phone.value} | ${email.value}`;

  return `https://wa.me/5511952193890?text=${encodeURIComponent(text)}`;
}

function toggleModal(show) {
  elements.modal.style.display = show ? 'flex' : 'none';
}

elements.btnSubmit.addEventListener('click', () => {
  if (!validate()) {
    alert('Preencha todos os campos corretamente!');
    return;
  }

  // Atualiza o link do WhatsApp (sem abrir ainda)
  whatsappHrefForm = generateWhatsAppLink();
  toggleModal(true);
});

// Confirmar: Abre WhatsApp
elements.confirmSend.addEventListener('click', () => {
  toggleModal(false);
  window.open(whatsappHrefForm, '_blank');
});

// Cancelar: Fecha modal
elements.cancelSend.addEventListener('click', () => toggleModal(false));

// Máscara para telefone
const phoneInput = document.getElementById('phone');
let lastValidValue = '';

phoneInput.addEventListener('input', function (e) {
  // Remove caracteres não numéricos
  let value = e.target.value.replace(/\D/g, '');

  console.log(value);
  // Limita a 11 dígitos (DDD + 9 números)
  value = value.substring(0, 11);

  // Formatação condicional
  let formattedValue = value;
  if (value.length > 0) formattedValue = `(${value.substring(0, 2)}`;
  if (value.length > 2) formattedValue += `) ${value.substring(2, 3)}`;
  if (value.length > 3) formattedValue += ` ${value.substring(3, 7)}`;
  if (value.length > 7) formattedValue += `-${value.substring(7)}`;

  // Só atualiza se mudou (evita loop)
  if (formattedValue !== lastValidValue) {
    e.target.value = formattedValue;
    lastValidValue = formattedValue;
  }
});

document.getElementById('phone').addEventListener('keydown', function (e) {
  // Permite apenas: Backspace, Tab, setas e números
  if (!/[0-9]|Backspace|Tab|ArrowLeft|ArrowRight/.test(e.key)) {
    e.preventDefault();
  }
});
