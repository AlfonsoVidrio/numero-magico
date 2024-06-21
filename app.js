let numeroSecreto = 0;
let intentos = 0;
let listasNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let titulo = document.querySelector(elemento);
    titulo.innerHTML = texto;
}

function verificarIntento() {

    // obtener el valor del input
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);

    if (numeroDeUsuario === numeroSecreto) {
        asignarTextoElemento('p', `¡Felicitaciones! Has adivinado el número secreto en ${intentos} ${intentos === 1 ? 'intento' : 'intentos'}`);
        document.querySelector("#reiniciar").removeAttribute('disabled');
        limpiarCaja();

    } else if (numeroDeUsuario > numeroSecreto) {
        asignarTextoElemento('p', 'El número secreto es menor');
    } else {
        asignarTextoElemento('p', 'El número secreto es mayor');
    }

    intentos++;
    return;
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto() {

    let numeroGenerado = Math.floor(Math.random() * numeroMaximo + 1);
    // si la lista de números sorteados está llena se reinicia
    if (listasNumerosSorteados.length === numeroMaximo) {

        listasNumerosSorteados = [];
    }
    // Si el número generado está en la lista
    if (listasNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else {
        listasNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

function condicionesIniciales() {
    // mostrar el mensaje de inicio
    asignarTextoElemento('h1', 'Hora del Desafío');
    asignarTextoElemento('p', `Adivina el número secreto entre 1 y ${numeroMaximo}`);
    // generar un nuevo número secreto
    numeroSecreto = generarNumeroSecreto();
    // reiniciar los intentos
    intentos = 1;
    // deshabilitar el botón de reiniciar
    document.querySelector("#reiniciar").setAttribute('disabled', 'true');
}

function reiniciarJuego() {
    // limpiar la caja de texto
    limpiarCaja();
    condicionesIniciales();
}

condicionesIniciales();
