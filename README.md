# Upsell — O Mapa da Apometria

Primeira proposta visual, baseada na identidade de https://mapa-da-apometria.vercel.app/.

## Prévia local

Execute `npm run dev` e abra http://127.0.0.1:3000. Também é possível abrir `index.html` diretamente no navegador.

## Conteúdo provisório

A página usa a copy fornecida pelo usuário para a coleção **Apometria na Prática**, com 5 manuais, preço original de R$ 97,00 e oferta de **R$ 37,90**. O preâmbulo editorial do arquivo recebido não faz parte da página. O mockup da coleção e as cinco capas foram copiados da pasta `../imagens` para `assets`, com numeração correspondente aos manuais. As cinco páginas de exemplo permanecem guardadas em `assets/pagina-01.png` a `assets/pagina-05.png` para uso posterior e não aparecem na página. As imagens do guia original não aparecem nesta versão.

As informações de confirmação de pedido, cobrança em um clique, entrega imediata e condição exclusiva são textos da oferta enviada. Nesta etapa, nenhuma dessas operações está integrada ou validada: a página é uma prévia visual e os botões apenas abrem avisos.

Os botões de aceitar e recusar abrem um aviso de prévia. Nenhuma compra, cobrança, redirecionamento ou integração está configurada. Não há pixels de rastreamento.

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
