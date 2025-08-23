import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    // Validação básica
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      );
    }

    // Configuração do transporter do Nodemailer para Outlook
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.office365.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false, // true para 465, false para outras portas
      auth: {
        user: process.env.SMTP_USER, // seu email Outlook
        pass: process.env.SMTP_PASS, // senha de app ou senha normal
      },
    });

    // Configuração do email
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_USER}>`, // remetente
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER, // destinatário
      replyTo: email, // para responder diretamente ao contato
      subject: `Novo contato do portfólio - ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #fafafa;">
          <div style="background-color: white; border-radius: 20px; padding: 40px; box-shadow: 0 10px 30px rgba(0,0,0,0.1);">
            <div style="text-align: center; margin-bottom: 30px;">
              <h1 style="color: #0a0a0a; font-size: 24px; font-weight: 900; margin: 0;">NETTO</h1>
              <p style="color: #666; margin: 8px 0 0 0;">Novo contato do portfólio</p>
            </div>
            
            <div style="border-left: 4px solid #0a0a0a; padding-left: 20px; margin: 30px 0;">
              <h2 style="color: #0a0a0a; font-size: 18px; margin: 0 0 10px 0;">Informações do Contato</h2>
              <p style="margin: 8px 0; color: #333;"><strong>Nome:</strong> ${name}</p>
              <p style="margin: 8px 0; color: #333;"><strong>Email:</strong> ${email}</p>
            </div>
            
            <div style="background-color: #f8f9fa; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #0a0a0a; font-size: 16px; margin: 0 0 15px 0;">Mensagem:</h3>
              <p style="color: #333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
            
            <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
              <p style="color: #666; font-size: 14px; margin: 0;">
                Enviado através do portfólio • ${new Date().toLocaleDateString('pt-BR')} às ${new Date().toLocaleTimeString('pt-BR')}
              </p>
            </div>
          </div>
        </div>
      `,
      text: `
        Novo contato do portfólio
        
        Nome: ${name}
        Email: ${email}
        
        Mensagem:
        ${message}
        
        Enviado em: ${new Date().toLocaleString('pt-BR')}
      `,
    };

    // Enviar email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Mensagem enviada com sucesso!' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro ao enviar email:', error);
    return NextResponse.json(
      { error: 'Erro interno do servidor. Tente novamente mais tarde.' },
      { status: 500 }
    );
  }
}
