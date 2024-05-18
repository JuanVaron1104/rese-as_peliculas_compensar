function handleConfetti(event) {
  const x = event.clientX / window.innerWidth;
  const y = event.clientY / window.innerHeight;
  confetti({
    origin: { x, y },
  });
}
let idPelicula;
const peliculas = [
  {
    nombre: "Five Nights at Freddy's",
    resena: `Five Nights at Freddy’s es una película de terror basada en la popular franquicia de videojuegos creada por Scott Cawthon. La película sigue a Mike, un joven que acepta un trabajo como guardia de seguridad nocturno en una pizzería abandonada, donde tendrá que enfrentarse a los animatrónicos poseídos que acechan en el lugar. Mike también descubrirá que su hermana Abby está en peligro y que hay un misterio relacionado con la desaparición de su hermano años atrás.

    La película es fiel al material original y mantiene el nivel de suspenso y terror de los juegos. Los efectos visuales y el diseño de los animatrónicos son espeluznantes y divertidos. Los personajes son simpáticos y tienen un drama familiar que los hace más humanos. La película también incluye referencias y huevos de pascua que solo los fans más acérrimos reconocerán. Sin embargo, la película tiene algunos defectos, como la falta de sustos repentinos, el ritmo lento y la trama predecible.
    
    En general, Five Nights at Freddy’s es una buena película para los fans de la saga, pero puede no ser del agrado de los que no están familiarizados con ella. Es una película de terror para niños, con un tono similar al de la serie Escalofríos. Mi calificación final para esta película es un 7/10.`,
    imagen: "./public/poster_fnaf.jpeg",
  },
  {
    nombre: "Soy Leyenda 2",
    resena: `La secuela del éxito de 2007 sigue a Robert Nevill, el único superviviente de una epidemia que convirtió a la humanidad en vampiros. Nevill busca a otros como él y trata de encontrar la cura definitiva, mientras se enfrenta a los monstruos que dominan el planeta`,
    imagen: "./public/i_am_legend_two.jpeg",
  },
  {
    nombre: "Megalodon 2",
    resena: `Una nueva aventura submarina que lleva la acción a las profundidades del océano, donde un equipo de investigación se encuentra con múltiples amenazas, incluyendo una malévola operación minera y varios megalodones gigantes. Jason Statham y Wu Jing regresan como los protagonistas`,
    imagen: "./public/meg_2.jpeg",
  },
  {
    nombre: "Oppenheimer",
    resena: `Una biografía dramática del físico estadounidense J. Robert Oppenheimer, el padre de la bomba atómica, y su papel en el desarrollo de las armas nucleares durante la Segunda Guerra Mundial. Dirigida por Christopher Nolan y protagonizada por Cillian Murphy, Emily Blunt y Matt Damon`,
    imagen: "./public/oppenheimer.jpeg",
  },
  {
    nombre: "Hablame",
    resena: `Talk to Me es una película de terror australiana dirigida por los hermanos Danny y Michael Philippou, conocidos por sus vídeos virales en YouTube. La película cuenta la historia de Mia, una adolescente solitaria que se obsesiona con invocar espíritus usando una mano embalsamada que encuentra en una tienda de antigüedades. Sin embargo, cuando se comunica con un espíritu que dice ser su madre muerta, desencadena una serie de fenómenos paranormales que ponen en peligro su vida y la de sus amigos.`,
    imagen: "./public/talk_to_me.jpeg",
  },
  {
    nombre: "Evil Dead Rise",
    resena: `Una nueva entrega de la saga de terror que cambia el escenario del bosque por la ciudad, donde dos hermanas se reencuentran después de mucho tiempo y tienen que luchar por sobrevivir al ataque de los demonios poseedores de carne, que amenazan con convertirlas en la versión más horrible de su familia`,
    imagen: "./public/evil_dead_rise.jpeg",
  },
];

const contenedorPeliculas = document.getElementById("container");
const searchInput = document.getElementById("searchInput");

// Función para mostrar una película en una tarjeta
function mostrarPelicula(pelicula, index) {
  // Código para crear el card de la película (lo mismo que ya tienes)
  // Crear un nuevo elemento div para el card
  const cardDiv = document.createElement("div");
  cardDiv.className = "card text-bg-dark";
  cardDiv.setAttribute("data-id", index);
  cardDiv.style.width = "18rem";

  // Crear una imagen
  const imagen = document.createElement("img");
  imagen.src = pelicula.imagen;
  imagen.className = "card-img-top";
  imagen.alt = "...";

  // Crear el div del cuerpo del card
  const cardBodyDiv = document.createElement("div");
  cardBodyDiv.className = "card-body";

  // Crear el título
  const titulo = document.createElement("h5");
  titulo.className = "card-title";
  titulo.textContent = pelicula.nombre;

  // Crear el botón
  const boton = document.createElement("button");
  boton.type = "button";
  boton.className = "btn btn-secondary";
  boton.dataset.bsToggle = "modal";
  boton.dataset.bsTarget = "#exampleModal";
  boton.textContent = "Ver más";
  boton.setAttribute("data-id", index);

  boton.addEventListener("click", function () {
    const id = this.getAttribute("data-id");
    mostrarModal(id);
  });
  // Agregar elementos al card
  cardBodyDiv.appendChild(titulo);
  cardBodyDiv.appendChild(boton);

  cardDiv.appendChild(imagen);
  cardDiv.appendChild(cardBodyDiv);

  // Agregar el card al contenedor
  contenedorPeliculas.appendChild(cardDiv);
}

