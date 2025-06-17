/**
 * NaxelTech - Sistema de Calculadora de Orçamento
 * Desenvolvido para estimar custos de serviços de TI
 */
// Script simplificado e funcional para NaxelTech
console.log('🚀 Iniciando NexoTech...');

// Variáveis globais da calculadora
let calculatorData = {
    total: 0,
    services: [],
    employeeMultiplier: 1,
    complexityMultiplier: 1,
    employees: null,
    activity: null
};

// Função principal de inicialização
function initializeApp() {
    console.log('🚀 Inicializando aplicação...');
    
    // 1. Menu Mobile
    initMobileMenu();
    
    // 2. Navegação Suave
    initSmoothScroll();
    
    // 3. Animações
    if (typeof initAnimations === 'function') {
        initAnimations();
    }
    
    // 4. Gráfico
    if (typeof initChart === 'function') {
        initChart();
    }
    
    // 5. Calculadora
    setTimeout(() => {
        if (typeof initCalculator === 'function') {
            initCalculator();
        }
    }, 100);
    
    // 7. Header scroll
    initHeaderScrollEffect();
    
    // 8. Inicializar calculadora mobile se necessário
    if (window.innerWidth <= 768) {
        initMobileCalculator();
    }
    
    // 9. Formulário de contato
    initContactForm();
    
    // 10. Newsletter
    initNewsletter();
    
    console.log('✅ Aplicação inicializada com sucesso!');
}

// Aguardar carregamento completo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}

// Função para menu mobile
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopMenu = document.querySelector('.hidden.md\\:flex');
    const navLinks = document.querySelectorAll('.nav-links a, .hidden.md\\:flex a');
    
    console.log('🔧 Inicializando menu mobile...');
    console.log('Botão encontrado:', !!mobileMenuButton);
    console.log('Menu mobile encontrado:', !!mobileMenu);
    console.log('Menu desktop encontrado:', !!desktopMenu);
    
    // Verificação de segurança
    if (!mobileMenuButton) {
        console.warn('⚠️ Botão do menu mobile não encontrado');
        return;
    }
    
    // Forçar visibilidade do menu desktop em telas pequenas como fallback
    mobileMenuButton.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('🔧 Botão mobile clicado');
        
        // Se o menu mobile existe, usar ele
        if (mobileMenu) {
            mobileMenu.classList.toggle('hidden');
            this.classList.toggle('active');
        } 
        // Senão, mostrar/esconder o menu desktop
        else if (desktopMenu) {
            if (desktopMenu.style.display === 'none' || !desktopMenu.style.display) {
                desktopMenu.style.display = 'flex';
                desktopMenu.style.flexDirection = 'column';
                desktopMenu.style.position = 'absolute';
                desktopMenu.style.top = '100%';
                desktopMenu.style.left = '0';
                desktopMenu.style.right = '0';
                desktopMenu.style.background = 'rgba(30, 41, 59, 0.98)';
                desktopMenu.style.padding = '1rem';
                desktopMenu.style.zIndex = '9999';
            } else {
                desktopMenu.style.display = 'none';
            }
            this.classList.toggle('active');
        }
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(e) {
        if (!mobileMenuButton.contains(e.target) && 
            !mobileMenu?.contains(e.target) && 
            !desktopMenu?.contains(e.target)) {
            
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
            if (desktopMenu) {
                desktopMenu.style.display = '';
            }
            mobileMenuButton.classList.remove('active');
        }
    });
    
    // Fechar menu ao clicar em links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (mobileMenu) {
                mobileMenu.classList.add('hidden');
            }
            if (desktopMenu) {
                desktopMenu.style.display = '';
            }
            if (mobileMenuButton) {
                mobileMenuButton.classList.remove('active');
            }
        });
    });
    
    console.log('✅ Menu mobile inicializado');
}



