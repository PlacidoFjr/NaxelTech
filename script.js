const NAXEL_WHATSAPP = '5571920043913';

function initMobileMenu() {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if (!button || !menu) return;

    const closeMenu = () => {
        menu.classList.add('hidden');
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-label', 'Abrir menu');
    };

    button.addEventListener('click', () => {
        const willOpen = menu.classList.contains('hidden');
        menu.classList.toggle('hidden');
        button.setAttribute('aria-expanded', String(willOpen));
        button.setAttribute('aria-label', willOpen ? 'Fechar menu' : 'Abrir menu');
    });
    menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));
}

function initHeader() {
    const header = document.getElementById('site-header');
    if (!header) return;
    const update = () => header.classList.toggle('is-scrolled', window.scrollY > 16);
    update();
    window.addEventListener('scroll', update, { passive: true });
}

function initDiagnosticForm() {
    const form = document.getElementById('diagnostic-form');
    const feedback = document.getElementById('diagnostic-feedback');
    if (!form || !feedback) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const services = data.getAll('service');
        if (!services.length) {
            feedback.textContent = 'Selecione pelo menos uma área para iniciar a conversa.';
            feedback.className = 'form-feedback is-error';
            form.querySelector('input[name="service"]')?.focus();
            return;
        }

        feedback.textContent = '';
        feedback.className = 'form-feedback';
        const company = String(data.get('company') || '').trim() || 'Não informado';
        const priority = String(data.get('priority') || 'Quero planejar');
        const need = String(data.get('need') || '').trim() || 'Prefiro explicar durante a conversa.';
        const message = [
            'Olá, NaxelTech! Gostaria de solicitar um diagnóstico.',
            '',
            `Empresa: ${company}`,
            `Interesse: ${services.join(', ')}`,
            `Prioridade: ${priority}`,
            `Necessidade: ${need}`
        ].join('\n');
        window.open(`https://wa.me/${NAXEL_WHATSAPP}?text=${encodeURIComponent(message)}`, '_blank', 'noopener');
    });

    form.querySelectorAll('input[name="service"]').forEach((input) => input.addEventListener('change', () => {
        feedback.textContent = '';
        feedback.className = 'form-feedback';
    }));
}

function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('contact-feedback');
    if (!form || !feedback) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const button = form.querySelector('button[type="submit"]');
        const data = Object.fromEntries(new FormData(form).entries());
        button.disabled = true;
        button.textContent = 'Enviando...';
        feedback.textContent = '';
        feedback.className = 'form-feedback';

        try {
            const response = await fetch('https://formspree.io/f/xrbkknvl', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
                body: JSON.stringify({ ...data, _subject: `Novo contato NaxelTech: ${data.subject}` })
            });
            if (!response.ok) throw new Error('Falha no envio');
            form.reset();
            feedback.textContent = 'Mensagem enviada. Em breve entraremos em contato.';
            feedback.classList.add('is-success');
        } catch (error) {
            feedback.innerHTML = `Não foi possível enviar agora. Fale conosco pelo <a href="https://wa.me/${NAXEL_WHATSAPP}" target="_blank" rel="noopener">WhatsApp</a>.`;
            feedback.classList.add('is-error');
        } finally {
            button.disabled = false;
            button.textContent = 'Enviar mensagem';
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initHeader();
    initDiagnosticForm();
    initContactForm();
});
