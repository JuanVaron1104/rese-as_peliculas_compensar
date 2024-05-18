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
// Obtén referencias a los elementos HTML
const movieImage = document.getElementById("movieImage");
const sinopsis = document.getElementById("sinopsis");
const comentariosList = document.getElementById("comentariosList");
const nuevoComentario = document.getElementById("nuevoComentario");
const enviarComentario = document.getElementById("enviarComentario");

// Función para cargar la información de la película
function cargarInformacionPelicula(pelicula) {
  movieImage.src = pelicula.imagen;
  movieImage.parentElement.style = "display: flex;   justify-content: center;";
  movieImage.style = "width: 20rem; ";
  sinopsis.textContent = pelicula.resena;
}

// Función para cargar los comentarios
function cargarComentarios(idPelicula) {
  const comentarios =
    JSON.parse(localStorage.getItem(`comentarios_${idPelicula}`)) || [];

  comentariosList.innerHTML = "";

  comentarios.forEach((comentario) => {
    const li = document.createElement("li");
    li.textContent = comentario;
    comentariosList.appendChild(li);
  });
}

// Función para agregar un comentario
function agregarComentario(idPelicula, comentario) {
  const comentarios =
    JSON.parse(localStorage.getItem(`comentarios_${idPelicula}`)) || [];
  comentarios.push(comentario);
  localStorage.setItem(
    `comentarios_${idPelicula}`,
    JSON.stringify(comentarios)
  );
  cargarComentarios(idPelicula);
}

// Evento para enviar un comentario
const enviar = () => {
  const comentario = nuevoComentario.value;
  if (comentario) {
    const idPelicula = obtenerParametroDeConsulta("id");
    agregarComentario(idPelicula, comentario);
    nuevoComentario.value = "";
  }
};

function obtenerParametroDeConsulta(nombre) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nombre);
}

// Obtener el valor del parámetro 'id' de la URL
const idPelicula = obtenerParametroDeConsulta("id");

if (parseInt(idPelicula) < peliculas.length) {
  cargarInformacionPelicula(peliculas[idPelicula]);
  cargarComentarios(idPelicula);
} else {
  window.location.href = "/notfound.html";
}
// Carga inicial de la información y los comentarios (reemplaza 0 por el ID de la película actual)
