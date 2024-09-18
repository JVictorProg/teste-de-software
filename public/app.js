function funcaoOperar() {
    let num1 = parseFloat(document.getElementById('numero1').value);
    let num2 = parseFloat(document.getElementById('numero2').value);
    let res_operacao = document.getElementById('resultado-matematico');

    let soma = num1 + num2;
    let subtracao = num1 - num2;
    let multiplicacao = num1 * num2;
    let divisao = num1 / num2;

    res_operacao.innerHTML = ` Soma: ${soma} <br>
          Subtração: ${subtracao} <br>
          Multiplicação: ${multiplicacao} <br>
          Divisão: ${divisao}`
}