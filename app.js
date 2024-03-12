let historial = []; // Variable global para almacenar el historial

function validarTexto() { // Funcion para validar el texto
  const texto = document.getElementById("text").value; // Obtener el texto del campo de texto
  const regex = /[ÁÉÍÓÚáéíóúÜüA-Z]/; // Expresión regular para buscar mayúsculas o letras con acentos

  if (texto === "") {
    Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: 'Ingrese una palabra o cadena de texto.',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    return false;
  } else if (regex.test(texto)) {
    Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: 'No se acepta texto con mayúsculas o acentos.',
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    return false;
  }
  return true;
}

function validarYProcesar(modo) { // Función para validar y procesar el texto
  if (validarTexto()) {
    procesar(modo); 
  }
}

function procesar(modo) { // Función para procesar el texto
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
    document.getElementById("copy-btn").textContent = "Copiar"; 
    document.getElementById("copy-btn").style.display = "none"; 
    Swal.fire({
      icon: 'warning',
      title: 'Error',
      text: "Modo no válido. Por favor, usa 'encriptar' o 'desencriptar'.",
    });
  }
  const fechaActual = new Date().toLocaleString(); // Obtener la fecha actual
  historial.push({ modo: modo, texto: textoProcesado, fecha: fechaActual, textoOriginal: texto  }); // Agregar entrada al historial

  copyBtn.textContent = "Copiar"; 
  image.style.display = 'none';
  title.style.display = 'none';
  paragraph.style.display = 'none';
  // Vaciar el valor del input después de 1.5 segundos
  setTimeout(function () {
    document.getElementById("text").value = ""; 
  }, 1500);
}

function copiarTexto() { // Función para copiar el texto encriptado
  const textoResultado = document.getElementById("message").value; 

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
          }, 1500);
        })
        .catch(err => {
          console.error('Error al copiar texto: ', err);
        });
    }
  });

}

function mostrarHistorial() { // Función para mostrar el historial
  if (historial.length === 0) {
    Swal.fire({
      icon: 'info',
      title: 'Historial Vacío',
      text: 'No hay registros en el historial.',
      timer: 1500,
      showConfirmButton: false,
      timerProgressBar: true,
    });
    return;
  }

  let historialHTML = '<div style="max-height: 300px; overflow-y: auto;">'; // Contenedor para el historial
  let resultadoMasReciente = historial[0]; // Variable para almacenar el resultado más reciente
  let resultadoMasAntiguo = historial[historial.length - 1]; // Variable para almacenar el resultado más antiguo
  
  historial.forEach((item) => {
    let color = item.modo === 'encrypt' ? 'green' : 'blue'; // Color diferente para cada opción
    historialHTML += `<p style="color: ${color}; margin-bottom: 5px;"> ${item.textoOriginal} => ${item.texto}</p>`;
    historialHTML += `<p style="font-size: 12px; color: gray; margin-bottom: 10px;">Procesado el ${item.fecha}</p>`;
    if (new Date(item.fecha) > new Date(resultadoMasReciente.fecha)){
      resultadoMasReciente = item;
    }
    if (new Date(item.fecha) < new Date(resultadoMasAntiguo.fecha)){
      resultadoMasAntiguo = item;
    }
  });
  historialHTML += `<p>Resultado más reciente: ${resultadoMasReciente.textoOriginal}</p>`;
  historialHTML += `<p>Resultado más antiguo: ${resultadoMasAntiguo.textoOriginal}</p`

  historialHTML += '</div>';

  Swal.fire({
    title: 'Historial Reciente',
    html: historialHTML,
    showCloseButton: true,
    showConfirmButton: false,
  });
}
