// Funções da calculadora de orçamento
function updateMobileColors() {
    setTimeout(() => {
        const isDark = document.body.classList.contains('dark');
        const label = document.getElementById('mobile-total-label');
        const value = document.getElementById('mobile-total-value');
        
        // Verificação de segurança
        if (!label || !value) {
            console.warn('⚠️ Elementos mobile da calculadora não encontrados');
            return;
        }
        
        if (isDark) {
            label.style.color = '#e2e8f0';
            value.style.color = '#60a5fa';
        } else {
            label.style.color = '#475569';
            value.style.color = '#2563eb';
        }
    }, 150);
}

// Função para inicializar calculadora mobile
// Remover completamente a função updateMobileColors
// Manter apenas as funções da calculadora

function initMobileCalculator() {
    // Verificar se já foi inicializada
    if (document.querySelector('.mobile-investment-estimate')) {
        return;
    }
    
    createMobileCalculatorElements();
    
    const form = document.getElementById('calculator-form');
    if (!form) return;
    
    const allInputs = form.querySelectorAll('input[type="radio"], input[type="checkbox"]');
    
    allInputs.forEach(function(input) {
        input.addEventListener('change', function() {
            updateMobileCalculatorDisplay();
        });
    });
    
    updateMobileCalculatorDisplay();
}

function createMobileCalculatorElements() {
    const resultContainer = document.querySelector('.result-container');
    if (!resultContainer || document.querySelector('.mobile-investment-estimate')) {
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
        <span class="estimate-icon">💰</span>
        <h3>Estimativa de Investimento</h3>
        <p class="estimate-text">Selecione as opções acima para ver a estimativa</p>
    `;
    
    // Criar container de resultado que aparece após seleções
    const resultDisplay = document.createElement('div');
    resultDisplay.className = 'mobile-result-display';
    resultDisplay.innerHTML = `
        <div class="mobile-result-header">
            <h4>📊 Detalhamento dos Serviços</h4>
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
        <button type="button" class="btn-contact" onclick="sendQuote()">📞 Solicitar Orçamento Detalhado</button>
        <button type="button" class="btn-secondary" onclick="resetCalculator()">🔄 Recalcular</button>
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

// Função para atualizar display da calculadora mobile
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
        
    
        function updateCalculatorDisplay() {
            if (totalLabel) {
                totalLabel.style.color = '#374151';
                totalValueElement.style.color = '#059669';
                totalValueElement.style.fontSize = '1.25rem';
                totalValueElement.style.fontWeight = 'bold';
            }
            
            console.log('✅ Display mobile atualizado com total:', total);
        }
        
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

function sendQuote() {
    console.log('📱 Enviando orçamento mobile...');
    
    // Verificar se há dados para enviar
    const employeesSelected = document.querySelector('input[name="employees"]:checked');
    const activitySelected = document.querySelector('input[name="activity"]:checked');
    const servicesSelected = document.querySelectorAll('input[name="services"]:checked');
    
    if (!employeesSelected || !activitySelected || servicesSelected.length === 0) {
        alert('Por favor, selecione todas as opções antes de solicitar o orçamento.');
        return;
    }
    
    // Usar a implementação do script.js principal se existir
    if (typeof window.sendQuote === 'function' && window.sendQuote !== sendQuote) {
        window.sendQuote();
        return;
    }
    
    // Implementação básica caso não exista
    const activity = activitySelected.value;
    const employees = employeesSelected.value;
    
    let message = `Olá! Gostaria de solicitar um orçamento detalhado para consultoria de TI.\n\n`;
    message += `👥 Número de funcionários: ${employees}\n`;
    message += `🏢 Atividade: ${activity}\n\n`;
    message += `🛠️ Serviços de interesse:\n`;
    
    servicesSelected.forEach(service => {
        const label = service.closest('.checkbox-option').querySelector('strong').textContent;
        message += `• ${label}\n`;
    });
    
    message += `\nAguardo retorno para mais detalhes. Obrigado!`;
    
    const whatsappUrl = `https://wa.me/5571999195766?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Escutar redimensionamento da janela
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        initMobileCalculator();
    }
});

// Remover funções duplicadas que já existem em script.js
