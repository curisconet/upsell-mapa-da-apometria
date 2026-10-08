# Instruções deste projeto

- Após concluir e verificar cada alteração solicitada pelo usuário, criar um commit e enviar para `origin/main` (`https://github.com/curisconet/upsell-mapa-da-apometria.git`). O usuário autorizou esse envio contínuo neste projeto.
- Usar push normal, sem force. Preservar alterações existentes e resolver divergências sem sobrescrever o histórico remoto.
- Manter a identidade visual verde petróleo, creme e dourado, com conteúdo centralizado e superfícies arredondadas e translúcidas.
- Manter o upsell em R$ 37,90 e o downsell em R$ 19,90 até nova instrução. O downsell em `/downsell` inclui apenas os manuais 01, 02 e 03 e usa uma estrutura mais curta.
- A plataforma de pagamento ainda não foi conectada. Os botões de aceitar e recusar são apenas prévia.
- Capturas `previa*.jpg` são registros locais de conferência e ficam fora do Git.
- Após edições, executar `npm run check` e `npm run build`. A Vercel publica `dist`, com CSS incorporado ao HTML, fontes locais e imagens WebP responsivas. Manter as imagens originais para preservação, mas não referenciá-las na página nem copiá-las para `dist`. Novos arquivos de mídia devem ter nomes com hash para cache seguro.
