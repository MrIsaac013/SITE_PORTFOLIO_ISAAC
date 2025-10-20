// Configuração inicial quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas as funcionalidades
    initNavigation();
    initThemeToggle();
    initContactForm();
    initSmoothScroll();
});

// Sistema de Navegação Responsiva
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// Adicional Tema Claro/Escuro
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';

    // Aplicar tema salvo
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        themeToggle.textContent = '☀️';
    }

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        
        if (currentTheme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            themeToggle.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            themeToggle.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Scroll Suave
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Sistema de Formulário de Contato
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    const confirmationModal = document.getElementById('confirmation-modal');
    const closeModal = document.querySelector('.close');

    // Função de validação de email
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Função para mostrar erro
    function showError(fieldId, message) {
        const errorElement = document.getElementById(fieldId + '-error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    // Função para limpar erro
    function clearError(fieldId) {
        const errorElement = document.getElementById(fieldId + '-error');
        errorElement.style.display = 'none';
    }

    // Validação em tempo real
    document.getElementById('nome').addEventListener('input', function() {
        clearError('nome');
    });

    document.getElementById('email').addEventListener('input', function() {
        clearError('email');
    });

    document.getElementById('mensagem').addEventListener('input', function() {
        clearError('mensagem');
    });

    // Submissão do formulário
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;

        // Validação do nome
        const nome = document.getElementById('nome').value.trim();
        if (nome === '') {
            showError('nome', 'Por favor, insira seu nome.');
            isValid = false;
        }

        // Validação do email
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            showError('email', 'Por favor, insira seu e-mail.');
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('email', 'Por favor, insira um e-mail válido.');
            isValid = false;
        }

        // Validação da mensagem
        const mensagem = document.getElementById('mensagem').value.trim();
        if (mensagem === '') {
            showError('mensagem', 'Por favor, insira sua mensagem.');
            isValid = false;
        }

        if (isValid) {
            // Simular envio 
            setTimeout(function() {
                // Limpar formulário
                contactForm.reset();
                
                // Mostrar modal de confirmação
                confirmationModal.style.display = 'block';
                
                // Fechar modal após 3 segundos auto
                setTimeout(function() {
                    confirmationModal.style.display = 'none';
                }, 3000);
            }, 1000);
        }
    });

    // Fechar modal
    closeModal.addEventListener('click', function() {
        confirmationModal.style.display = 'none';
    });

    // Fechar modal clicando fora
    window.addEventListener('click', function(e) {
        if (e.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
}

// Efeito de destaque na navegação
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
});