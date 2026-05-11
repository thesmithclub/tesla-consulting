import { readFileSync } from 'node:fs';

const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');

const headSnippet = `<!-- Google Tag Manager -->
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TNRGQT75');</script>
<!-- End Google Tag Manager -->`;

const bodySnippet = `<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-TNRGQT75"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->`;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

assert(html.includes(headSnippet), 'head에 Google Tag Manager 스크립트가 정확히 포함되어야 합니다.');
assert(html.includes(bodySnippet), 'body 시작 직후 Google Tag Manager noscript가 정확히 포함되어야 합니다.');
assert(/<head>\s*<!-- Google Tag Manager -->/.test(html), 'GTM 스크립트는 <head> 바로 뒤 최대한 위에 있어야 합니다.');
assert(/<body>\s*<!-- Google Tag Manager \(noscript\) -->/.test(html), 'GTM noscript는 <body> 바로 뒤에 있어야 합니다.');
assert((html.match(/GTM-TNRGQT75/g) || []).length === 2, 'GTM-TNRGQT75는 head 스크립트와 body noscript에 각각 1번씩만 있어야 합니다.');

console.log('GTM 태그 검증 통과');
