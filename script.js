// Hamburger Menu Toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
    });
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            }
        }
    });
});

// Contact Form Submission
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const subject = this.querySelectorAll('input[type="text"]')[1].value;
        const message = this.querySelector('textarea').value;
        
        // Basic validation
        if (name && email && subject && message) {
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
        } else {
            alert('Please fill out all fields.');
        }
    });
}

// CTA Button Click Handler
const ctaButtons = document.querySelectorAll('.cta-button');
ctaButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        if (this.textContent.includes('Get Started')) {
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Add animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'slideIn 0.6s ease-out forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .portfolio-item').forEach(el => {
    observer.observe(el);
});

// Mobile Responsive Menu
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navLinks.style.display = 'flex';
    } else {
        navLinks.style.display = 'none';
    }
});

// Add scroll effect to navbar
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

console.log('OriginTech Website Loaded Successfully');

// AI Chat Widget
const chatToggle = document.getElementById('chatToggle');
const chatBox = document.getElementById('chatBox');
const closeChat = document.getElementById('closeChat');
const sendChat = document.getElementById('sendChat');
const chatInput = document.getElementById('chatInput');
const chatMessages = document.getElementById('chatMessages');

// AI Response Database
const aiResponses = {
    'services': 'We offer App Development, Web Development, Software Management, Computer Updates, IT Consulting, and Cloud Solutions. Which service interests you?',
    'app development': 'Our App Development team creates custom mobile and desktop applications using cutting-edge technology. We handle everything from concept to deployment.',
    'web development': 'We build responsive, scalable, and SEO-optimized websites that convert visitors into customers. All our websites are mobile-friendly.',
    'software management': 'We provide complete software lifecycle management including updates, maintenance, and optimization to keep your systems running smoothly.',
    'computer updates': 'We offer system optimization, security updates, and performance enhancement for your devices to ensure peak efficiency.',
    'pricing': 'Our pricing varies based on project complexity and requirements. Please contact us for a custom quote or visit our contact section.',
    'contact': 'You can reach us at info@origintech.com or +1 (555) 123-4567. Our office is located at 123 Tech Street, Innovation City.',
    'team': 'OriginTech has 50+ expert team members with diverse skills in various technologies and programming languages.',
    'projects': 'We\'ve completed 500+ projects for 200+ happy clients. Check our Portfolio section to see some of our latest work!',
    'cloud': 'Our Cloud Solutions include secure infrastructure, migration services, and comprehensive management for your business needs.',
    'consulting': 'Our IT Consulting services provide strategic technology guidance to transform your business and increase operational efficiency.',
    'about': 'OriginTech is a leading technology company dedicated to delivering innovative solutions. We\'ve been in business for over a decade.',
    'hello': 'Hello! Welcome to OriginTech. How can I assist you today?',
    'hi': 'Hi there! 👋 What can I help you with? Feel free to ask about our services!',
    'help': 'I can help you with information about our services, pricing, team, and more. Just ask away!',
    'thanks': 'You\'re welcome! 😊 Is there anything else I can help you with?',
    'thank you': 'Happy to help! Feel free to ask if you have more questions.',
    'default': 'That\'s a great question! I can help with information about our services, pricing, team, and more. Feel free to ask!'
};

// Toggle Chat Box
chatToggle.addEventListener('click', () => {
    chatBox.classList.toggle('hidden');
});

closeChat.addEventListener('click', () => {
    chatBox.classList.add('hidden');
});

// Send Message
function sendMessage() {
    const message = chatInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, 'user');
    chatInput.value = '';

    // Get AI response
    setTimeout(() => {
        const response = getAIResponse(message);
        addMessage(response, 'bot');
    }, 300);
}

// Add Message to Chat
function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender === 'user' ? 'user-message' : 'bot-message'}`;
    messageDiv.innerHTML = `<p>${escapeHtml(text)}</p>`;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get AI Response
function getAIResponse(userInput) {
    const input = userInput.toLowerCase();
    
    for (const [key, value] of Object.entries(aiResponses)) {
        if (input.includes(key)) {
            return value;
        }
    }
    
    return aiResponses['default'];
}

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

// Send on button click
sendChat.addEventListener('click', sendMessage);

// Send on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Focus input when chat opens
chatToggle.addEventListener('click', () => {
    if (!chatBox.classList.contains('hidden')) {
        setTimeout(() => chatInput.focus(), 200);
    }
});
