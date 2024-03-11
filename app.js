
function validarTexto() {
  const texto = document.getElementById("text").value; // Cambiar "textoInput" por el ID del elemento textarea donde el usuario ingresa el texto
  const regex = /[ÁÉÍÓÚáéíóúÜüA-Z]/; // Expresión regular para buscar mayúsculas o letras con acentos

  if (texto === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: 'Ingrese una palabra o cadena de texto.',
    });
    return false;
  } else if (regex.test(texto)) {
    Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: 'No se acepta texto con mayúsculas o acentos.',
    });
    return false;
  }
  return true;
}

function validarYProcesar(modo) {
  if (modo === 'encrypt') {
    if (!validarTexto()) {
      return;
    }
  }
  procesar(modo);
}

function procesar(modo) {
  const copyBtn = document.getElementById("copy-btn").style.display = "block";

  const image = document.getElementById('kid-img'); // imagen Para ocultar
  const title = document.getElementById('title'); // h2 Para ocultar
  const paragraph = document.getElementById('paragraph'); // p Para ocultar
  const resultado = document.getElementById("message"); // Textarea donde se regrese el texto encriptado
  const codigosEncriptar = { a: 'ai', e: 'enter', i: 'imes', o: 'ober', u: 'ufat' };

  const texto = document.getElementById("text").value; // 
  const codigosDesencriptar = { ai: 'a', enter: 'e', imes: 'i', ober: 'o', ufat: 'u' };

  let textoProcesado; // Variable para almacenar el texto procesado
  if (modo === 'encrypt') {
    textoProcesado = texto.replace(/[aeiou]/g, (letra) => codigosEncriptar[letra]);
    resultado.value = textoProcesado;
    resultado.style.display = "block";

  } else if (modo === 'desencrypt') {
    textoProcesado = texto.replace(/ai|enter|imes|ober|ufat/g, (codigo) => codigosDesencriptar[codigo]);
    resultado.value = textoProcesado;
    resultado.style.display = "block";


  } else {
    document.getElementById("copy-btn").textContent = "Copiar"; // Cambiar "copiar" por el ID del botón de copiar
    document.getElementById("copy-btn").style.display = "none"; // Cambiar "copiar" por el ID del botón de copiar
    Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: "Modo no válido. Por favor, usa 'encriptar' o 'desencriptar'.",
    });
  }
  copyBtn.textContent = "Copiar"; // Cambiar "copiar" por el ID del botón de copiar
  image.style.display = 'none';
  title.style.display = 'none';
  paragraph.style.display = 'none';
  // Vaciar el valor del input después de 1.5 segundos
  setTimeout(function () {
    document.getElementById("text").value = ""; // Cambiar "textoInput" por el ID del elemento textarea donde el usuario ingresa el texto
  }, 1500);
}

function copiarTexto() {
  const textoResultado = document.getElementById("message").value; // Cambiar "resultado" por el ID del elemento textarea donde se muestra el resultado

  Swal.fire({
    title: '¿Desea copiar y pegar el texto en el input?',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      document.getElementById("text").value = textoResultado;
      document.getElementById("message").value = "";
      document.getElementById("copy-btn").style.display = "none";
      setTimeout(()=> {
        document.getElementById("kid-img").style.display = "block";
        document.getElementById("title").style.display = "block";
        document.getElementById("paragraph").style.display = "block";
        document.getElementById("message").style.display = "none"; 
      }, 1500);
    } else if (!result.isConfirmed) {
      navigator.clipboard.writeText(textoResultado)
        .then(() => {
          document.getElementById("copy-btn").textContent = "¡Copiado!";
          Swal.fire({
            icon: 'success',
            title: '!Resultado copiado con exito¡',
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          setTimeout(function () {
            document.getElementById("message").value = "";
            document.getElementById("copy-btn").textContent = "Copiar";
            document.getElementById("copy-btn").style.display = "none";
            document.getElementById("kid-img").style.display = "block";
            document.getElementById("title").style.display = "block";
            document.getElementById("paragraph").style.display = "block";
            document.getElementById("message").style.display = "none";  
          }, 2000);
        })
        .catch(err => {
          console.error('Error al copiar texto: ', err);
        });
    }
  });

}
