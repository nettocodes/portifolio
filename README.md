# 🚀 Portfólio - Ivo Braatz

Portfólio profissional desenvolvido com Next.js 14, React 18, TypeScript e next-intl para internacionalização.

## ✨ Features

- 🌐 **Internacionalização (i18n)**: Suporte para Português e Inglês
- 🎨 **Design Moderno**: Interface elegante com animações suaves
- 🌓 **Dark/Light Mode**: Alternância de tema
- 📱 **Responsivo**: Totalmente adaptável para todos os dispositivos
- ⚡ **Performance**: Otimizado com Next.js 14 e App Router
- 🎯 **SEO Otimizado**: Meta tags e estrutura semântica
- ✨ **Animações**: Efeitos visuais e transições suaves
- 🔍 **TypeScript**: Código type-safe

## 🛠️ Tecnologias

- **Framework**: Next.js 14
- **UI**: React 18
- **Linguagem**: TypeScript
- **Internacionalização**: next-intl
- **Estilização**: CSS Modules
- **Deploy**: Vercel

## 🚀 Começando

### Desenvolvimento

```bash
# Instalar dependências
npm install

# Executar servidor de desenvolvimento
npm run dev

# Abrir http://localhost:3000
```

### Build

```bash
# Build de produção
npm run build

# Executar build localmente
npm start
```

### Lint

```bash
npm run lint
```

## 📦 Deploy Automático

O projeto está configurado para deploy automático na Vercel. Veja mais detalhes em [DEPLOY.md](./DEPLOY.md).

### Deploy Rápido (Windows)

```powershell
# Executa lint, build e push
.\deploy.ps1
```

### Deploy Rápido (Linux/Mac)

```bash
# Executa lint, build e push
./deploy.sh
```

### Deploy Manual

```bash
git add .
git commit -m "sua mensagem"
git push origin main
```

A Vercel detectará automaticamente o push e iniciará o deploy.

## 📁 Estrutura do Projeto

```
├── app/                    # App Router (Next.js 14)
│   ├── [locale]/          # Rotas internacionalizadas
│   ├── not-found.tsx      # Página 404 customizada
│   └── layout.tsx         # Layout root
├── src/
│   ├── components/        # Componentes React
│   │   ├── layout/       # Header, Footer, etc
│   │   ├── sections/     # Seções da página
│   │   └── ui/           # Componentes UI reutilizáveis
│   ├── constants/        # Dados e constantes
│   ├── contexts/         # React Contexts
│   ├── i18n/            # Configuração i18n
│   ├── styles/          # Estilos globais
│   └── types/           # TypeScript types
├── messages/            # Arquivos de tradução
│   ├── en.json
│   └── pt.json
└── public/             # Assets estáticos
```

## 🌍 Internacionalização

O projeto suporta dois idiomas:
- 🇧🇷 Português (`/pt`)
- 🇺🇸 Inglês (`/en`)

Para adicionar novas traduções, edite os arquivos em `messages/`.

## 🎨 Customização

### Cores e Tema

Edite as variáveis CSS em `src/styles/globals.css`

### Conteúdo

Edite os dados em `src/constants/data.ts`

### Traduções

Edite os arquivos em `messages/en.json` e `messages/pt.json`

## 📝 Licença

Desenvolvido por Ivo Braatz - 2025

## 🔗 Links

- [Vercel Dashboard](https://vercel.com/dashboard)
- [Next.js Docs](https://nextjs.org/docs)
- [next-intl Docs](https://next-intl-docs.vercel.app/)