// Função para navegação suave
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
                        behavior: isMobile ? 'auto' : 'smooth'
                    });
                }
            } else if (href.includes('#')) {
                // Link externo - outra página com âncora
                const [page, anchor] = href.split('#');
                
                // CORREÇÃO: Se estamos indo para index.html, permitir navegação normal
                if (page === 'index.html' || page === '') {
                    // NÃO usar preventDefault() aqui - deixar navegação normal
                    return true;
                }
                
                // Para outros casos, verificar se estamos na página correta
                const currentPage = window.location.pathname.split('/').pop() || 'index.html';
                if (page !== currentPage) {
                    // Navegação para página diferente - permitir navegação normal
                    return true;
                } else {
                    // Mesma página, fazer scroll suave
                    e.preventDefault();
                    const targetElement = document.getElementById(anchor);
                    if (targetElement) {
                        const headerHeight = document.querySelector('header')?.offsetHeight || 100;
                        const targetPosition = targetElement.offsetTop - headerHeight;
                        
                        window.scrollTo({
                            top: targetPosition,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
    
    // Funcionalidade especial para a logo - sempre vai para o topo da página principal
    const logoLinks = document.querySelectorAll('a[href="index.html"]:not([href*="#"]), a.logo-animate[href="#"]');
    logoLinks.forEach(function(logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();
            // Se já estamos na página principal, rolar para o topo
            if (window.location.pathname.endsWith('index.html') || window.location.pathname === '/') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                // Reinicializar apenas a calculadora se necessário
                setTimeout(() => {
                    if (typeof initCalculator === 'function') {
                        initCalculator();
                    }

                }, 100);
            } else {
                // Se estamos em outra página, navegar para index.html
                window.location.href = 'index.html';
            }
        });
    });
    
    // Função para rolar suavemente para uma seção específica ao carregar a página
    function scrollToAnchorOnLoad() {
        // Sempre ir para o topo da página, ignorando qualquer hash
        window.scrollTo({
            top: 0,
            behavior: 'auto'
        });
        
        // Limpar o hash da URL sem recarregar a página
        if (window.location.hash) {
            history.replaceState(null, null, window.location.pathname + window.location.search);
        }
    }
    
    // Executar ao carregar a página
    scrollToAnchorOnLoad();
    
    console.log('✅ Navegação suave inicializada');
}

// Adicionar na função initAnimations
function initAnimations() {
    // Logo animação
    // Função para animar a logo
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



// Função para inicializar calculadora
function initCalculator() {
    console.log('🧮 Inicializando calculadora...');
    
    const form = document.getElementById('calculator-form');
    if (!form) {
        console.error('⚠️ Formulário da calculadora não encontrado');
        return;
    }
    
    // Verificar se os elementos de resultado existem
    const breakdown = document.getElementById('result-breakdown');
    const total = document.getElementById('result-total');
    
    if (!breakdown || !total) {
        console.error('⚠️ Elementos de resultado não encontrados');
        console.log('Elementos encontrados:', {
            breakdown: !!breakdown,
            total: !!total
        });
        return;
    }
    
    // Event listeners para inputs
    const inputs = form.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    
    inputs.forEach(function(input) {
        input.addEventListener('change', function() {
            console.log('🔄 Input alterado:', this.name, this.value, this.checked);
            // Pequeno delay para garantir que o DOM foi atualizado
            setTimeout(() => {
                try {
                    updateCalculation();
                } catch (error) {
                    console.error('Erro ao atualizar cálculo:', error);
                }
            }, 10);
        });
    });
    

    
    // Inicializar display
    try {
        updateResultDisplay();
    } catch (error) {
        console.error('Erro ao inicializar display:', error);
    }
    
    console.log('✅ Calculadora inicializada com', inputs.length, 'inputs');
}

// Função para atualizar cálculos
function updateCalculation() {
    console.log('🧮 Calculando...');
    
    // Reset
    calculatorData.total = 0;
    calculatorData.services = [];
    
    // Multiplicadores
    const employeeInput = document.querySelector('input[name="employees"]:checked');
    calculatorData.employeeMultiplier = employeeInput ? parseFloat(employeeInput.dataset.multiplier || 1) : 1;
    
    const activityInput = document.querySelector('input[name="activity"]:checked');
    calculatorData.complexityMultiplier = activityInput ? parseFloat(activityInput.dataset.complexity || 1) : 1;
    
    console.log('Multiplicadores:', {
        employee: calculatorData.employeeMultiplier,
        complexity: calculatorData.complexityMultiplier
    });
    
    // Serviços selecionados
    const serviceInputs = document.querySelectorAll('input[name="services"]:checked');
    console.log('Serviços selecionados:', serviceInputs.length);
    
    serviceInputs.forEach(function(input) {
        const basePrice = parseFloat(input.dataset.price || 0);
        const adjustedPrice = basePrice * calculatorData.employeeMultiplier * calculatorData.complexityMultiplier;
        
        calculatorData.total += adjustedPrice;
        
        const label = input.closest('.checkbox-option')?.querySelector('strong')?.textContent || input.value;
        
        calculatorData.services.push({
            name: input.value,
            label: label,
            basePrice: basePrice,
            adjustedPrice: adjustedPrice
        });
        
        console.log('Serviço adicionado:', {
            name: input.value,
            basePrice: basePrice,
            adjustedPrice: adjustedPrice
        });
    });
    
    console.log('💰 Total calculado:', calculatorData.total);
    console.log('Serviços no total:', calculatorData.services.length);
    
    updateResultDisplay();
}


// Função para atualizar display - VERSÃO CORRIGIDA
function updateResultDisplay() {
    const resultBreakdown = document.getElementById('result-breakdown');
    const resultTotal = document.getElementById('result-total');
    
    if (!resultBreakdown || !resultTotal) {
        console.log('⚠️ Elementos de resultado não encontrados');
        return;
    }
    
    if (calculatorData.services.length === 0) {
        resultBreakdown.innerHTML = '<div class="text-center py-8"><p class="text-slate-600">Selecione as opções acima para ver a estimativa</p></div>';
        const totalValue = resultTotal.querySelector('.total-value');
        if (totalValue) {
            totalValue.textContent = 'R$ 0';
        }
        return;
    }
    
    // Gerar HTML dos serviços SEM classes de scale
    let html = '<div class="space-y-2">';
    
    calculatorData.services.forEach(function(service, index) {
        const priceFormatted = `R$ ${service.adjustedPrice.toLocaleString('pt-BR', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
        
        html += `
            <div class="group flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 hover:shadow-md transition-all duration-300">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        ${index + 1}
                    </div>
                    <span class="font-medium text-slate-700 group-hover:text-blue-700 transition-colors">${service.label}</span>
                </div>
                <div class="text-right">
                    <span class="font-bold text-lg text-blue-600">${priceFormatted}</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    resultBreakdown.innerHTML = html;
    
    // Atualizar total com animação suave
    const totalValue = resultTotal.querySelector('.total-value');
    if (totalValue) {
        const formattedTotal = `R$ ${calculatorData.total.toLocaleString('pt-BR', {
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        })}`;
        
        // Animação suave apenas com opacidade
        totalValue.style.transition = 'opacity 0.3s ease';
        totalValue.style.opacity = '0.7';
        setTimeout(() => {
            totalValue.textContent = formattedTotal;
            totalValue.style.opacity = '1';
        }, 150);
    }
    
    // Mostrar container mobile sem transforms problemáticos
    const mobileResult = document.querySelector('.mobile-result-display');
    if (mobileResult && calculatorData.services.length > 0) {
        mobileResult.style.opacity = '1';
        mobileResult.style.visibility = 'visible';
    }
}

// Função para enviar orçamento
function sendQuote() {
    console.log('📱 Enviando orçamento...');
    
    if (calculatorData.services.length === 0) {
        alert('Por favor, selecione pelo menos um serviço antes de solicitar o orçamento.');
        return;
    }
    
    const employeeRange = document.querySelector('input[name="employees"]:checked')?.value || 'Não informado';
    const activity = document.querySelector('input[name="activity"]:checked')?.value || 'Não informado';
    
    let message = `Olá! Gostaria de solicitar um orçamento detalhado:\n\n`;
    message += `👥 Funcionários: ${employeeRange}\n`;
    message += `🏢 Atividade: ${activity}\n\n`;
    message += `🛠️ Serviços de interesse:\n`;
    
    calculatorData.services.forEach(function(service) {
        message += `• ${service.label} - R$ ${service.adjustedPrice.toLocaleString('pt-BR')}\n`;
    });
    
    message += `\n💰 Total estimado: R$ ${calculatorData.total.toLocaleString('pt-BR')}\n\n`;
    message += `Aguardo contato para mais detalhes!`;
    
    const subject = encodeURIComponent('Solicitação de Orçamento - NaxelTech');
    const whatsappUrl = `https://wa.me/5571981525641?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Função para resetar calculadora
function resetCalculator() {
    console.log('🔄 Resetando...');
    
    const form = document.getElementById('calculator-form');
    if (form) {
        form.reset();
        
        // Resetar dados da calculadora
        calculatorData = {
            total: 0,
            services: [],
            employeeMultiplier: 1,
            complexityMultiplier: 1,
            employees: null,
            activity: null
        };
        
        // Atualizar calculadora desktop
        updateResultDisplay();
        
        // Resetar calculadora mobile de forma mais robusta
        if (window.innerWidth <= 768) {
            // Resetar display mobile
            const resultDisplay = document.querySelector('.mobile-result-display');
            const estimateText = document.querySelector('.estimate-text');
            const mobileBreakdown = document.querySelector('.mobile-breakdown');
            const mobileTotalValue = document.querySelector('.mobile-total-value');
            
            if (resultDisplay) {
                resultDisplay.classList.remove('show');
            }
            
            if (estimateText) {
                estimateText.textContent = 'Selecione as opções acima para ver a estimativa';
            }
            
            if (mobileBreakdown) {
                mobileBreakdown.innerHTML = '';
            }
            
            if (mobileTotalValue) {
                mobileTotalValue.textContent = 'R$ 0';
            }
            
            // Resetar também os elementos da calculadora mobile criados dinamicamente
            const mobileInvestmentEstimate = document.querySelector('.mobile-investment-estimate');
            if (mobileInvestmentEstimate) {
                const estimateTextInside = mobileInvestmentEstimate.querySelector('.estimate-text');
                if (estimateTextInside) {
                    estimateTextInside.textContent = 'Selecione as opções acima para ver a estimativa';
                }
            }
            
            // Forçar atualização dos elementos mobile
            setTimeout(() => {
                updateMobileCalculatorDisplay();
            }, 100);
            
            console.log('📱 Calculadora mobile resetada completamente');
        }
    }
}

// Tornar funções globais
window.sendQuote = sendQuote;
window.resetCalculator = resetCalculator;

// URLs do Formspree
const FORMSPREE_CONTACT_URL = 'https://formspree.io/f/xrbkknvl';
const FORMSPREE_NEWSLETTER_URL = 'https://formspree.io/f/mvgrzdek';

// Função para sanitizar inputs (proteção XSS)
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Função para enviar dados para Formspree
async function sendToFormspree(url, formData) {
    // Sanitizar todos os campos de texto
    const sanitizedData = {};
    
    for (const key in formData) {
        if (typeof formData[key] === 'string') {
            sanitizedData[key] = sanitizeInput(formData[key]);
        } else {
            sanitizedData[key] = formData[key];
        }
    }
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(sanitizedData)
        });
        
        if (response.ok) {
            return { success: true };
        } else {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
    } catch (error) {
        console.error('Erro ao enviar para Formspree:', error);
        return { success: false, error: error.message };
    }
}

console.log('📜 Script carregado!');


// Função para inicializar o gráfico
function initChart() {
    const ctx = document.getElementById('challenges-chart');
    if (!ctx) {
        console.log('⚠️ Canvas do gráfico não encontrado');
        return;
    }

    // Verificar se Chart.js está carregado
    if (typeof Chart === 'undefined') {
        console.log('⚠️ Chart.js não está carregado');
        setTimeout(initChart, 100);
        return;
    }

    // Destruir gráfico existente
    if (window.challengesChart) {
        try {
            window.challengesChart.destroy();
        } catch (error) {
            console.warn('⚠️ Erro ao destruir gráfico:', error);
        }
        window.challengesChart = null;
    }

    // SOLUÇÃO ROBUSTA PARA ALTA RESOLUÇÃO
    const container = ctx.parentElement;
    const devicePixelRatio = window.devicePixelRatio || 1;
    
    // Obter dimensões reais do container
    const containerRect = container.getBoundingClientRect();
    const displayWidth = containerRect.width - 40; // Subtrair padding
    const displayHeight = containerRect.height - 40;
    
    // Configurar canvas para alta resolução
    ctx.width = displayWidth * devicePixelRatio;
    ctx.height = displayHeight * devicePixelRatio;
    
    // Definir tamanho CSS (visual)
    ctx.style.width = displayWidth + 'px';
    ctx.style.height = displayHeight + 'px';
    
    // Escalar contexto para alta resolução
    const context = ctx.getContext('2d');
    context.scale(devicePixelRatio, devicePixelRatio);
    
    // Forçar re-renderização
    ctx.style.imageRendering = 'auto';
    ctx.style.imageRendering = '-webkit-optimize-contrast';

    const chartData = {
        labels: [
            'Equipamentos inadequados',
            'Infraestrutura insuficiente', 
            'Segurança de dados',
            'Backups ausentes',
            'Configurações ineficientes'
        ],
        datasets: [{
            label: 'Percentual de Impacto',
            data: [75, 65, 80, 70, 60],
            backgroundColor: [
                'rgba(99, 102, 241, 0.8)',
                'rgba(99, 102, 241, 0.8)', 
                'rgba(139, 92, 246, 0.8)',
                'rgba(99, 102, 241, 0.8)',
                'rgba(99, 102, 241, 0.8)'
            ],
            borderColor: [
                'rgba(99, 102, 241, 1)',
                'rgba(99, 102, 241, 1)',
                'rgba(139, 92, 246, 1)', 
                'rgba(99, 102, 241, 1)',
                'rgba(99, 102, 241, 1)'
            ],
            borderWidth: 2,
            borderRadius: 6,
            barThickness: window.innerWidth <= 768 ? 18 : 25
        }]
    };

    // Detectar dispositivo com mais precisão
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isSmallMobile = window.innerWidth <= 480;

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: false, // IMPORTANTE: Desabilitar responsividade automática
            maintainAspectRatio: false,
            devicePixelRatio: devicePixelRatio,
            indexAxis: 'y',
            animation: false, // Desabilitar todas as animações
            hover: {
                animationDuration: 0
            },
            responsiveAnimationDuration: 0,
            layout: {
                padding: {
                    left: isMobile ? 8 : 15,
                    right: isMobile ? 15 : 25,
                    top: 15,
                    bottom: 15
                }
            },
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: true,
                    backgroundColor: 'rgba(0, 0, 0, 0.9)',
                    titleColor: '#fff',
                    bodyColor: '#fff',
                    borderColor: 'rgba(99, 102, 241, 1)',
                    borderWidth: 1,
                    cornerRadius: 8,
                    titleFont: {
                        size: Math.round((isMobile ? 12 : 14) * devicePixelRatio) / devicePixelRatio,
                        weight: 'bold'
                    },
                    bodyFont: {
                        size: Math.round((isMobile ? 11 : 13) * devicePixelRatio) / devicePixelRatio
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        },
                        color: '#374151',
                        font: {
                            size: Math.round((isSmallMobile ? 10 : (isMobile ? 11 : 13)) * devicePixelRatio) / devicePixelRatio,
                            weight: '600',
                            family: 'system-ui, -apple-system, sans-serif'
                        },
                        stepSize: 25,
                        maxTicksLimit: 5
                    },
                    grid: {
                        color: 'rgba(156, 163, 175, 0.3)',
                        lineWidth: 1
                    },
                    border: {
                        display: false
                    }
                },
                y: {
                    ticks: {
                        color: '#374151',
                        font: {
                            size: Math.round((isSmallMobile ? 9 : (isMobile ? 10 : 12)) * devicePixelRatio) / devicePixelRatio,
                            weight: '600',
                            family: 'system-ui, -apple-system, sans-serif'
                        },
                        maxRotation: 0,
                        padding: isMobile ? 6 : 10,
                        callback: function(value, index) {
                            const label = this.getLabelForValue(value);
                            if (isSmallMobile && label.length > 16) {
                                return label.substring(0, 13) + '...';
                            } else if (isMobile && label.length > 20) {
                                return label.substring(0, 17) + '...';
                            }
                            return label;
                        }
                    },
                    grid: {
                        display: false
                    },
                    border: {
                        display: false
                    }
                }
            },
            onClick: function(event, elements) {
                if (elements.length > 0) {
                    const index = elements[0].index;
                    const serviceCards = document.querySelectorAll('.service-card');
                    
                    serviceCards.forEach(card => card.classList.remove('active'));
                    
                    if (serviceCards[index]) {
                        serviceCards[index].classList.add('active');
                        serviceCards[index].scrollIntoView({ 
                            behavior: 'smooth', 
                            block: 'center' 
                        });
                    }
                }
            }
        }
    };

    try {
        window.challengesChart = new Chart(ctx, config);
        console.log('📊 Gráfico alta resolução criado com sucesso');
    } catch (error) {
        console.error('❌ Erro ao criar gráfico:', error);
    }
}


// Funcionalidade específica para mobile da calculadora


// Corrigir a inicialização da calculadora mobile
function initMobileCalculator() {
    if (window.innerWidth <= 768) {
        console.log('📱 Inicializando calculadora mobile...');
        
        // Criar elementos mobile se não existirem
        createMobileCalculatorElements();
        
        // Escutar mudanças nos inputs de forma mais eficiente
        const form = document.getElementById('calculator-form');
        if (form) {
            // Remover listeners antigos
            form.removeEventListener('change', updateMobileCalculatorDisplay);
            form.removeEventListener('input', updateMobileCalculatorDisplay);
            
            // Adicionar listeners para TODOS os inputs (funcionários, atividade E serviços)
            const allInputs = form.querySelectorAll('input[type="radio"], input[type="checkbox"]');
            
            allInputs.forEach(input => {
                input.addEventListener('change', () => {
                    console.log('📱 Input mobile alterado:', input.name, input.value);
                    setTimeout(updateMobileCalculatorDisplay, 50);
                });
            });
            
            console.log('✅ Event listeners mobile adicionados:', allInputs.length, 'inputs');
        }
    }
}

function createMobileCalculatorElements() {
    const resultContainer = document.querySelector('.result-container');
    if (!resultContainer) {
        console.error('❌ Container de resultado não encontrado');
        return;
    }
    
    // Verificar se já foi criado
    if (resultContainer.querySelector('.mobile-investment-estimate')) {
        console.log('📱 Elementos mobile já existem');
        return;
    }
    
    // Limpar conteúdo existente
    resultContainer.innerHTML = '';
    
    // Criar estimativa de investimento sempre visível
    const investmentEstimate = document.createElement('div');
    investmentEstimate.className = 'mobile-investment-estimate';
    investmentEstimate.innerHTML = `
        <h3>Estimativa de Investimento</h3>
        <p class="estimate-text">Selecione as opções acima para ver a estimativa</p>
    `;
    
    // Criar container de resultado que aparece após seleções
    const resultDisplay = document.createElement('div');
    resultDisplay.className = 'mobile-result-display';
    resultDisplay.innerHTML = `
        <div class="mobile-result-header">
            <h4>Detalhamento dos Serviços</h4>
        </div>
        <div class="mobile-breakdown"></div>
        <div class="mobile-total">
            <div class="mobile-total-label" id="mobile-total-label">Total Estimado:</div>
            <div class="mobile-total-value" id="mobile-total-value">R$ 0</div>
        </div>
    `;
    
    // Criar botões
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'mobile-calculator-buttons';
    buttonsContainer.innerHTML = `
        <button type="button" class="btn-contact" onclick="sendQuote()">Solicitar Orçamento Detalhado</button>
        <button type="button" class="btn-secondary" onclick="resetCalculator()">Recalcular</button>
    `;
    
    resultContainer.appendChild(investmentEstimate);
    resultContainer.appendChild(resultDisplay);
    resultContainer.appendChild(buttonsContainer);
    

    
    console.log('✅ Elementos mobile da calculadora criados');
}

function updateMobileCalculatorDisplay() {
    if (window.innerWidth > 768) return;
    
    console.log('📱 Atualizando display mobile da calculadora...');
    
    const resultDisplay = document.querySelector('.mobile-result-display');
    const breakdown = document.querySelector('.mobile-breakdown');
    const totalValue = document.querySelector('.mobile-total-value');
    const estimateText = document.querySelector('.estimate-text');
    
    if (!resultDisplay || !breakdown || !totalValue) {
        console.error('❌ Elementos mobile não encontrados');
        return;
    }
    
    // Verificar se há seleções
    const employeesSelected = document.querySelector('input[name="employees"]:checked');
    const activitySelected = document.querySelector('input[name="activity"]:checked');
    const servicesSelected = document.querySelectorAll('input[name="services"]:checked');
    
    console.log('👥 Funcionários selecionados:', employeesSelected?.value);
    console.log('🏢 Atividade selecionada:', activitySelected?.value);
    console.log('🛠️ Serviços selecionados:', servicesSelected.length);
    
    if (employeesSelected && activitySelected && servicesSelected.length > 0) {
        // USAR A MESMA LÓGICA DO DESKTOP - chamar updateCalculation
        updateCalculation();
        
        // Usar os dados calculados pela função desktop
        const { services, total } = calculatorData;
        
        console.log('💰 Usando dados do desktop:', { total, services: services.length });
        
        // Atualizar texto da estimativa
        if (estimateText) {
            estimateText.textContent = `Investimento estimado para ${employeesSelected.value} funcionários`;
        }
        
        // Mostrar o container de resultado com animação
        setTimeout(() => {
            resultDisplay.classList.add('show');
        }, 100);
        
        // Atualizar breakdown usando os serviços calculados
        breakdown.innerHTML = '';
        
        services.forEach(service => {
            const item = document.createElement('div');
            item.className = 'mobile-breakdown-item';
            item.innerHTML = `
                <span class="mobile-service-name">${service.label}</span>
                <span class="mobile-service-price">R$ ${Math.round(service.adjustedPrice).toLocaleString('pt-BR')}</span>
            `;
            breakdown.appendChild(item);
        });
        
        // Atualizar total
        totalValue.textContent = `R$ ${Math.round(total).toLocaleString('pt-BR')}`;
        
        // Aplicar cores para modo claro
        const totalLabel = document.getElementById('mobile-total-label');
        const totalValueElement = document.getElementById('mobile-total-value');
        
        if (totalLabel) {
            totalLabel.style.color = '#374151';
            totalLabel.style.fontWeight = '600';
        }
        if (totalValueElement) {
            totalValueElement.style.color = '#059669';
            totalValueElement.style.fontSize = '1.25rem';
            totalValueElement.style.fontWeight = 'bold';
        }
        
        console.log('✅ Display mobile atualizado com total:', total);
        
    } else {
        // Esconder o container de resultado
        resultDisplay.classList.remove('show');
        
        // Resetar texto da estimativa
        if (estimateText) {
            estimateText.textContent = 'Selecione as opções acima para ver a estimativa';
        }
        
        console.log('📱 Display mobile resetado - faltam seleções');
    }
}

// Escutar redimensionamento da janela
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        initMobileCalculator();
    }
});



// Gerar token CSRF
function generateCSRFToken() {
    return Math.random().toString(36).substring(2, 15) + 
           Math.random().toString(36).substring(2, 15);
}

// Função para processar o formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) {
        console.warn('⚠️ Formulário de contato não encontrado');
        return;
    }
    
    // Adicionar token CSRF ao formulário
    const csrfToken = generateCSRFToken();
    localStorage.setItem('csrf_token', csrfToken);
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Verificar token CSRF
        const storedToken = localStorage.getItem('csrf_token');
        if (!storedToken) {
            showNotification('⚠️ Erro de segurança. Recarregue a página e tente novamente.', 'error');
            return;
        }
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Mostrar loading
        submitButton.textContent = 'Enviando...';
        submitButton.disabled = true;
        submitButton.style.opacity = '0.7';
        
        // Coletar dados do formulário
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            message: document.getElementById('message').value,
            _subject: 'Novo contato do site NexoTech',
            csrf_token: storedToken
        };
        
        // Validar telefone
        if (!isValidPhone(formData.phone)) {
            showNotification('⚠️ Por favor, insira um telefone válido.', 'warning');
            submitButton.textContent = originalText;
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            return;
        }
        
        // Enviar via Formspree
        const result = await sendToFormspree(FORMSPREE_CONTACT_URL, formData);
        
        // Gerar novo token após envio
        localStorage.setItem('csrf_token', generateCSRFToken());
        
        if (result.success) {
            console.log(' Mensagem enviada com sucesso!');
            showNotification(' Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
            contactForm.reset();
        } else {
            console.error(' Erro ao enviar mensagem:', result.error);
            showNotification(' Erro ao enviar mensagem. Tente novamente ou entre em contato via WhatsApp.', 'error');
        }
        
        // Restaurar botão
        submitButton.textContent = originalText;
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    });
}

// Função para mostrar notificações
function showNotification(message, type) {
    // Remover notificação existente se houver
    const existingNotification = document.querySelector('.notification-toast');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification-toast fixed z-50 transform transition-all duration-300 rounded-lg shadow-lg ${
        type === 'success' 
            ? 'bg-green-500 text-white border-l-4 border-green-700' 
            : type === 'warning'
            ? 'bg-yellow-500 text-white border-l-4 border-yellow-700'
            : 'bg-red-500 text-white border-l-4 border-red-700'
    }`;
    
    // Estilos responsivos via JavaScript
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Mobile: notificação no topo, largura quase total
        notification.style.cssText = `
            top: 80px;
            left: 1rem;
            right: 1rem;
            width: calc(100% - 2rem);
            max-width: none;
            padding: 0.5rem;
            font-size: 0.75rem;
        `;
    } else {
        // Desktop: canto superior direito
        notification.style.cssText = `
            top: 1rem;
            right: 1rem;
            max-width: 400px;
            padding: 1rem;
            font-size: 0.875rem;
        `;
    }
    
    notification.innerHTML = `
        <div class="flex items-center">
            <span class="mr-2 text-lg flex-shrink-0">${
                type === 'success' ? '' : 
                type === 'warning' ? '' : ''
            }</span>
            <span class="flex-1 text-sm leading-tight">${message}</span>
            <button onclick="this.parentElement.parentElement.remove()" class="ml-3 text-white hover:text-gray-200 text-xl font-bold flex-shrink-0 w-6 h-6 flex items-center justify-center">
                ×
            </button>
        </div>
    `;
    
    // Iniciar fora da tela
    if (isMobile) {
        notification.style.transform = 'translateY(-100%)';
    } else {
        notification.style.transform = 'translateX(100%)';
    }
    
    document.body.appendChild(notification);
    
    // Animação de entrada
    setTimeout(() => {
        notification.style.transform = isMobile ? 'translateY(0)' : 'translateX(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        if (notification.parentElement) {
            notification.style.transform = isMobile ? 'translateY(-100%)' : 'translateX(100%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }
    }, 5000);
}

// Função para inicializar newsletter
function initNewsletter() {
    console.log('🔧 Inicializando newsletter...');
    
    const newsletterForm = document.querySelector('.newsletter-form');
    const emailInput = document.getElementById('newsletter-email');
    const subscribeButton = document.getElementById('newsletter-submit');
    
    if (!newsletterForm || !emailInput || !subscribeButton) {
        console.warn('⚠️ Elementos da newsletter não encontrados');
        return;
    }
    
    // Event listener para o formulário
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleNewsletterSubscription();
    });
    
    // Event listener para Enter no campo de email
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleNewsletterSubscription();
        }
    });
    
    console.log('✅ Newsletter inicializada');
}

