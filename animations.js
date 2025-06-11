// Função para navegação suave
function initSmoothScroll() {
    // Detectar se é mobile
    const isMobile = window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    // Configuração específica para mobile
    if (isMobile) {
        // Garantir que o scroll funcione em mobile
        document.body.style.webkitOverflowScrolling = 'touch';
        document.body.style.overflowY = 'auto';
    }
    
    // Selecionar todos os links que apontam para âncoras
    const smoothScrollLinks = document.querySelectorAll('a[href*="#"]');
    
    smoothScrollLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Verificar se é um link interno (mesma página) ou externo (outra página)
            if (href.startsWith('#')) {
                // Link interno - mesma página
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                // Ajustar offset para mobile
                const offset = isMobile ? 80 : 100;
                
                if (targetElement) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || offset;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: isMobile ? 'auto' : 'smooth' // Auto para melhor performance em mobile
                    });
                }
            } else if (href.includes('#')) {
                // Link externo - outra página com âncora
                // Deixar o comportamento padrão do navegador
                return true;
            }
        });
    });
    
    // Função para rolar para âncora quando a página carrega
    function scrollToAnchorOnLoad() {
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || (isMobile ? 80 : 100);
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: isMobile ? 'auto' : 'smooth'
                    });
                }
            }, 100);
        }
    }
    
    // Executar quando a página carrega
    scrollToAnchorOnLoad();
    
    console.log('✅ Navegação suave inicializada');
}

// Função principal de animações
function initAnimations() {
    // Logo animação
    function initLogoAnimation() {
        const logo = document.querySelector('.logo-animate');
        if (logo) {
            // Adiciona classe para iniciar animação quando a página carrega
            setTimeout(() => {
                logo.classList.add('animate-in');
            }, 500);
            
            // Adiciona efeito de rotação 3D ao passar o mouse
            logo.addEventListener('mouseover', function() {
                this.style.transform = 'perspective(500px) rotateY(15deg) translateY(-3px)';
                this.style.textShadow = '0 0 15px rgba(59, 130, 246, 0.8)';
            });
            
            logo.addEventListener('mouseout', function() {
                this.style.transform = 'perspective(500px) rotateY(0) translateY(0)';
                this.style.textShadow = '';
            });
        }
        
        console.log('✅ Animação da logo inicializada');
    }
    
    // IMPORTANTE: Chamar a função de animação da logo
    initLogoAnimation();
    
    // Animações de scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible'); // Mudança aqui
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        observer.observe(el);
    });
    
    // Funcionalidade do botão de toggle de animação
    const animationToggle = document.getElementById('animation-toggle-btn');
    const techCanvas = document.getElementById('tech-canvas');
    let animationEnabled = localStorage.getItem('animationEnabled') !== 'false';
    
    // Aplicar estado inicial
    if (!animationEnabled && techCanvas) {
        techCanvas.style.display = 'none';
    }
    
    if (animationToggle) {
        animationToggle.addEventListener('click', function() {
            // Efeito de ripple
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 600);
            
            animationEnabled = !animationEnabled;
            localStorage.setItem('animationEnabled', animationEnabled);
            
            if (techCanvas) {
                techCanvas.style.display = animationEnabled ? 'block' : 'none';
            }
        });
    }
    
    console.log('✅ Animações inicializadas');
}

// Função para efeitos de scroll
function initScrollEffects() {
    // Implementar efeitos de scroll específicos aqui
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.animate-on-scroll').forEach(function(el) {
        observer.observe(el);
    });
    
    console.log('✅ Efeitos de scroll inicializados');
}