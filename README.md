# Upsell — O Mapa da Apometria

Primeira proposta visual, baseada na identidade de https://mapa-da-apometria.vercel.app/.

## Prévia local

Execute `npm run dev` e abra http://127.0.0.1:3000. Também é possível abrir `index.html` diretamente no navegador.

## Conteúdo provisório

A página usa a copy fornecida pelo usuário para a coleção **Apometria na Prática**, com 5 manuais, preço original de R$ 97,00 e oferta de **R$ 37,90**. O preâmbulo editorial do arquivo recebido não faz parte da página. O mockup da coleção e as cinco capas foram copiados da pasta `../imagens` para `assets`, com numeração correspondente aos manuais. As cinco páginas de exemplo permanecem guardadas em `assets/pagina-01.png` a `assets/pagina-05.png` para uso posterior e não aparecem na página. As imagens do guia original não aparecem nesta versão.

## Integração Cakto

O upsell usa o script oficial remoto e a oferta 923i6vu enviada pelo usuário. O aceite é processado pela Cakto, com destino members_area; a recusa vai para /downsell pelo componente oficial, preservando o contexto do funil. O preço cobrado depende da configuração no painel Cakto; a página exibe R$ 37,90.

O downsell de R$ 14,90 usa a oferta 3dmcugz, tipo downsell, conforme código enviado pelo usuário. Aceite após processamento e recusa têm destino members_area. Cada página usa seu próprio ID; o valor cobrado é configurado na Cakto. A conferência técnica não realiza cobranças; validar pagamento e entrega no fluxo de teste da plataforma.

## Identidade visual

Paleta OKLCH e fontes reproduzem a referência: verde petróleo, creme, dourado, DM Sans e Libre Baskerville. Layout responsivo, navegação por âncoras, FAQ nativo e diálogo acessível.

## Vercel

Projeto estático sem dependências de execução. A configuração `vercel.json` executa `npm run build` e publica `dist`. O envio à branch `main` permite publicação automática quando a integração da Vercel estiver configurada.

## Otimizações de desempenho

- Ambas as páginas usam WebP responsivo e fontes WOFF2 locais com `font-display: swap`.
- A imagem principal tem prioridade alta; imagens abaixo do topo carregam sob demanda. As páginas 2 a 5 do carrossel recebem `src` apenas quando usadas.
- O build incorpora o CSS ao HTML e gera um nome com hash para o JavaScript. Imagens e fontes com hash recebem cache de um ano; uma alteração de conteúdo gera outro endereço.
- Os PNG originais permanecem preservados, mas não entram na publicação. As variantes maiores das 11 imagens somam 3.648.004 bytes, contra 41.754.949 bytes dos originais; a página usa variantes menores conforme a tela.
- `scripts/optimize-images.py` gera derivados com Pillow a partir dos originais e registra tamanhos e caminhos em `scripts/image-manifest.json`. Ao regenerar, atualizar as referências dos HTML para os hashes novos.
- Executar `npm run check` e `npm run build` antes de enviar. Para conferir o build local, definir `PREVIEW_DIST=1` e uma `PORT` alternativa ao executar `node preview.mjs`.

## Página direta

A rota `/pagina-direta` publica `pagina-direta.html`, cópia visual da página de upsell, com CSS e JS independentes (`styles-pagina-direta.css` e `script-pagina-direta.js`). Não contém integração de pagamento, componentes Cakto ou IDs de oferta. Os botões apenas exibem aviso de destino pendente. Imagens e fontes são compartilhadas; para alterá-las, criar novos derivados. As páginas originais continuam com suas integrações.

A Página direta oferece os cinco manuais por R$ 19,90 para divulgação na área de membros. Cabeçalho e botão foram adaptados para oferta direta. O bloco de condição exclusiva de checkout herdado da copy original permanece pendente de revisão pelo usuário.
