# 🚀 Portfólio Profissional - Desenvolvedor Full-Stack

Um portfólio moderno e interativo desenvolvido com Next.js, TypeScript e animações avançadas. Design minimalista e profissional com foco em performance e experiência do usuário.

## ✨ Características

### 🎨 Design & UX
- **Design Minimalista**: Interface limpa e profissional
- **Modo Escuro**: Tema escuro por padrão com transições suaves
- **Responsivo**: Otimizado para todos os dispositivos
- **Animações Avançadas**: GSAP, Framer Motion e ScrollTrigger
- **Cursor Personalizado**: Cursor animado com efeitos interativos

### 🛠️ Tecnologias
- **Next.js 14** com App Router
- **TypeScript** para tipagem segura
- **Framer Motion** para animações
- **GSAP + ScrollTrigger** para animações baseadas em scroll
- **Lenis** para scroll suave
- **Lucide Icons** para ícones modernos
- **Poppins** como fonte principal

### 🎯 Funcionalidades
- **Seção Hero**: Apresentação animada com texto morphing
- **Estatísticas**: Contadores animados com números reais
- **Sobre**: Biografia com destaques da carreira
- **Projetos**: Cards interativos com filtros por categoria
- **Skills**: Barras de progresso animadas
- **Experiência**: Timeline profissional
- **Contato**: Formulário funcional com redes sociais

## 🚀 Como Executar

### Pré-requisitos
- Node.js 18+ 
- npm ou yarn

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/portifolio.git
cd portifolio

# Instale as dependências
npm install

# Execute em modo desenvolvimento
npm run dev
```

### Build para Produção
```bash
# Build otimizado
npm run build

# Preview da build
npm run start
```

## 📁 Estrutura do Projeto

```
src/
├── app/
│   ├── globals.css          # Estilos globais e variáveis CSS
│   ├── layout.tsx           # Layout principal
│   └── page.tsx             # Página principal
├── components/
│   ├── AnimatedBackground.tsx   # Background animado com partículas
│   ├── AnimatedButton.tsx       # Botões com animações
│   ├── AnimatedCounter.tsx      # Contadores animados
│   ├── AnimatedTitle.tsx        # Títulos com animação letra por letra
│   ├── CustomCursor.tsx         # Cursor personalizado
│   ├── Footer.tsx               # Rodapé
│   ├── Header.tsx               # Header fixo
│   ├── MorphingText.tsx         # Texto que muda (morphing)
│   ├── ParticleSystem.tsx       # Sistema de partículas
│   ├── ProjectCard.tsx          # Cards de projeto
│   ├── ProjectFilters.tsx       # Filtros de projetos
│   └── ScrollParallax.tsx       # Efeito parallax
└── lib/
    └── gsap.ts              # Configuração GSAP
```

## 🎨 Personalização

### Cores
As cores são definidas como variáveis CSS em `src/app/globals.css`:

```css
:root {
  --primary: #00cfff;      /* Azul ciano */
  --secondary: #ff6b9d;    /* Rosa */
  --accent: #6366f1;       /* Violeta */
  --background: #ffffff;   /* Fundo claro */
  --foreground: #0a0a0a;   /* Texto escuro */
}
```

### Conteúdo
Edite os dados em `src/app/page.tsx`:
- Informações pessoais
- Projetos
- Skills
- Experiência profissional
- Contatos

### Animações
- **GSAP**: Configurado em `src/lib/gsap.ts`
- **Framer Motion**: Usado nos componentes
- **ScrollTrigger**: Para animações baseadas em scroll

## 📱 Responsividade

O projeto é totalmente responsivo com breakpoints:
- **Desktop**: > 1024px
- **Tablet**: 768px - 1024px  
- **Mobile**: < 768px
- **Small Mobile**: < 480px

## ⚡ Performance

- **Lazy Loading**: Componentes carregados sob demanda
- **Otimização de Imagens**: Next.js Image component
- **Code Splitting**: Automático com Next.js
- **Animações Otimizadas**: RAF e transform3d
- **Scroll Suave**: Lenis para performance

## 🎯 SEO

- Meta tags otimizadas
- Estrutura semântica HTML
- Open Graph tags
- Schema markup (preparado)

## 🔧 Scripts Disponíveis

```bash
npm run dev          # Desenvolvimento
npm run build        # Build para produção
npm run start        # Preview da build
npm run lint         # Verificar código
npm run type-check   # Verificar tipos TypeScript
```

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🤝 Contribuição

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📞 Contato

- **Email**: seu@email.com
- **LinkedIn**: [Seu Perfil](https://linkedin.com/in/seu-perfil)
- **GitHub**: [@seu-usuario](https://github.com/seu-usuario)

---

⭐ Se este projeto te ajudou, considere dar uma estrela no repositório!
