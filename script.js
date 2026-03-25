// Конфигурация Telegram
const BOT_TOKEN = '8639063135:AAFHQL-NngOyorKpQZR6y--zTa1BEbPKsDg';
const CHAT_ID = '1200608860';

// Бургер меню
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
    nav.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});
// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// Таймер до 7 апреля
function updateTimer() {
    const targetDate = new Date('April 7, 2026 18:00:00').getTime();
    const now = new Date().getTime();
    const diff = targetDate - now;

    if (diff > 0) {
        document.getElementById('days').innerText = Math.floor(diff / (1000 * 60 * 60 * 24));
        document.getElementById('hours').innerText = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        document.getElementById('minutes').innerText = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    }
}
setInterval(updateTimer, 1000);

// Анимация при скролле
const observerOptions = { threshold: 0.2 };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-up, .animate-left, .animate-right').forEach(el => observer.observe(el));

// Отправка формы и нумерация заявок
let requestCount = localStorage.getItem('req_count') || 0;

document.getElementById('tg-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const group = document.getElementById('group').value;
    const status = document.getElementById('status-msg');
    
    requestCount++;
    localStorage.setItem('req_count', requestCount);

    const message = `🔥 Новая заявка №${requestCount}\n👤 ФИО: ${name}\n👤 Отряд: ${group}\n📅 Дата: ${new Date().toLocaleString()}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text: message })
        });

        if (response.ok) {
            status.innerHTML = `<p style="color: green; margin-top:10px;">Заявка отправлена! Ждем вас!</p>`;
            this.reset();
        } else {
            throw new Error();
        }
    } catch {
        status.innerHTML = `<p style="color: red; margin-top:10px;">Ошибка. Проверьте соединение.</p>`;
    }
});
