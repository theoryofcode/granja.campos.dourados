
// ========================================
// GRANJA CAMPOS DOURADOS
// JAVASCRIPT PRINCIPAL
// ========================================


// CONFIGURAÇÕES

const WHATSAPP = "5515996149019";

const EMAIL =
  "contato.granjacamposdourados@gmail.com";

const INSTAGRAM =
  "https://www.instagram.com/granja.camposdourados/";

const VALID_TABS = [
  "inicio",
  "produtos",
  "galeria",
  "faq"
];


// ========================================
// WHATSAPP
// ========================================

function whatsapp(tipo) {

  const mensagens = {

    varejo:
      "Olá! Conheci a Granja Campos Dourados pelo site. Gostaria de informações sobre os ovos para consumo residencial.",

    atacado:
      "Olá! Tenho interesse em comprar ovos para meu estabelecimento. Gostaria de conhecer as condições de fornecimento para atacado.",

    geral:
      "Olá! Conheci o site da Granja Campos Dourados e gostaria de mais informações sobre os produtos."

  };

  const mensagem =
    mensagens[tipo] || mensagens.geral;

  const texto = encodeURIComponent(mensagem);

  const url =
    `https://wa.me/${WHATSAPP}?text=${texto}`;

  window.open(
    url,
    "_blank",
    "noopener,noreferrer"
  );

}


// ========================================
// NAVEGAÇÃO ENTRE ABAS
// ========================================

function showTab(tabName, updateHistory = true) {

  if (!VALID_TABS.includes(tabName)) {
    return;
  }

  // Esconder todos os painéis

  document.querySelectorAll(".tab-panel").forEach(panel => {

    panel.classList.remove("active");

  });


  // Atualizar botões de navegação

  document.querySelectorAll(".nav-tab").forEach(button => {

    button.classList.toggle(
      "active",
      button.dataset.tab === tabName
    );

  });


  // Mostrar aba selecionada

  const selectedPanel =
    document.getElementById("tab-" + tabName);

  if (!selectedPanel) {
    return;
  }

  selectedPanel.classList.add("active");


  // Atualizar endereço sem recarregar

  if (updateHistory) {

    history.pushState(
      { tab: tabName },
      "",
      "#" + tabName
    );

  }


  // Voltar ao início da página

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  // Fechar menu mobile

  closeMobileMenu();

}


// ========================================
// MENU MOBILE
// ========================================

const mobileMenu =
  document.getElementById("mobile-menu");

const menuButton =
  document.getElementById("menu-button");


function toggleMobileMenu() {

  const isOpen =
    mobileMenu.classList.toggle("open");

  mobileMenu.classList.toggle(
    "closed",
    !isOpen
  );

  menuButton.setAttribute(
    "aria-expanded",
    String(isOpen)
  );

  menuButton.innerHTML = isOpen
    ? '<i data-lucide="x" class="w-7 h-7"></i>'
    : '<i data-lucide="menu" class="w-7 h-7"></i>';

  lucide.createIcons();

}


function closeMobileMenu() {

  mobileMenu.classList.remove("open");

  mobileMenu.classList.add("closed");

  menuButton.setAttribute(
    "aria-expanded",
    "false"
  );

  menuButton.innerHTML =
    '<i data-lucide="menu" class="w-7 h-7"></i>';

  lucide.createIcons();

}


function mobileNavigate(tab) {

  showTab(tab);

}


// ========================================
// FAQ - ACCORDION
// ========================================

function toggleFAQ(button) {

  const currentItem =
    button.closest(".faq-item");

  const wasOpen =
    currentItem.classList.contains("open");


  // Fechar os demais itens

  document.querySelectorAll(".faq-item").forEach(item => {

    item.classList.remove("open");

    item.querySelector("button").setAttribute(
      "aria-expanded",
      "false"
    );

    const answer =
      item.querySelector(".faq-answer");

    answer.style.maxHeight = null;

  });


  // Abrir item selecionado

  if (!wasOpen) {

    currentItem.classList.add("open");

    button.setAttribute(
      "aria-expanded",
      "true"
    );

    const answer =
      currentItem.querySelector(".faq-answer");

    answer.style.maxHeight =
      answer.scrollHeight + "px";

  }

}


// ========================================
// HISTÓRICO DO NAVEGADOR
// ========================================

window.addEventListener("popstate", () => {

  const tab =
    window.location.hash.replace("#", "");

  if (VALID_TABS.includes(tab)) {

    showTab(tab, false);

  } else {

    showTab("inicio", false);

  }

});


// ========================================
// ANO AUTOMÁTICO
// ========================================

function updateYear() {

  const yearElement =
    document.getElementById("year");

  if (yearElement) {

    yearElement.textContent =
      new Date().getFullYear();

  }

}


// ========================================
// FECHAR MENU CLICANDO FORA
// ========================================

document.addEventListener("click", event => {

  if (
    mobileMenu.classList.contains("open") &&
    !mobileMenu.contains(event.target) &&
    !menuButton.contains(event.target)
  ) {

    closeMobileMenu();

  }

});


// ========================================
// TECLA ESC FECHA MENU
// ========================================

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeMobileMenu();

  }

});


// ========================================
// INICIALIZAÇÃO
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  // Inicializar ícones

  if (window.lucide) {
    lucide.createIcons();
  }

  // Atualizar ano

  updateYear();

  // Abrir aba indicada na URL

  const initialTab =
    window.location.hash.replace("#", "");

  if (VALID_TABS.includes(initialTab)) {

    showTab(initialTab, false);

  } else {

    showTab("inicio", false);

  }

});