// Função para processar a inscrição na newsletter
async function handleNewsletterSubscription() {
    const emailInput = document.getElementById('newsletter-email');
    const subscribeButton = document.getElementById('newsletter-submit');
    
    if (!emailInput || !subscribeButton) {
        console.error('❌ Elementos da newsletter não encontrados');
        return;
    }
    
    const email = emailInput.value.trim();
    
    if (!email) {
        showNotification('⚠️ Por favor, insira seu email.', 'warning');
        emailInput.focus();
        return;
    }
    
    if (!isValidEmail(email)) {
        showNotification('⚠️ Por favor, insira um email válido.', 'warning');
        emailInput.focus();
        return;
    }
    
    // Mostrar estado de carregamento
    const originalText = subscribeButton.innerHTML;
    subscribeButton.innerHTML = `
        <span class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Inscrevendo...
        </span>
    `;
    subscribeButton.disabled = true;
    subscribeButton.style.opacity = '0.7';
    
    // Preparar dados para Formspree
    const formData = {
        email: email,
        subscriber_name: email.split('@')[0],
        subscription_date: new Date().toLocaleDateString('pt-BR'),
        _subject: 'Nova inscrição na newsletter NexoTech'
    };
    
    // Enviar via Formspree
    const result = await sendToFormspree(FORMSPREE_NEWSLETTER_URL, formData);
    
    if (result.success) {
        console.log('✅ Newsletter subscription enviada!');
        emailInput.value = '';
        showNotification('🎉 Inscrição realizada com sucesso! Bem-vindo à nossa newsletter técnica.', 'success');
    } else {
        console.error('❌ Erro ao inscrever na newsletter:', result.error);
        showNotification('❌ Erro ao processar inscrição. Tente novamente em alguns instantes.', 'error');
    }
    
    // Restaurar botão
    subscribeButton.innerHTML = originalText;
    subscribeButton.disabled = false;
    subscribeButton.style.opacity = '1';
}

