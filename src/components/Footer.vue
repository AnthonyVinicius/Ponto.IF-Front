<template>
    <footer class="footer">
        <div class="container">
            <div class="footer-grid">
                <div>
                        <img class="h-auto w-auto" src="../img/ponto_if.png"
                            alt="Logo Ponto.IF" />
                </div>

                <div>
                    <h4 class="footer-subtitle">Navegação</h4>
                    <ul class="footer-list">
                        <li v-for="link in quickLinks" :key="link.name">
                            <a :href="link.href" class="footer-link">
                                <span class="footer-link-bar"></span>
                                {{ link.name }}
                            </a>
                        </li>
                    </ul>
                </div>

                <div>
                    <h4 class="footer-subtitle">Contato</h4>
                    <div class="footer-contact">
                        <p>Av. José Pretestato de Santana - Palmares, PE, 55540-000</p>
                    </div>
                </div>

                <div>
                    <h4 class="footer-subtitle">Siga-nos</h4>
                    <div class="footer-social">
                        <a v-for="social in socialLinks" :key="social.name" :href="social.href" target="_blank"
                            rel="noopener noreferrer" class="footer-social-link">
                            <span class="sr-only">{{ social.name }}</span>
                            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" v-html="social.iconPath"></svg>
                        </a>
                    </div>
                </div>
            </div>

            <div class="footer-bottom">
                <p>&copy; {{ currentYear }} Ponto.IF - IFPE Campus Palmares. Todos os direitos reservados.</p>
            </div>
        </div>
    </footer>
</template>

<script setup>
import { ref } from 'vue'

const currentYear = ref(new Date().getFullYear())

const quickLinks = [
    { name: 'Início', href: '#' },
    { name: 'Dashboard', href: '#' },
    { name: 'Suporte', href: '#' },
    { name: 'Política de Privacidade', href: '#' }
]

const socialLinks = [
    {
        name: 'Facebook',
        href: '#',
        iconPath: '<path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v7.005A9.953 9.953 0 0022 12z"></path>'
    },
    {
        name: 'Instagram',
        href: '#',
        iconPath: '<path fill-rule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7a5 5 0 100 10 5 5 0 000-10zm0 8a3 3 0 110-6 3 3 0 010 6zm6.406-11.845a1.25 1.25 0 100 2.5 1.25 1.25 0 000-2.5z" clip-rule="evenodd"></path>'
    },
    {
        name: 'Twitter',
        href: '#',
        iconPath: '<path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.223.085 4.93 4.93 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path>'
    }
]
</script>

<style scoped>
footer.footer {
    background-color: #ffffff;
    color: #374151;
    backdrop-filter: blur(6px);
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 3rem 1.5rem;
}

footer .container {
    max-width: 1280px;
    margin: 0 auto;
}

footer .footer-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 3rem;
}

@media (min-width: 768px) {
    footer .footer-grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 1024px) {
    footer .footer-grid {
        grid-template-columns: repeat(4, 1fr);
    }
}

footer .footer-desc {
    color: #4b5563;
    line-height: 1.6;
}

footer .footer-subtitle {
    font-weight: 600;
    text-transform: uppercase;
    margin-bottom: 1.25rem;
    color: #1C5E27;
    letter-spacing: 0.05em;
}

footer .footer-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

footer .footer-link {
    display: flex;
    align-items: center;
    color: #374151;
    text-decoration: none;
    transition: color 0.3s ease;
}

footer .footer-link:hover {
    color: #1C5E27;
}

footer .footer-link-bar {
    height: 2px;
    width: 0.75rem;
    background-color: #9ca3af;
    margin-right: 0.75rem;
    transition: all 0.3s ease-in-out;
}

footer .footer-link:hover .footer-link-bar {
    width: 1.5rem;
    background-color: #1C5E27;
}

footer .footer-contact p {
    color: #4b5563;
    margin-bottom: 0.5rem;
}

footer .footer-social {
    display: flex;
    gap: 0.75rem;
}

footer .footer-social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.625rem;
    border-radius: 9999px;
    background-color: rgba(17, 24, 39, 0.05);
    color: #374151;
    transition: all 0.3s ease;
}

footer .footer-social-link:hover {
    transform: translateY(-3px);
    background-color: rgba(28, 94, 39, 0.15);
    color: #1C5E27;
}

footer .footer-bottom {
    border-top: 1px solid rgba(229, 231, 235, 0.3);
    margin-top: 3rem;
    padding-top: 1.5rem;
    text-align: center;
    color: #6b7280;
    font-size: 0.875rem;
}
</style>
