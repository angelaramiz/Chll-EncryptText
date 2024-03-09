// Variables
let image = document.getElementById('kid-image'); // imagen Para ocultar
let title = document.getElementById('title'); // h2 Para ocultar
let paragraph = document.getElementById('paragraph'); // p Para ocultar
let copyButton = document.getElementById('copy-btn'); // Boton para copiar
const desencryptText = document.getElementById('text'); // Textarea donde el usuario ingrese texto
let encryptText = document.getElementById('message'); // Textarea donde se regrese el texto encriptado


const matrizCode = [
// La letra "e" es convertida para "enter"
  [],
// La letra "i" es convertida para "imes"
  [],
// La letra "a" es convertida para "ai"
  [],
// La letra "o" es convertida para "ober"
  [],
// La letra "u" es convertida para "ufat"
  []
]

// Funciones
function validarTexto() {
  if (/[A-ZàáèéìíòóùúÀÁÈÉÌÍÒÓÙÚ]/.test(desencryptText.value)) {
    alert('Por favor, Solo letras minúsculas y sin acentos');
  } else if (desencryptText.value == '') {
    alert('Por favor, Indique un Texto para Encriptar');
  } else {
    ocultarElementos();
    encryptText.value = encriptarTexto(enviarTexto());
    limpiarCaja();
    copyButton.textContent = 'Copiar';
  }
}
function desencriptarMensaje() {
  if (desencryptText.value == '') {
    alert('Por favor, Indique un Texto para Desencriptar');
  } else {
    ocultarElementos();
    encryptText.value = desencriptarTexto(enviarTexto());
    limpiarCaja();
    copyButton.textContent = 'Copiar';
  }
}
function enviarTexto() {
  return desencryptText.value.toLowerCase();
}
function encriptarTexto(mensaje) {
  let texto = mensaje;
  let resultado = '';

  for (var i = 0; i < texto.length; i++) {
    if (texto[i] == 'a') {
      resultado = resultado + 'ai';
    } else if (texto[i] == 'e') {
      resultado = resultado + 'enter';
    } else if (texto[i] == 'i') {
      resultado = resultado + 'imes';
    } else if (texto[i] == 'o') {
      resultado = resultado + 'ober';
    } else if (texto[i] == 'u') {
      resultado = resultado + 'ufat';
    } else {
      resultado = resultado + texto[i];
    }
  }

  return resultado;
}
function desencriptarTexto(mensaje) {
  let texto = mensaje;
  let resultado = '';

  for (var i = 0; i < texto.length; i++) {
    if (texto[i] == 'a') {
      resultado = resultado + 'a';
      i = i + 1;
    } else if (texto[i] == 'e') {
      resultado = resultado + 'e';
      i = i + 4;
    } else if (texto[i] == 'i') {
      resultado = resultado + 'i';
      i = i + 3;
    } else if (texto[i] == 'o') {
      resultado = resultado + 'o';
      i = i + 3;
    } else if (texto[i] == 'u') {
      resultado = resultado + 'u';
      i = i + 3;
    } else {
      resultado = resultado + texto[i];
    }
  }

  return resultado;
}
function ocultarElementos() {
  image.style.display = 'none';
  title.style.display = 'none';
  paragraph.style.display = 'none';
  copyButton.style.display = 'block';
  encryptText.style.display = 'block';
}
function copiarTexto() {
  navigator.clipboard.writeText(encryptText.value);
  copyButton.textContent = '¡Copiado!';
  setTimeout(() => {
    encryptText.value = '';
    encryptText.style.display = 'none';
    paragraph.style.display = 'block';
  }, 3000);
 

}
function limpiarCaja() {
  desencryptText.value = '';
}
