// NaxelTech - Main Script
// Refined for professional corporate identity

let calculatorData = {
    setupTotal: 0,
    monthlyTotal: 0,
    services: [],
    employeeMultiplier: 1,
    complexityMultiplier: 1
};

function initializeApp() {
    console.log('🚀 NaxelTech Initialized');
    initHeaderScrollEffect();
    initCalculator();
    initChart();
    initContactForm();
    initMobileMenu();
}

function initMobileMenu() {
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if (!btn || !menu) return;
    
    btn.addEventListener('click', () => {
        menu.classList.toggle('hidden');
    });
    
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => menu.classList.add('hidden'));
    });
}

function initHeaderScrollEffect() {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            header.classList.add('bg-white/95', 'shadow-sm');
            header.classList.remove('bg-white/80');
        } else {
            header.classList.remove('bg-white/95', 'shadow-sm');
            header.classList.add('bg-white/80');
        }
    });
}

function initCalculator() {
    const form = document.getElementById('calculator-form');
    if (!form) return;

    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', updateCalculation);
    });
    updateCalculation();
}

function updateCalculation() {
    calculatorData.setupTotal = 0;
    calculatorData.monthlyTotal = 0;
    calculatorData.services = [];

    const empInput = document.querySelector('input[name="employees"]:checked');
    calculatorData.employeeMultiplier = empInput ? parseFloat(empInput.dataset.multiplier) : 1;

    const actInput = document.querySelector('input[name="activity"]:checked');
    calculatorData.complexityMultiplier = actInput ? parseFloat(actInput.dataset.complexity) : 1;

    document.querySelectorAll('input[name="services"]:checked').forEach(input => {
        const basePrice = parseFloat(input.dataset.price);
        const isMonthly = input.value === 'suporte';
        const labelElement = input.closest('label').querySelector('.option-content span');
        const label = labelElement ? labelElement.textContent : input.value;
        
        let multiplier = calculatorData.employeeMultiplier;
        if (input.value === 'analise') multiplier = 1 + (multiplier - 1) * 0.3;

        const adjustedPrice = basePrice * multiplier * calculatorData.complexityMultiplier;

        if (isMonthly) calculatorData.monthlyTotal += adjustedPrice;
        else calculatorData.setupTotal += adjustedPrice;

        calculatorData.services.push({ label, adjustedPrice, isMonthly });
    });

    updateResultDisplay();
}

function updateResultDisplay() {
    const breakdown = document.getElementById('result-breakdown');
    const total = document.getElementById('result-total');
    if (!breakdown || !total) return;

    if (calculatorData.services.length === 0) {
        breakdown.innerHTML = '<p class="text-[10px] text-slate-500 uppercase font-extrabold tracking-widest leading-loose">Selecione os serviços para gerar a estimativa técnica.</p>';
        total.classList.add('hidden');
        return;
    }

    let html = '<div class="space-y-6">';
    const setup = calculatorData.services.filter(s => !s.isMonthly);
    const monthly = calculatorData.services.filter(s => s.isMonthly);

    if (setup.length > 0) {
        html += '<div><div class="text-[9px] font-black uppercase text-slate-900 tracking-[0.2em] mb-3">Setup Inicial</div>';
        setup.forEach(s => {
            html += `<div class="flex justify-between items-center py-2 border-b border-slate-50">
                <span class="text-[10px] font-extrabold uppercase tracking-tight text-slate-700">${s.label}</span>
                <span class="text-[11px] font-black text-slate-900">R$ ${s.adjustedPrice.toLocaleString('pt-BR')}</span>
            </div>`;
        });
        html += '</div>';
    }

    if (monthly.length > 0) {
        html += '<div><div class="text-[9px] font-black uppercase text-blue-600 tracking-[0.2em] mb-3">Suporte Mensal</div>';
        monthly.forEach(s => {
            html += `<div class="flex justify-between items-center py-2 border-b border-slate-50">
                <span class="text-[10px] font-extrabold uppercase tracking-tight text-slate-700">${s.label}</span>
                <span class="text-[11px] font-black text-blue-600">R$ ${s.adjustedPrice.toLocaleString('pt-BR')}</span>
            </div>`;
        });
        html += '</div>';
    }
    html += '</div>';
    breakdown.innerHTML = html;

    let totalHtml = '<div class="space-y-4">';
    if (calculatorData.setupTotal > 0) {
        totalHtml += `<div class="flex justify-between items-end"><span class="text-[10px] font-black uppercase text-slate-900 tracking-widest">Investimento Total</span><span class="text-3xl font-black tracking-tighter text-slate-900">R$ ${calculatorData.setupTotal.toLocaleString('pt-BR')}</span></div>`;
    }
    if (calculatorData.monthlyTotal > 0) {
        totalHtml += `<div class="flex justify-between items-end"><span class="text-[10px] font-black uppercase text-blue-600 tracking-widest">Mensalidade</span><span class="text-3xl font-black tracking-tighter text-blue-600">R$ ${calculatorData.monthlyTotal.toLocaleString('pt-BR')}</span></div>`;
    }
    totalHtml += '</div>';
    
    total.innerHTML = totalHtml;
    total.classList.remove('hidden');
}

