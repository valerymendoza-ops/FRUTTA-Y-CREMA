
/* =================================
   FRUTTA & CREMA - JAVASCRIPT
================================= */

// 1. MENÚ PARA CELULARES

const menuBoton = document.getElementById("menuBoton");
const menu = document.getElementById("menu");

menuBoton.addEventListener("click", function () {
  const abierto = menu.classList.toggle("abierto");

  menuBoton.textContent = abierto ? "×" : "☰";
  menuBoton.setAttribute("aria-expanded", abierto);
  menuBoton.setAttribute(
    "aria-label",
    abierto ? "Cerrar menú" : "Abrir menú"
  );
});

// Cerrar el menú después de seleccionar una sección

menu.querySelectorAll("a").forEach(function (enlace) {
  enlace.addEventListener("click", function () {
    menu.classList.remove("abierto");
    menuBoton.textContent = "☰";
    menuBoton.setAttribute("aria-expanded", "false");
  });
});


// 2. SELECCIÓN DE PRODUCTOS

const botonesPedido = document.querySelectorAll("[data-producto]");
const selectorProducto = document.getElementById("producto");

botonesPedido.forEach(function (boton) {
  boton.addEventListener("click", function () {
    const producto = boton.dataset.producto;

    selectorProducto.value = producto;

    document.getElementById("contacto").scrollIntoView({
      behavior: "smooth"
    });
  });
});


// 3. PREPARAR EL MENSAJE DEL PEDIDO

const formulario = document.getElementById("formularioPedido");
const mensaje = document.getElementById("mensaje");
const mensajeGenerado = document.getElementById("mensajeGenerado");
const botonCopiar = document.getElementById("copiarMensaje");

let textoPedido = "";

formulario.addEventListener("submit", function (evento) {
  evento.preventDefault();

  // Obtener los datos del formulario
  const nombre = document.getElementById("nombre").value.trim();
  const producto = selectorProducto.value;
  const detalles = document.getElementById("detalles").value.trim();

  // Construir el mensaje
  textoPedido =
    "Hola, Frutta & Crema.\n\n" +
    "Mi nombre es " + nombre + ".\n" +
    "Me interesa: " + producto + ".\n" +
    "Detalles del pedido: " +
    (detalles || "Quisiera conocer las opciones disponibles.") +
    "\n\n¿Me pueden informar sobre los precios, tamaños y disponibilidad?";

  // Mostrar el mensaje generado
  mensajeGenerado.value = textoPedido;
  mensajeGenerado.hidden = false;
  botonCopiar.hidden = false;

  mensaje.textContent =
    "¡Tu mensaje está listo! Puedes copiarlo para enviarlo.";

  // Intentar copiarlo automáticamente
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(textoPedido)
      .then(function () {
        mensaje.textContent =
          "¡Mensaje copiado! Ya puedes pegarlo en tu aplicación de mensajería.";
      })
      .catch(function () {
        mensaje.textContent =
          "Selecciona el mensaje y utiliza la opción Copiar.";
      });
  }

  mensajeGenerado.focus();
  mensajeGenerado.select();
});


// 4. BOTÓN PARA COPIAR EL MENSAJE

botonCopiar.addEventListener("click", async function () {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(textoPedido);
    } else {
      mensajeGenerado.focus();
      mensajeGenerado.select();

      const copiado = document.execCommand("copy");

      if (!copiado) {
        mensaje.textContent =
          "Selecciona el texto y cópialo manualmente.";
        return;
      }
    }

    mensaje.textContent =
      "¡Mensaje copiado correctamente!";
  } catch (error) {
    mensaje.textContent =
      "Selecciona el texto y cópialo manualmente.";
  }
});


// 5. MOSTRAR EL AÑO ACTUAL EN EL PIE DE PÁGINA

document.getElementById("anio").textContent =
  new Date().getFullYear();
