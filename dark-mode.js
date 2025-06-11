function toggleDarkMode() {
    const html = document.documentElement;
    const body = document.body;
    
    html.classList.toggle('dark');
    body.classList.toggle('dark');
    
    const isDark = html.classList.contains('dark');
    localStorage.setItem('darkMode', isDark.toString());
    
    console.log('Modo escuro ativado:', isDark);
    
    // Forçar atualização dos estilos da calculadora
    setTimeout(() => {
        const totalElements = document.querySelectorAll('.total-value, .mobile-total-value, .total-label, .mobile-total-label');
        totalElements.forEach(el => {
            if (isDark) {
                el.style.color = '#ffffff';
            } else {
                el.style.color = '';
            }
        });
    }, 50);
    
    // Recriar gráfico quando o modo escuro mudar
    try {
        if (typeof initChart === 'function') {
            setTimeout(() => {
                initChart();
            }, 100);
        }
    } catch (error) {
        console.log('Erro ao recriar gráfico:', error);
    }
}

function initDarkMode() {
    console.log('🌙 Inicializando modo escuro...');
    
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');
    const html = document.documentElement;
    const body = document.body;
    
    if (!darkModeToggle && !darkModeToggleMobile) {
        console.error('❌ Botões de modo escuro não encontrados!');
        return;
    }
    
    console.log('✅ Botão encontrado:', darkModeToggle);
    
    // Verificar preferência do sistema primeiro
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    console.log('🎨 Preferência do sistema (dark):', prefersDarkMode);
    
    // Verificar se há uma preferência salva no localStorage
    const savedDarkMode = localStorage.getItem('darkMode');
    console.log('💾 Preferência salva:', savedDarkMode);
    
    // Aplicar modo escuro baseado na preferência salva ou na preferência do sistema
    if (savedDarkMode === 'true' || (savedDarkMode === null && prefersDarkMode)) {
        html.classList.add('dark');
        body.classList.add('dark');
        console.log('🌙 Aplicando modo escuro');
    } else {
        html.classList.remove('dark');
        body.classList.remove('dark');
        console.log('☀️ Aplicando modo claro');
    }
    
    // Event listener melhorado
    const handleToggle = function(e) {
        e.preventDefault();
        e.stopPropagation();
        toggleDarkMode();
    };
    
    // Adicionar listeners para ambos os botões
    if (darkModeToggle) {
        darkModeToggle.removeEventListener('click', handleToggle);
        darkModeToggle.addEventListener('click', handleToggle);
    }
    
    if (darkModeToggleMobile) {
        darkModeToggleMobile.removeEventListener('click', handleToggle);
        darkModeToggleMobile.addEventListener('click', handleToggle);
    }
    
    console.log('✅ Modo escuro inicializado com sucesso!');
}

// Inicializar quando DOM estiver pronto
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initDarkMode);
} else {
    initDarkMode();
}