// Função para validar email (mais robusta)
function isValidEmail(email) {
    // Regex mais completa para validação de email
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[ ^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(String(email).toLowerCase());
}

// Adicionar validação de telefone
function isValidPhone(phone) {
    // Aceita formatos: (XX) XXXXX-XXXX ou XX XXXXX-XXXX ou apenas números
    const phoneRegex = /^(\(?\d{2}\)?\s?)?\d{4,5}-?\d{4}$/;
    return phoneRegex.test(phone);
}






// Header fixo simples com efeito de scroll
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    
    if (!header) {
        return;
    }
    
    let ticking = false;
    
    // Adicionar/remover classe scrolled baseado na posição do scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    // Event listener para scroll com throttling
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Inicializar estado
    handleScroll();
}

// Melhorar o evento de resize
let resizeTimeout;
let lastWidth = window.innerWidth;

window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Só recriar se a largura mudou significativamente
        const currentWidth = window.innerWidth;
        const widthDifference = Math.abs(currentWidth - lastWidth);
        
        if (widthDifference > 50 && typeof initChart === 'function') {
            console.log('📏 Redimensionamento significativo detectado, recriando gráfico');
            lastWidth = currentWidth;
            initChart();
        }
    }, 500); // Aumentar debounce para 500ms
});

