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

describe('Verificador de Idade', () => {
    test('Deve exibir "Insere a idade!" quando a entrada é inválida ou vazia', () => {
        const idadeInput = document.getElementById('idade');
        const resultadoIdade = document.getElementById('resultado_idade');

        idadeInput.value = ''; // Simulando valor vazio
        dom.window.funcaoVerificarIdade();

        expect(resultadoIdade.textContent).toBe('Insere a idade!');
    });

    test('Deve exibir "Criança" para idades entre 5 e 11', () => {
        const idadeInput = document.getElementById('idade');
        const resultadoIdade = document.getElementById('resultado_idade');

        idadeInput.value = '7'; // Simulando idade de uma criança
        dom.window.funcaoVerificarIdade();

        expect(resultadoIdade.textContent).toBe('Criança');
    });

    test('Deve exibir "Adolescente" para idades entre 12 e 17', () => {
        const idadeInput = document.getElementById('idade');
        const resultadoIdade = document.getElementById('resultado_idade');

        idadeInput.value = '15'; // Simulando idade de um adolescente
        dom.window.funcaoVerificarIdade();

        expect(resultadoIdade.textContent).toBe('Adolescente');
    });

    test('Deve exibir "Jovem Adulto" para idades entre 18 e 20', () => {
        const idadeInput = document.getElementById('idade');
        const resultadoIdade = document.getElementById('resultado_idade');

        idadeInput.value = '19'; // Simulando idade de um jovem adulto
        dom.window.funcaoVerificarIdade();

        expect(resultadoIdade.textContent.trim()).toBe('Jovem Adulto');
    });

    test('Deve exibir "Adulto" para idades entre 21 e 65', () => {
        const idadeInput = document.getElementById('idade');
        const resultadoIdade = document.getElementById('resultado_idade');

        idadeInput.value = '30'; // Simulando idade de um adulto
        dom.window.funcaoVerificarIdade();

        expect(resultadoIdade.textContent).toBe('Adulto');
    });

    test('Deve exibir "Pessoa com mais de 65 anos" para idades maiores que 65', () => {
        const idadeInput = document.getElementById('idade');
        const resultadoIdade = document.getElementById('resultado_idade');

        idadeInput.value = '70'; // Simulando idade de uma pessoa com mais de 65 anos
        dom.window.funcaoVerificarIdade();

        expect(resultadoIdade.textContent).toBe('Pessoa com mais de 65 anos');
    });
});