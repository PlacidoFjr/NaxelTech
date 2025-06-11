// Script simplificado e funcional para NexoTech
console.log('🚀 Iniciando NexoTech...');

// Aguardar carregamento da página
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ DOM carregado!');
    
    // 1. Menu Mobile
    initMobileMenu();
    
    // 2. Navegação Suave
    initSmoothScroll();
    
    // 3. Animações
    initAnimations();
    
    // 4. Calculadora - com delay para garantir que todos os elementos estejam prontos
    setTimeout(() => {
        initCalculator();
    }, 100);
    
    // 5. Gráfico
    initChart();
    
    // 6. Formulário de contato
    initContactForm();
    
    // 7. Efeito de scroll do header
    initHeaderScrollEffect();
    
    console.log('✅ Todas as funcionalidades inicializadas!');
});

// Função para menu mobile
// Função para menu mobile
function initMobileMenu() {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const desktopMenu = document.querySelector('.hidden.md\\:flex'); // Links desktop
    const navLinks = document.querySelectorAll('.nav-links a, .hidden.md\\:flex a');
    
    console.log('🔧 Inicializando menu mobile...');
    console.log('Botão encontrado:', !!mobileMenuButton);
    console.log('Menu mobile encontrado:', !!mobileMenu);
    console.log('Menu desktop encontrado:', !!desktopMenu);
    
    if (mobileMenuButton) {
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
    }
    
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
        const hash = window.location.hash;
        if (hash) {
            setTimeout(() => {
                const targetElement = document.querySelector(hash);
                if (targetElement) {
                    const headerHeight = document.querySelector('header')?.offsetHeight || 80;
                    const targetPosition = targetElement.offsetTop - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
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

// Variáveis da calculadora (manter apenas esta declaração)
let calculatorData = {
    total: 0,
    services: [],
    employeeMultiplier: 1,
    complexityMultiplier: 1,
    employees: null,
    activity: null
};

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
    
    // Inicializar versão mobile se necessário
    if (window.innerWidth <= 768) {
        initMobileCalculator();
    }
    
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


// Função para atualizar display
// Função para atualizar display
function updateResultDisplay() {
    const breakdown = document.getElementById('result-breakdown');
    const total = document.getElementById('result-total');
    
    if (!breakdown || !total) {
        console.log('⚠️ Elementos de resultado não encontrados');
        return;
    }
    
    if (calculatorData.services.length === 0) {
        breakdown.innerHTML = '<div class="text-center py-8"><p class="text-slate-600 dark:text-slate-300">Selecione as opções acima para ver a estimativa</p></div>';
        const totalValue = total.querySelector('.total-value');
        if (totalValue) totalValue.textContent = 'R$ 0';
        return;
    }
    
    // Gerar HTML dos serviços com design melhorado
    let html = '<div class="space-y-2">';
    
    calculatorData.services.forEach(function(service, index) {
        const priceFormatted = `R$ ${service.adjustedPrice.toLocaleString('pt-BR', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
        
        html += `
            <div class="group flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-700 dark:to-slate-600 rounded-xl border border-blue-100 dark:border-slate-600 hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                <div class="flex items-center space-x-3">
                    <div class="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        ${index + 1}
                    </div>
                    <span class="font-medium text-slate-700 dark:text-slate-200 group-hover:text-blue-700 dark:group-hover:text-blue-300 transition-colors">${service.label}</span>
                </div>
                <div class="text-right">
                    <span class="font-bold text-lg text-blue-600 dark:text-blue-400">${priceFormatted}</span>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    breakdown.innerHTML = html;
    
    // Atualizar total
    const totalValue = total.querySelector('.total-value');
    if (totalValue) {
        const formattedTotal = `R$ ${calculatorData.total.toLocaleString('pt-BR', {minimumFractionDigits: 0, maximumFractionDigits: 0})}`;
        const itemCount = calculatorData.services.length;
        
        // Animação suave
        totalValue.style.transition = 'all 0.3s ease';
        totalValue.style.transform = 'scale(0.95)';
        totalValue.style.opacity = '0.7';
        
        setTimeout(() => {
            totalValue.textContent = formattedTotal;
            totalValue.style.transform = 'scale(1)';
            totalValue.style.opacity = '1';
        }, 150);
    }
    
    // Mostrar container de resultado mobile se existir
    const mobileResult = document.querySelector('.mobile-result-display');
    if (mobileResult && calculatorData.services.length > 0) {
        mobileResult.style.opacity = '1';
        mobileResult.style.transform = 'translateY(0)';
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
    
    const whatsappUrl = `https://wa.me/5571999195766?text=${encodeURIComponent(message)}`;
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
        setTimeout(initChart, 100); // Tentar novamente
        return;
    }

    // Destruir gráfico existente se houver
    if (window.challengesChart && typeof window.challengesChart.destroy === 'function') {
        window.challengesChart.destroy();
        window.challengesChart = null;
    }

    const chartData = {
        labels: [
            'Escolha de equipamentos inadequados',
            'Infraestrutura de rede insuficiente', 
            'Falta de segurança de dados',
            'Ausência de backups',
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
            borderWidth: 2
        }]
    };

    // Verificar se está no modo escuro
    const isDarkMode = document.body.classList.contains('dark');
    
    // Definir a cor do texto com base no modo
    const textColor = isDarkMode ? '#FFFFFF' : '#1f2937';
    
    // Detectar tamanho da tela de forma mais robusta
    const containerWidth = ctx.parentElement.offsetWidth;
    const isMobile = window.innerWidth <= 768 || containerWidth < 500;
    const isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;
    const isDesktop = window.innerWidth > 1024;

    // Configurações específicas por dispositivo
    let fontSize, barThickness, padding;
    
    if (isMobile) {
        fontSize = { tick: 10, label: 9 };
        barThickness = 25;
        padding = 5;
    } else if (isTablet) {
        fontSize = { tick: 11, label: 10 };
        barThickness = 20;
        padding = 8;
    } else { // Desktop
        fontSize = { tick: 10, label: 9 }; // Fonte menor no desktop
        barThickness = 18; // Barras mais finas
        padding = 10;
    }

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: true, // Mudança importante
            aspectRatio: isMobile ? 1.2 : 1.8, // Proporção fixa
            indexAxis: 'y',
            layout: {
                padding: {
                    left: padding + 10,
                    right: padding,
                    top: padding,
                    bottom: padding
                }
            },
            elements: {
                bar: {
                    borderRadius: isDesktop ? 3 : 4, // Bordas menores no desktop
                    barThickness: barThickness
                }
            },
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: false
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
                        color: textColor,
                        font: {
                            size: fontSize.tick
                        }
                    },
                    grid: {
                        color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(148, 163, 184, 0.3)'
                    }
                },
                y: {
                    ticks: {
                        color: textColor,
                        font: {
                            size: fontSize.label
                        },
                        maxRotation: 0,
                        callback: function(value, index) {
                            const label = this.getLabelForValue(value);
                            // Truncar texto baseado no dispositivo
                            if (isMobile && label.length > 25) {
                                return label.substring(0, 22) + '...';
                            } else if (isDesktop && label.length > 30) {
                                return label.substring(0, 27) + '...';
                            }
                            return label;
                        }
                    },
                    grid: {
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
        console.log('📊 Gráfico inicializado');
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
    
    // Chamar updateMobileColors após adicionar os elementos ao DOM
    setTimeout(() => {
        updateMobileColors();
    }, 100);
    
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
        
        // Aplicar cor correta baseada no modo escuro
        const isDark = document.body.classList.contains('dark');
        const totalLabel = document.getElementById('mobile-total-label');
        const totalValueElement = document.getElementById('mobile-total-value');
        
        if (totalLabel) {
            totalLabel.style.color = isDark ? '#ffffff' : '#374151';
            totalLabel.style.fontWeight = '600';
        }
        if (totalValueElement) {
            totalValueElement.style.color = isDark ? '#ffffff' : '#059669';
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

// Adicionar ao init principal

// Escutar redimensionamento da janela
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        initMobileCalculator();
    }
});




// Adicionar após criar os elementos:
function updateMobileColors() {
    const isDark = document.body.classList.contains('dark');
    const label = document.getElementById('mobile-total-label');
    const value = document.getElementById('mobile-total-value');
    
    if (label && value) {
        if (isDark) {
            label.style.color = '#ffffff';
            value.style.color = '#ffffff';
        } else {
            label.style.color = '#374151';
            value.style.color = '#059669';
        }
    }
}

// Chamar a função após criar os elementos
// updateMobileColors(); // Removido para evitar chamada desnecessária

// Header fixo simples com efeito de scroll
function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    
    if (!header) {
        return;
    }
    
    // Adicionar/remover classe scrolled baseado na posição do scroll
    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
    
    // Event listener para scroll
    window.addEventListener('scroll', handleScroll);
    
    // Inicializar estado
    handleScroll();
}

// Adicionar após a função initChart
let resizeTimeout;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        if (typeof initChart === 'function') {
            initChart();
        }
    }, 250); // Debounce de 250ms
});

