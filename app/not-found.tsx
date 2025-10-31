import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="pt">
      <head>
        <style>{`
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          body {
            background: #0a0a0a;
            color: #ffffff;
            font-family: system-ui, -apple-system, sans-serif;
          }
          .notfound-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 100vh;
            padding: 20px;
            text-align: center;
          }
          .notfound-title {
            font-size: clamp(4rem, 10vw, 8rem);
            font-weight: 900;
            margin: 0 0 1.5rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            line-height: 1;
          }
          .notfound-subtitle {
            font-size: 1.875rem;
            font-weight: 700;
            margin: 0 0 1rem;
          }
          .notfound-description {
            font-size: 1.125rem;
            opacity: 0.8;
            margin: 0 0 2rem;
            line-height: 1.6;
          }
          .notfound-link {
            display: inline-block;
            padding: 0.875rem 2rem;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            text-decoration: none;
            border-radius: 0.5rem;
            font-weight: 600;
            transition: transform 0.2s ease, box-shadow 0.2s ease;
          }
          .notfound-link:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
          }
        `}</style>
      </head>
      <body>
        <div className="notfound-container">
          <h1 className="notfound-title">404</h1>
          <h2 className="notfound-subtitle">Página não encontrada</h2>
          <p className="notfound-description">A página que você está procurando não existe.</p>
          <Link href="/" className="notfound-link">Voltar para a página inicial</Link>
        </div>
      </body>
    </html>
  )
}
