function funcaoVerificarIdade() {
    let numIdade = (parseInt(document.getElementById('idade').value));
    let resIdade = document.getElementById('resultado_idade');
  
    if (isNaN(numIdade) || numIdade < 0) {
      resIdade.innerHTML = `Insere a idade!`
    } else if (numIdade >= 5 && numIdade < 12) {
      resIdade.innerHTML = `Criança`
    } else if (numIdade >= 12 && numIdade < 18) {
      resIdade.innerHTML = `Adolescente`
    } else if (numIdade >= 18 && numIdade < 21) {
      resIdade.innerHTML = ` Jovem Adulto`
    } else if (numIdade >= 21 && numIdade <= 65) {
      resIdade.innerHTML = `Adulto`
    } else if (numIdade > 65) {
      resIdade.innerHTML = `Pessoa com mais de 65 anos`
    }
  }