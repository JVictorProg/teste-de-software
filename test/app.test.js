// Usando Polyfill para TextDecoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

// Carregar o HTML e simular o DOM
const html = fs.readFileSync(path.resolve(__dirname, '../public/index.html'), 'utf8');
let dom;
let document;

beforeEach(() => {
  dom = new JSDOM(html, { runScripts: "dangerously" });
  document = dom.window.document;
  // Injetar o JavaScript no DOM simulado
  dom.window.eval(fs.readFileSync(path.resolve(__dirname, '../public/app.js'), 'utf8'));
});

// Testes usando Jest
describe('Testando a aplicação de tabuada', () => {
    test('Deve exibir alerta se o input estiver vazio', () => {
      // Simula o comportamento do alert no DOM do JSDOM
      const alertMock = jest.spyOn(dom.window, 'alert').mockImplementation(() => {});
  
      // Simulando um clique no botão sem preencher o número
      document.querySelector('input[type="button"]').click();
  
      // Verifica se o alerta foi chamado
      expect(alertMock).toHaveBeenCalledWith('Por favor, digite um número!');
      alertMock.mockRestore();
    });
  
    test('Deve gerar a tabuada correta quando o número for preenchido', () => {
      // Simular preenchimento do número
      const input = document.getElementById('txtn');
      input.value = '5';
  
      // Simular clique no botão para gerar a tabuada
      document.querySelector('input[type="button"]').click();
  
      // Seleciona o select onde os resultados da tabuada são exibidos
      const tab = document.getElementById('seltab');
      const options = tab.querySelectorAll('option');
  
      // Verificar se existem 10 opções no select (10 multiplicações)
      expect(options.length).toBe(10);
  
      // Verificar se a primeira opção está correta
      expect(options[0].textContent).toBe('5 x 1 = 5');
      expect(options[9].textContent).toBe('5 x 10 = 50');
    });
  
    test('Deve limpar a tabuada anterior antes de gerar uma nova', () => {
      // Simular preenchimento do número e geração de tabuada
      const input = document.getElementById('txtn');
      input.value = '3';
      document.querySelector('input[type="button"]').click();
  
      // Verificar se a tabuada foi gerada corretamente
      let options = document.getElementById('seltab').querySelectorAll('option');
      expect(options.length).toBe(10);
  
      // Simular nova geração de tabuada para outro número
      input.value = '7';
      document.querySelector('input[type="button"]').click();
  
      // Verificar se a tabuada anterior foi limpa e a nova foi gerada
      options = document.getElementById('seltab').querySelectorAll('option');
      expect(options.length).toBe(10);
      expect(options[0].textContent).toBe('7 x 1 = 7');
    });
  });

