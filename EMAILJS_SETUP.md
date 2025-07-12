# Configuração do EmailJS

## Passos para configurar o EmailJS:

### 1. Criar conta no EmailJS
- Acesse https://www.emailjs.com/
- Crie uma conta gratuita

### 2. Configurar um Service
- No dashboard, vá para "Email Services"
- Adicione um novo serviço (Gmail, Outlook, etc.)
- Siga as instruções para conectar seu email

### 3. Criar um Template
- Vá para "Email Templates"
- Crie um novo template
- Use as seguintes variáveis no template:
  - `{{from_name}}` - Nome do remetente
  - `{{from_email}}` - Email do remetente
  - `{{subject}}` - Assunto
  - `{{company}}` - Empresa (opcional)
  - `{{phone}}` - Telefone (opcional)
  - `{{message}}` - Mensagem
  - `{{to_email}}` - Email de destino

### 4. Configurar as variáveis de ambiente
- Abra o arquivo `.env.local`
- Substitua os valores:
  - `VITE_EMAILJS_SERVICE_ID` - ID do serviço criado
  - `VITE_EMAILJS_TEMPLATE_ID` - ID do template criado
  - `VITE_EMAILJS_PUBLIC_KEY` - Chave pública da conta

### 5. Template completo para EmailJS:

**Assunto do email:**
```
{{subject}} - Contato via Portfólio
```

**Template HTML:**
```html
<p>Olá Ivo,</p>
<p>Você recebeu uma nova mensagem através do seu portfólio de <strong>{{from_name}}</strong>:</p>

<div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
  <h3 style="color: #667eea; margin-top: 0;">📧 Detalhes do Contato:</h3>
  <p><strong>Nome:</strong> {{from_name}}</p>
  <p><strong>Email:</strong> {{from_email}}</p>
  <p><strong>Assunto:</strong> {{subject}}</p>
  {{#company}}<p><strong>Empresa:</strong> {{company}}</p>{{/company}}
  {{#phone}}<p><strong>Telefone:</strong> {{phone}}</p>{{/phone}}
</div>

<div style="background-color: #fff; padding: 20px; border-left: 4px solid #667eea; margin: 20px 0; font-style: italic;">
  <h4 style="color: #333; margin-top: 0;">💬 Mensagem:</h4>
  <p style="line-height: 1.6;">{{message}}</p>
</div>

<hr style="border: none; border-top: 1px solid #eee; margin: 30px 0;">

<p style="color: #666; font-size: 14px;">
  <strong>Para responder:</strong> Responda diretamente para {{from_email}}<br>
  <strong>Data:</strong> Enviado através do formulário de contato do portfólio<br>
  <strong>IP:</strong> Esta mensagem foi enviada através do seu site
</p>

<p style="color: #667eea; font-weight: bold;">
  Atenciosamente,<br>
  Sistema do Portfólio Ivo Braatz
</p>
```

**Template de Texto (alternativo):**
```
Olá Ivo,

Você recebeu uma nova mensagem através do seu portfólio de {{from_name}}:

📧 DETALHES DO CONTATO:
Nome: {{from_name}}
Email: {{from_email}}
Assunto: {{subject}}
{{#company}}Empresa: {{company}}{{/company}}
{{#phone}}Telefone: {{phone}}{{/phone}}

💬 MENSAGEM:
{{message}}

---
Para responder: {{from_email}}
Data: Enviado através do formulário de contato do portfólio

Atenciosamente,
Sistema do Portfólio Ivo Braatz
```

### 6. Limitações da conta gratuita:
- 200 emails por mês
- Para mais emails, considere upgradar para um plano pago

### 7. Alternativas:
- **Formspree**: Mais simples, mas com limitações
- **Netlify Forms**: Se hospedar no Netlify
- **Vercel API Routes**: Para uma solução personalizada
