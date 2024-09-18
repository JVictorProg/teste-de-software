
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

describe('Testando as operações matemáticas', () => {
  test('Testando soma, subtração, multiplicação e divisão', () => {
    // Simular entrada de valores nos inputs
    const inputNumero1 = document.getElementById('numero1');
    const inputNumero2 = document.getElementById('numero2');
    inputNumero1.value = "10";
    inputNumero2.value = "5";

    // Simular clique no botão
    const botao = document.querySelector('.btn-mostrar');
    botao.click();

    // Verificar o resultado das operações
    const resultado = document.getElementById('resultado-matematico').innerHTML;

    expect(resultado).toContain('Soma: 15');
    expect(resultado).toContain('Subtração: 5');
    expect(resultado).toContain('Multiplicação: 50');
    expect(resultado).toContain('Divisão: 2');
  });
});