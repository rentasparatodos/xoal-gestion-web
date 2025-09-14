
import { firebaseConfig } from './config.js';
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

class MainHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    // Smooth scroll for navigation
    this._handleNavClick = (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
  }

  connectedCallback() {
    this.render();
    this.shadowRoot.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', this._handleNavClick);
    });
  }

  disconnectedCallback() {
    this.shadowRoot.querySelectorAll('nav a').forEach(link => {
        link.removeEventListener('click', this._handleNavClick);
    });
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          background-color: oklch(20% 0.024 243.53 / 0.5);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid oklch(30% 0.024 243.53);
          box-shadow: var(--shadow-md, 0 4px 6px -1px rgb(0 0 0 / 0.1));
        }

        .logo img {
            height: 60px; /* Adjust height as needed */
            width: auto;
        }

        nav {
          display: flex;
          gap: 1.5rem;
        }

        nav a {
          color: var(--color-text, #fff);
          text-decoration: none;
          font-weight: 400;
          position: relative;
          transition: color 0.3s ease;
        }

        nav a:hover {
            color: var(--color-accent, #00e0e0);
        }

        nav a::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 2px;
            bottom: -5px;
            left: 0;
            background-color: var(--color-accent, #00e0e0);
            transform: scaleX(0);
            transform-origin: bottom right;
            transition: transform 0.3s ease-out;
        }

        nav a:hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
        }

        /* Mobile Styles */
        @media (max-width: 768px) {
            header {
                flex-direction: column;
                gap: 1rem;
            }
        }
      </style>

      <header>
        <a href="#" class="logo">
            <img src="Logo Cartel Xoal.png" alt="Xoal Gestión SL Logo">
        </a>
        <nav>
          <a href="#servicios">Servicios</a>
          <a href="#sobre-nosotros">Sobre Nosotros</a>
          <a href="#contacto">Contacto</a>
        </nav>
      </header>
    `;
  }
}
customElements.define('main-header', MainHeader);

class ServiceCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const icon = this.getAttribute('icon') || '';
        const title = this.getAttribute('title') || 'Servicio';
        const description = this.getAttribute('description') || 'Descripción del servicio.';

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    container-type: inline-size;
                }

                .card {
                    background-color: var(--color-surface, #1e1e1e);
                    border-radius: 12px;
                    padding: 2rem;
                    text-align: left;
                    border: 1px solid transparent;
                    transition: border 0.3s ease, transform 0.3s ease;
                    box-shadow: var(--shadow-lg, 0 10px 15px -3px rgb(0 0 0 / 0.2));
                    transform: translateY(0);
                }

                .card:hover {
                    transform: translateY(-5px);
                    border-color: var(--color-accent, #00e0e0);
                }

                .icon {
                    margin-bottom: 1.5rem;
                    color: var(--color-accent, #00e0e0);
                }

                .icon svg {
                    width: 48px;
                    height: 48px;
                }

                h3 {
                    font-size: 1.5rem;
                    margin-bottom: 0.5rem;
                    color: var(--color-text, #fff);
                }

                p {
                    color: oklch(80% 0 0);
                    font-size: 1rem;
                }
            </style>

            <div class="card">
                <div class="icon">${icon}</div>
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        `;
    }
}
customElements.define('service-card', ServiceCard);

document.addEventListener('DOMContentLoaded', () => {
    const animatedItems = document.querySelectorAll('.animated-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedItems.forEach(item => {
        observer.observe(item);
    });

    // Contact Form Submission
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const mensaje = document.getElementById('mensaje').value;

        try {
            await addDoc(collection(db, 'contact-form'), {
                nombre: nombre,
                email: email,
                mensaje: mensaje,
                timestamp: serverTimestamp()
            });
            alert('¡Gracias por tu mensaje! Te contactaremos pronto.');
            contactForm.reset();
        } catch (error) {
            console.error("Error al enviar el mensaje: ", error);
            alert('Hubo un error al enviar tu mensaje. Por favor, inténtalo de nuevo.');
        }
    });
});
