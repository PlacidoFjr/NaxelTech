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
    // Função para animar a logo
    function initLogoAnimation() {
        const logo = document.querySelector('.logo-animate');
        
        if (logo) {
            // Animação de entrada
            setTimeout(() => {
                logo.classList.add('animate-in');
            }, 500);
            
            // Efeitos de hover
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
    
    // CORRIGIDO: Inicializar fundo tecnológico
    if (typeof initTechBackground === 'function') {
        initTechBackground();
        console.log('✅ Fundo tecnológico inicializado');
    } else {
        console.warn('⚠️ Função initTechBackground não encontrada');
    }
    
    // Animações de scroll
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
    
    // Controle do toggle de animação
    const toggleBtn = document.getElementById('animation-toggle-btn');
    const techCanvas = document.getElementById('tech-canvas');
    let animationEnabled = localStorage.getItem('animationEnabled') !== 'false';
    
    // Aplicar estado inicial
    if (!animationEnabled && techCanvas) {
        techCanvas.style.display = 'none';
    }
    
    // Event listener para o toggle
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            this.classList.add('clicked');
            setTimeout(() => this.classList.remove('clicked'), 600);
            
            animationEnabled = !animationEnabled;
            localStorage.setItem('animationEnabled', animationEnabled);
            
            if (techCanvas) {
                techCanvas.style.display = animationEnabled ? 'block' : 'none';
                
                if (animationEnabled && typeof initTechBackground === 'function') {
                    initTechBackground();
                } else if (!animationEnabled && techCanvas.stopAnimation) {
                    techCanvas.stopAnimation();
                }
            }
        });
    }
    
    console.log('✅ Animações inicializadas');
}

// Função para inicializar o fundo tecnológico animado
function initTechBackground() {
    // Verificar se já foi inicializado para evitar duplicação
    if (window.techBackgroundInitialized) {
        console.log('⚠️ Fundo tecnológico já inicializado');
        return;
    }
    
    const canvas = document.getElementById('tech-canvas');
    if (!canvas) {
        console.warn('⚠️ Canvas tech-canvas não encontrado');
        return;
    }

    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];
    let connections = [];
    
    // Configurar canvas para alta resolução
    function resizeCanvas() {
        const rect = canvas.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        
        ctx.scale(dpr, dpr);
        canvas.style.width = rect.width + 'px';
        canvas.style.height = rect.height + 'px';
    }
    
    // Classe para partículas
    class Particle {
        constructor() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.2;
            this.pulse = Math.random() * Math.PI * 2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulse += 0.02;
            
            // Rebater nas bordas
            if (this.x < 0 || this.x > window.innerWidth) this.vx *= -1;
            if (this.y < 0 || this.y > window.innerHeight) this.vy *= -1;
            
            // Manter dentro dos limites
            this.x = Math.max(0, Math.min(window.innerWidth, this.x));
            this.y = Math.max(0, Math.min(window.innerHeight, this.y));
        }
        
        draw() {
            const pulseFactor = Math.sin(this.pulse) * 0.3 + 0.7;
            const currentSize = this.size * pulseFactor;
            const currentOpacity = this.opacity * pulseFactor;
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentSize, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${currentOpacity})`; // blue-500
            ctx.fill();
            
            // Adicionar brilho
            ctx.beginPath();
            ctx.arc(this.x, this.y, currentSize * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59, 130, 246, ${currentOpacity * 0.2})`;
            ctx.fill();
        }
    }
    
    // Inicializar partículas
    function initParticles() {
        particles = [];
        const particleCount = window.innerWidth < 768 ? 30 : 50;
        
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    // Desenhar conexões entre partículas próximas
    function drawConnections() {
        const maxDistance = window.innerWidth < 768 ? 100 : 150;
        
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < maxDistance) {
                    const opacity = (1 - distance / maxDistance) * 0.3;
                    
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`; // indigo-500
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }
    
    // Desenhar grade tecnológica
    function drawGrid() {
        const gridSize = window.innerWidth < 768 ? 60 : 80;
        const opacity = 0.1;
        
        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
        ctx.lineWidth = 1;
        
        // Linhas verticais
        for (let x = 0; x <= window.innerWidth; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, window.innerHeight);
            ctx.stroke();
        }
        
        // Linhas horizontais
        for (let y = 0; y <= window.innerHeight; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(window.innerWidth, y);
            ctx.stroke();
        }
    }
    
    // Loop de animação
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Remover a chamada para drawGrid()
        // drawGrid(); <- Remover esta linha
        
        // Atualizar e desenhar partículas
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Desenhar conexões
        drawConnections();
        
        animationId = requestAnimationFrame(animate);
    }
    
    // Função para parar a animação
    canvas.stopAnimation = function() {
        if (animationId) {
            cancelAnimationFrame(animationId);
            animationId = null;
        }
    };
    
    // Inicializar
    resizeCanvas();
    initParticles();
    animate();
    
    // Redimensionar quando a janela muda
    window.addEventListener('resize', () => {
        resizeCanvas();
        initParticles();
    });
    
    // Marcar como inicializado
    window.techBackgroundInitialized = true;
    console.log('✅ Fundo tecnológico inicializado com sucesso');
}

// Mova a definição da função initTechBackground para ANTES de initAnimations

// Função para animar a navbar
function initNavbarAnimations() {
    const navbar = document.querySelector('.navbar-animated');
    const navItems = document.querySelectorAll('.nav-item');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    
    if (!navbar) {
        console.warn('Navbar não encontrada');
        return;
    }
    
    // Animar itens da navbar com delay
    navItems.forEach((item, index) => {
        item.style.opacity = '0';
        setTimeout(() => {
            item.style.animation = `navItemSlide 0.5s ease forwards`;
            item.style.opacity = '1';
        }, 100 * index);
    });
    
    // Melhorar a animação do menu mobile
    if (mobileMenuButton && mobileMenu) {
        // Remover event listeners existentes
        const newButton = mobileMenuButton.cloneNode(true);
        mobileMenuButton.parentNode.replaceChild(newButton, mobileMenuButton);
        
        newButton.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const isHidden = mobileMenu.classList.contains('hidden');
            
            if (isHidden) {
                // Mostrar menu
                mobileMenu.classList.remove('hidden');
                setTimeout(() => {
                    mobileMenu.classList.add('show');
                }, 10);
            } else {
                // Esconder menu
                mobileMenu.classList.remove('show');
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
            }
            
            this.classList.toggle('active');
        });
    }
    
    // Efeito de sombra na navbar ao scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.style.animation = 'navbarShadowPulse 3s infinite';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
        } else {
            navbar.style.animation = 'none';
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        }
    });
}

// Inicializar animações quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar animações da navbar em todas as páginas
    initNavbarAnimations();
    
    // Verificar se estamos na página principal para inicializar outras animações
    if (document.querySelector('.tech-background')) {
        // Código específico da página principal
        initTechBackground();
        console.log('✅ Fundo tecnológico inicializado');
    }
});