# Portfólio - Ivo Braatz

Portfólio pessoal profissional, monocromático e minimalista para desenvolvedor de software.

## 🚀 Tecnologias

- **Next.js 14** - Framework React para produção
- **TypeScript** - Tipagem estática
- **CSS Modules** - Estilização modular e isolada
- **React Hooks** - Gerenciamento de estado
- **Canvas API** - Efeitos de partículas
- **Intersection Observer** - Animações on scroll

## ✨ Características

- ✅ Design monocromático profissional (preto, branco, cinzas)
- ✅ Arquitetura escalável e organizada
- ✅ Animações sofisticadas (typing effect, scroll reveal, particles)
- ✅ Efeitos visuais modernos sem cores vibrantes
- ✅ Totalmente responsivo (Mobile, Tablet, Desktop)
- ✅ CSS puro (sem Tailwind ou Bootstrap)
- ✅ Performance otimizada
- ✅ SEO friendly
- ✅ Componentes reutilizáveis

## 📁 Estrutura do Projeto

```
portifolio/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Layout principal
│   └── page.tsx                 # Página home
├── src/
│   ├── components/
│   │   ├── layout/              # Componentes de layout
│   │   │   ├── Header.tsx
│   │   │   └── Footer.tsx
│   │   ├── sections/            # Seções da página
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── Experience.tsx
│   │   │   ├── Skills.tsx
│   │   │   ├── Projects.tsx
│   │   │   └── Contact.tsx
│   │   └── ui/                  # Componentes UI reutilizáveis
│   │       ├── ParticleBackground.tsx
│   │       ├── ScrollReveal.tsx
│   │       └── TypingEffect.tsx
│   ├── constants/               # Constantes e dados
│   │   └── data.ts
│   ├── types/                   # TypeScript types
│   │   └── index.ts
│   ├── styles/                  # Estilos globais
│   │   └── globals.css
│   └── lib/                     # Utilitários
└── public/                      # Assets estáticos
```

## 📦 Instalação

```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 🎨 Seções

- **Hero** - Apresentação com código animado e typing effect
- **About** - Informações pessoais e destaques
- **Experience** - Timeline de experiência profissional
- **Skills** - Habilidades técnicas organizadas por categoria
- **Projects** - Portfólio de projetos destacados
- **Contato** - Formulário e links sociais
- **Footer** - Rodapé com navegação

## 🎨 Customização

### Dados Pessoais
Edite `src/constants/data.ts`:
```typescript
export const PERSONAL_INFO = {
  name: 'Seu Nome',
  title: 'Seu Título',
  email: 'seu@email.com',
  // ...
}
```

### Cores e Estilos
Edite `src/styles/globals.css`:
```css
:root {
  --color-bg-primary: #000000;
  --color-bg-secondary: #0a0a0a;
  --color-text-primary: #ffffff;
  /* ... */
}
```

## 🌐 Deploy

O projeto está pronto para deploy em:
- **Vercel** (Recomendado)
- Netlify
- AWS Amplify
- Cloudflare Pages

## 📱 Responsividade

Breakpoints:
- Mobile: < 480px
- Tablet: 480px - 768px
- Desktop: 768px - 1024px
- Large: > 1024px

## ⚡ Performance

- Componentes otimizados
- Lazy loading de seções
- Animações GPU-accelerated
- CSS Modules para tree-shaking

## 📄 Licença

Este projeto está sob a licença MIT.

---

Desenvolvido com dedicação por Ivo Braatz
