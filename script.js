const linhas = 6, colunas = 5;
const grid = document.getElementById('grid');
const palavra = "BANAL";
let linhaAtual = 0;


for (let i = 0; i < linhas; i++) {
    for (let j = 0; j < colunas; j++) {
        const celula = document.createElement('div');
        celula.classList.add('celula');
        celula.setAttribute('data-linha', i);
        celula.setAttribute('data-coluna', j);

        const input = document.createElement('input');
        input.setAttribute('maxlength', '1');
        input.setAttribute('data-linha', i);
        input.setAttribute('data-coluna', j);
        input.addEventListener('input', handleInput);
        celula.appendChild(input);
        grid.appendChild(celula);
    }
}

document.querySelector('input[data-linha="0"][data-coluna="0"]')?.focus();

function handleInput(e) {
    const input = e.target, linha = +input.getAttribute('data-linha'), coluna = +input.getAttribute('data-coluna');
    if (linha !== linhaAtual) return (input.value = "");
    if (input.value.length === 1 && coluna < colunas - 1) {
        document.querySelector(`input[data-linha="${linha}"][data-coluna="${coluna + 1}"]`)?.focus();
    }
}

document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        const inputs = document.querySelectorAll(`input[data-linha="${linhaAtual}"]`);
        const tentativa = Array.from(inputs).map(input => input.value.toUpperCase()).join('');
        tentativa.length === colunas ? Checar(tentativa, inputs) : alert("Complete a linha antes de pressionar Enter!");
    }
});

function Checar(tentativa, inputs) {
    let correctCount = 0;
    inputs.forEach((input, i) => {
        const parent = input.parentElement, letter = tentativa[i];
        parent.classList.remove('correct', 'present', 'absent');
        if (letter === palavra[i]) {
            parent.classList.add('correct');
            correctCount++;
        } else if (palavra.includes(letter)) {
            parent.classList.add('present');
        } else {
            parent.classList.add('absent');
        }
    });

    if (correctCount === colunas) {
        vitoria();
    } else if (linhaAtual < linhas - 1) {
        linhaAtual++;
        document.querySelector(`input[data-linha="${linhaAtual}"][data-coluna="0"]`)?.focus();
    } else {
        derrota(); 
    }
}

function vitoria() {
    const msg = document.createElement('div');
    msg.id = 'msg-de-vitoria';
    msg.textContent = 'Parabéns! Você acertou a palavra!';
    grid.insertAdjacentElement('afterend', msg);
}

function derrota() {
    const msg = document.createElement('div');
    msg.id = 'msg-de-derrota';
    msg.textContent = 'Você errou! A palavra era: ' + palavra;
    grid.insertAdjacentElement('afterend', msg);
}