// Función para mostrar todas las películas
function mostrarTodasLasPeliculas() {
  contenedorPeliculas.innerHTML = ""; // Limpia el contenedor
  peliculas.forEach((pelicula, index) => {
    mostrarPelicula(pelicula, index);
  });
}

// Función para filtrar las películas según el texto de búsqueda
function filtrarPeliculas() {
  const textoBusqueda = searchInput.value.toLowerCase();
  const peliculasFiltradas = peliculas.filter((pelicula) =>
    pelicula.nombre.toLowerCase().includes(textoBusqueda)
  );

  contenedorPeliculas.innerHTML = ""; // Limpia el contenedor

  if (peliculasFiltradas.length === 0) {
    contenedorPeliculas.textContent = "No se encontraron películas.";
  } else {
    peliculasFiltradas.forEach((pelicula, index) => {
      mostrarPelicula(pelicula, index);
    });
  }
}

// Agrega un evento de escucha al campo de búsqueda
searchInput.addEventListener("input", filtrarPeliculas);

// Mostrar todas las películas al cargar la página
mostrarTodasLasPeliculas();

// Función para mostrar el modal con la información de la película
function mostrarModal(id) {
  idPelicula = id
  const modal = document.getElementById("exampleModal");

  // Obtiene la película correspondiente del arreglo 'peliculas' usando el 'id'
  const pelicula = peliculas[id];

  // Actualiza el contenido del modal con los datos de la película
  const modalTitulo = modal.querySelector(".modal-title");
  const modalImagen = modal.querySelector("img");
  const modalParrafo = modal.querySelector("p");

  modalTitulo.textContent = pelicula.nombre;
  modalImagen.src = pelicula.imagen;
  modalParrafo.textContent = pelicula.resena;

  // Abre el modal
  const modalInstance = new bootstrap.Modal(modal);
  modalInstance.show();
}

// Crea el modal y agrega un evento para mostrarlo
document.addEventListener("DOMContentLoaded", function () {
  // Crear el modal
  document.body.style = "overflow: auto;";
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "exampleModal";
  modal.setAttribute("tabindex", "-1");
  modal.setAttribute("aria-label", "exampleModalLabel");
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog modal-lg modal-dialog-centered";

  const modalContent = document.createElement("div");
  modalContent.className = "modal-content text-bg-dark";

  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  const modalTitle = document.createElement("h1");
  modalTitle.className = "modal-title fs-5";
  modalTitle.id = "exampleModalLabel";

  const btnClose = document.createElement("button");
  btnClose.type = "button";
  btnClose.className = "btn-close";
  btnClose.setAttribute("data-bs-dismiss", "modal");
  btnClose.setAttribute("aria-label", "Close");

  btnClose.addEventListener("click", function () {
    eliminarBackdrop();
  });

  const botonComentarios = document.createElement("button");
  botonComentarios.type = "button";
  botonComentarios.className = "btn btn-secondary";
  botonComentarios.textContent = "Comentarios";

  botonComentarios.addEventListener("click", function () {
    // Redirigir a la página de comentarios, pasando el ID de la película como parámetro
    redirigirPantalla()
  });

  modalHeader.appendChild(modalTitle);
  modalHeader.appendChild(btnClose);

  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  modalBody.style.width = "100%";
  modalBody.style.height = "100%";

  const contentContainer = document.createElement("div");
  contentContainer.style.display = "flex";
  contentContainer.style.gap = "1rem";

  const modalImage = document.createElement("img");
  modalImage.style.width = "50%";
  modalImage.style.height = "50%";
  modalImage.style.borderRadius = "0.5rem";

  const modalParagraph = document.createElement("p");

  contentContainer.appendChild(modalImage);
  contentContainer.appendChild(modalParagraph);
  modalBody.appendChild(contentContainer);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modalBody.appendChild(botonComentarios);
  modal.appendChild(modalDialog);

  // Agregar el modal al documento
  document.body.appendChild(modal);
});

const eliminarBackdrop = () => {
  const modalBackdrop = document.getElementsByClassName("modal-backdrop");
  if (modalBackdrop[0]) {
    document.body.removeChild(modalBackdrop[0]);
    document.body.style = "overflow: auto;";
    eliminarBackdrop();
  } else {
    document.body.style = "overflow: auto;";
    return;
  }
};


const redirigirPantalla = () => {
  window.location.href = `/comentarios.html?id=${idPelicula}`;
}