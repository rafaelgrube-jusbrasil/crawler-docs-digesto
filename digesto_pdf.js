const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

async function inspecionarEstrutura() {
  console.log('Inspecionando estrutura do site...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  
  try {
    await page.goto('https://op.digesto.com.br/doc_api/seguranca.html', { 
      waitUntil: 'networkidle0', 
      timeout: 30000 
    });
    
    console.log('Página carregada! Aguardando 3 segundos...\n');
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Tentar diferentes seletores comuns de menus
    const estrutura = await page.evaluate(() => {
      const resultados = {
        seletoresEncontrados: [],
        links: []
      };
      
      // Lista de seletores comuns para menus laterais
      const seletores = [
        'nav a',
        '.sidebar a',
        '.md-sidebar a',
        '.md-nav a',
        'aside a',
        '[role="navigation"] a',
        '.menu a',
        '.navigation a'
      ];
      
      for (const seletor of seletores) {
        const elementos = document.querySelectorAll(seletor);
        if (elementos.length > 0) {
          resultados.seletoresEncontrados.push({
            seletor: seletor,
            quantidade: elementos.length
          });
        }
      }
      
      // Pegar todos os links da navegação (tentativa genérica)
      const todosLinks = document.querySelectorAll('a[href]');
      todosLinks.forEach(link => {
        const href = link.href;
        const texto = link.textContent.trim();
        
        // Filtrar apenas links internos da documentação
        if (href.includes('/doc_api/') && 
            href.endsWith('.html') && 
            texto.length > 0) {
          resultados.links.push({
            texto: texto,
            url: href
          });
        }
      });
      
      return resultados;
    });
    
    console.log('=== SELETORES ENCONTRADOS ===');
    estrutura.seletoresEncontrados.forEach(s => {
      console.log(`${s.seletor}: ${s.quantidade} elementos`);
    });
    
    console.log('\n=== LINKS ENCONTRADOS ===');
    
    // Remover duplicatas
    const linksUnicos = Array.from(
      new Map(estrutura.links.map(l => [l.url, l])).values()
    );
    
    console.log(`Total de ${linksUnicos.length} páginas únicas:\n`);
    linksUnicos.forEach((link, i) => {
      console.log(`${i + 1}. ${link.texto}`);
      console.log(`   ${link.url}`);
    });
    
    await browser.close();
    
    return linksUnicos;
    
  } catch (erro) {
    console.error('Erro:', erro.message);
    await browser.close();
  }
}

async function capturarTodasAsPaginas(links) {
  if (!links || links.length === 0) {
    console.log('\nNenhum link fornecido. Execute primeiro inspecionarEstrutura()');
    return;
  }
  
  console.log('\n\n=== INICIANDO CAPTURA DOS PDFs ===\n');
  
  const browser = await puppeteer.launch({ 
    headless: false,
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  
  const pastaOutput = './pdfs_digesto';
  if (!fs.existsSync(pastaOutput)) {
    fs.mkdirSync(pastaOutput);
  }
  
  const arquivosPdf = [];
  
  for (let i = 0; i < links.length; i++) {
    const link = links[i];
    console.log(`\n[${i + 1}/${links.length}] Capturando: ${link.texto}`);
    
    try {
      await page.goto(link.url, { waitUntil: 'networkidle0', timeout: 30000 });
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const nomeArquivo = `${String(i + 1).padStart(2, '0')}_${link.texto
        .replace(/[^a-z0-9]/gi, '_')
        .replace(/_+/g, '_')
        .toLowerCase()
        .substring(0, 50)}.pdf`;
      
      const caminhoCompleto = path.join(pastaOutput, nomeArquivo);
      
      await page.pdf({
        path: caminhoCompleto,
        format: 'A4',
        printBackground: true,
        margin: {
          top: '20mm',
          right: '15mm',
          bottom: '20mm',
          left: '15mm'
        }
      });
      
      arquivosPdf.push(caminhoCompleto);
      console.log(`  ✓ Salvo: ${nomeArquivo}`);
      
    } catch (erro) {
      console.log(`  ✗ Erro: ${erro.message}`);
    }
  }
  
  await browser.close();
  
  console.log(`\n\n✅ CONCLUÍDO! ${arquivosPdf.length} PDFs gerados.`);
  console.log(`📁 Pasta: ${path.resolve(pastaOutput)}`);
}

// Executar inspeção e depois captura
(async () => {
  const links = await inspecionarEstrutura();
  
  if (links && links.length > 0) {
    console.log('\n\n⏳ Aguardando 5 segundos antes de iniciar a captura...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    await capturarTodasAsPaginas(links);
  }
})();