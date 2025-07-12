// Configuração do EmailJS
// Este arquivo pode ser usado para centralizar as configurações do EmailJS

export const emailConfig = {
  serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || 'YOUR_SERVICE_ID',
  templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'YOUR_TEMPLATE_ID',
  publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'YOUR_PUBLIC_KEY',
};

export const emailTemplateParams = {
  to_email: 'braatzivo@hotmail.com',
  reply_to: 'braatzivo@hotmail.com',
};

// Função utilitária para validar se o EmailJS está configurado
export const isEmailJSConfigured = (): boolean => {
  return !!(
    emailConfig.serviceId && 
    emailConfig.templateId && 
    emailConfig.publicKey &&
    emailConfig.serviceId !== 'YOUR_SERVICE_ID' &&
    emailConfig.templateId !== 'YOUR_TEMPLATE_ID' &&
    emailConfig.publicKey !== 'YOUR_PUBLIC_KEY'
  );
};
