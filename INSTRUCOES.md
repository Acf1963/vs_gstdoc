# Instruções para Instalação do Gestdoc

Existem duas formas principais de instalar esta aplicação no seu PC:

## Opção 1: Instalação Local (Offline)

Esta opção é ideal se você quiser rodar a aplicação diretamente do seu computador sem depender de internet (após a instalação inicial).

1.  **Certifique-se de ter o Node.js instalado**: [https://nodejs.org/](https://nodejs.org/)
2.  **Execute o arquivo `instalar_gestdoc.bat`**:
    - Este arquivo vai baixar as ferramentas necessárias e preparar a aplicação para uso.
3.  **Para usar a aplicação**:
    - Execute o arquivo `start_app.bat` (criado após a instalação).
    - Abra o seu navegador e acesse `http://localhost:3000`.
4.  **Instalar como App**:
    - No Chrome ou Edge, clique no ícone de "Instalar" na barra de endereços (ao lado da estrela de favoritos).
    - Isso criará um ícone no seu Desktop e no Menu Iniciar.

## Opção 2: Hospedagem Online (Recomendada)

Se você quiser acessar de qualquer lugar e facilitar a instalação em outros PCs ou celulares:

1.  Envie o código para o GitHub.
2.  Conecte ao **Vercel** ou **Netlify**.
3.  Acesse o link gerado e clique em "Instalar" no navegador.

---

### Notas Técnicas

- Os dados são salvos localmente no navegador (LocalStorage).
- A aplicação funciona offline graças ao Service Worker configurado.
