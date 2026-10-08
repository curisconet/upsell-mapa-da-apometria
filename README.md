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

Projeto estático sem dependências de execução. Na importação do GitHub, selecionar **Other**, manter a raiz como diretório do projeto e deixar os comandos de build e instalação sem configuração. Não há necessidade de gerar um diretório de saída. O envio à branch `main` permite publicação automática quando a integração da Vercel estiver configurada.