function sendQuote() {
    if (calculatorData.services.length === 0) {
        alert('Selecione os serviços desejados.');
        return;
    }
    const emp = document.querySelector('input[name="employees"]:checked')?.value || 'N/A';
    const act = document.querySelector('input[name="activity"]:checked')?.value || 'N/A';
    let msg = `SOLICITAÇÃO DE PROPOSTA - NAXELTECH\n\nTIME: ${emp}\nSETOR: ${act}\n\nSERVIÇOS:\n`;
    calculatorData.services.forEach(s => msg += `- ${s.label.toUpperCase()}\n`);
    msg += `\nINVESTIMENTO: R$ ${calculatorData.setupTotal.toLocaleString('pt-BR')}\nMENSALIDADE: R$ ${calculatorData.monthlyTotal.toLocaleString('pt-BR')}`;
    window.open(`https://wa.me/5571920043913?text=${encodeURIComponent(msg)}`, '_blank');
}

function resetCalculator() {
    const form = document.getElementById('calculator-form');
    if (form) {
        form.reset();
        updateCalculation();
    }
}

function initChart() {
    const ctx = document.getElementById('challenges-chart');
    if (!ctx || typeof Chart === 'undefined') return;

    if (window.challengesChart) window.challengesChart.destroy();

    window.challengesChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['HARDWARE', 'CONECTIVIDADE', 'SEGURANÇA', 'BACKUP', 'ESCALABILIDADE'],
            datasets: [{
                data: [85, 75, 95, 80, 85],
                backgroundColor: '#3b82f6',
                hoverBackgroundColor: '#60a5fa',
                barThickness: 12,
                borderRadius: 2
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: '#1e293b',
                    titleFont: { size: 11, family: 'Inter', weight: 'bold' },
                    bodyFont: { size: 11, family: 'Inter' },
                    padding: 12,
                    displayColors: false,
                    callbacks: {
                        label: function(context) {
                            return `Impacto: ${context.raw}%`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    max: 100,
                    grid: { color: 'rgba(255, 255, 255, 0.05)', drawBorder: false },
                    ticks: {
                        font: { size: 10, weight: 'bold', family: 'Inter' },
                        color: '#94a3b8',
                        stepSize: 25
                    }
                },
                y: {
                    grid: { display: false, drawBorder: false },
                    ticks: {
                        font: { size: 10, weight: '800', family: 'Inter' },
                        color: '#ffffff'
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const btn = form.querySelector('button');
        btn.textContent = 'ENVIANDO...';
        btn.disabled = true;
        
        const data = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject')?.value || 'CONTATO GERAL',
            message: document.getElementById('message').value
        };

        try {
            const res = await fetch('https://formspree.io/f/xrbkknvl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    _subject: `NOVO CONTATO: ${data.subject.toUpperCase()}`
                })
            });
            if (res.ok) {
                alert('MENSAGEM ENVIADA!');
                form.reset();
            }
        } catch (err) {
            alert('ERRO AO ENVIAR.');
        } finally {
            btn.textContent = 'ENVIAR MENSAGEM';
            btn.disabled = false;
        }
    });
}

document.addEventListener('DOMContentLoaded', initializeApp);
