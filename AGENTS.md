# Instruções deste projeto

- Após concluir e verificar cada alteração solicitada pelo usuário, criar um commit e enviar para `origin/main` (`https://github.com/curisconet/upsell-mapa-da-apometria.git`). O usuário autorizou esse envio contínuo neste projeto.
- Usar push normal, sem force. Preservar alterações existentes e resolver divergências sem sobrescrever o histórico remoto.
- Manter a identidade visual verde petróleo, creme e dourado, com conteúdo centralizado e superfícies arredondadas e translúcidas.
- Manter o upsell em R$ 19,90 e o downsell em R$ 14,90 até nova instrução. O downsell em `/downsell` inclui apenas os manuais 01, 02 e 03 e usa uma estrutura mais curta.
- O upsell usa os componentes oficiais Cakto, oferta `923i6vu`: aceite com destino `members_area` e recusa para `/downsell`. Não substituir o pagamento por redirecionamento direto. O downsell usa a oferta `3dmcugz`, tipo `downsell`, com aceite e recusa para `members_area`.
- Capturas `previa*.jpg` são registros locais de conferência e ficam fora do Git.
- Após edições, executar `npm run check` e `npm run build`. A Vercel publica `dist`, com CSS incorporado ao HTML, fontes locais e imagens WebP responsivas. Manter as imagens originais para preservação, mas não referenciá-las na página nem copiá-las para `dist`. Novos arquivos de mídia devem ter nomes com hash para cache seguro.

- A Página direta fica em `/pagina-direta`: editar somente `pagina-direta.html`, `styles-pagina-direta.css` e `script-pagina-direta.js`. É uma cópia visual SEM integração Cakto, IDs de oferta ou cobrança. Compra por link normal de checkout `https://pay.cakto.com.br/5bk6cuo`; não usar componentes de upsell. O botão de recusa ainda aguarda destino. Preservar as páginas originais e criar novos derivados para mudanças nas mídias compartilhadas.
- A Página direta oferece os 5 manuais por R$ 19,90, com apresentação de venda direta na área de membros, sem faixa de urgência e selo de pós-compra. O bloco herdado de checkout exclusivo aguarda revisão do usuário.
