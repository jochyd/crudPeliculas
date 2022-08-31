import { Pelicula } from "./classPelicula.js";

//getitem de local storage es paara leer un item. json.parse (pasamos algo en objeto json para transformarlo en codigo legible de js)
let listaPeliculas =
  JSON.parse(localStorage.getItem("listaPeliculasKey")) || [];

//codigo para instanciar una ventana modal formularioPelicula
const modalPelicula = new bootstrap.Modal(
  document.getElementById("formularioPelicula")
);
const btnCrearPelicula = document.getElementById("btnCrearPelicula");
let codigo = document.getElementById("codigo");
let titulo = document.getElementById("titulo");
let descripcion = document.getElementById("descripcion");
let imagen = document.getElementById("imagen");
let genero = document.getElementById("genero");
let formulario = document.getElementById("formPeliculas");
//variable para controlar si creo o actualizo una pelicula
let peliculaNueva = true; //cuando pelicula nueva sea igual a true, quiero crear la pelicula, en caso contrario quiero actualizar la pelicula.

//aqui agrego los event

btnCrearPelicula.addEventListener("click", mostrarFormulario);
formulario.addEventListener("submit", guardarPelicula);

cargaInicial();
// esta funcion va a mostrar la tabla con datos si es q hay datos para mostrar
function cargaInicial() {
  if (listaPeliculas.length > 0) {
    //dibujar filas de la tabla... d
    listaPeliculas.forEach((itemPelicula) => {
      crearFila(itemPelicula);
      console.log("prueba");
    });
  }
}

function crearFila(itemPelicula) {
  //creando la tabla
  let tablaPeliculas = document.getElementById("tablaPeliculas");
  tablaPeliculas.innerHTML += `<tr>
   <th scope="row">${itemPelicula.codigo}</th>
   <td>${itemPelicula.titulo}</td>
   <td>
     ${itemPelicula.descripcion}
   </td>
   <td>
    ${itemPelicula.imagen}
   </td>
   <td>
     ${itemPelicula.genero}
   </td>
   <td>
   <button type="button" class="btn btn-danger" onclick="borrarPelicula('${itemPelicula.codigo}')">
     <i class="bi bi-file-x-fill colorIncono fs-5"></i>
   </button>
   <button type="button" class="btn btn-warning mt-2" onclick="editarPelicula('${itemPelicula.codigo}')">
     <i class="bi bi-pencil-square fs-5"></i>
   </button>
 </td>
 </tr>`;
}

function mostrarFormulario() {
  peliculaNueva = true;
  limpiarFormulario();

  modalPelicula.show();
  console.log(uuidv4()); //este metodo genera identificadores unicos alfanumericos
  //mostrar el identifiicador unico cargado en el codgo que se vea
  codigo.value = uuidv4();
}

function guardarPelicula(e) {
  e.preventDefault();
  //preguntar todas las validaciones
  //realizar el if grande
  if (peliculaNueva === true) {
    //crear la pelicula
    crearPeliculaNueva();
  } else {
    //aqui quiero modificar la pelicula
    actualizarPelicula();
  }
}
function crearPeliculaNueva() {
  //crear un objeto pelicula
  let nuevaPelicula = new Pelicula(
    codigo.value,
    titulo.value,
    descripcion.value,
    imagen.value,
    genero.value
  );
  //guardar la pelicula en el arreglo
  listaPeliculas.push(nuevaPelicula);
  console.log(listaPeliculas);
  guardarPeliculasEnLocalStorage();
  //limpiar el formulario para darle de alta a otra pelicula mas
  limpiarFormulario();
  //dibujar una fila en la tabla
  crearFila(nuevaPelicula);
  //cerrar ventaana modal
  modalPelicula.hide();
}

function limpiarFormulario() {
  formulario.reset(); //reset resetea el value de todo lo que estaa en el form
  //resetear las clases de cada uno de los elementos maquetadoss
  titulo.className = "form-control";
  descripcion.className = "form-control";
  genero.className = "form-control";
  imagen.className = "form-control";
}

function guardarPeliculasEnLocalStorage() {
  //el objeto localstorage tiene acceso directo al navegador
  //setitem para guardar el archivo.. se pone una palabra que yo invento para acceder al local 2do parametro el value que son los datos que voy a guaradar en formato json son el arreglo, para transformarlo en formato json se pone (string numeber, objetos, arreglos, un texto, etc, menos los undifined) se pone JSON.stringify(EL ARREGLO)
  localStorage.setItem("listaPeliculasKey", JSON.stringify(listaPeliculas));
}
function borrarTabla() {
  let tablaPeliculas = document.getElementById("tablaPeliculas");
  tablaPeliculas.innerHTML = "";
}

//muestre la tabla con datos
function cargarInicial() {
  if (listaPeliculas.length > 0) {
    //dibujar filas de la tabla
    listaPeliculas.forEach((itemPelicula) => {
      crearFila(itemPelicula);
    });
  }
}
//esto es para cuando es de tipo modulo y en el maquetado ponenmos onclick
//ventaniita

window.borrarPelicula = function (codigo) {
  console.log(codigo);
  Swal.fire({
    title: "Eliminar pelicula",
    text: "Esta seguro de eliminar la pelicula seleccionada, no se puede revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Borrar",
    CancelButtonText: "Cancelar",
  }).then((result) => {
    console.log(result);
    if (result.isConfirmed) {
      //agregar el codigo para borrar la pelicula
      //buscar la pelicula con el codigo indicado en el arreglo y borrarlo
      let copiaListaPeliculas = listaPeliculas.filter((pelicula) => {
        return pelicula.codigo != codigo;
      });
      console.log(copiaListaPeliculas);
      listaPeliculas = copiaListaPeliculas;
      //actualizar el localstorage
      guardarPeliculasEnLocalStorage();
      //actualizar la tabla
      borrarTabla();
      cargarInicial();

      Swal.fire(
        "Pelicula!",
        "La pelicula seleccionada fue eliminada",
        "success"
      );
    }
  });
};

window.editarPelicula = function (codigoBuscado) {
  peliculaNueva = false;
  limpiarFormulario();
  //buscar del arreglo de peliculas la pelicula seleccionada
  // let peliculaBuscada = listaPeliculas.find((pelicula)=>{return pelicula.codigo === codigo});
  let peliculaBuscada = listaPeliculas.find(
    (pelicula) => pelicula.codigo === codigoBuscado
  ); //return implicito

  //cargar los datos de la pelicula seleccionada en el formulario
  codigo.value = peliculaBuscada.codigo;
  titulo.value = peliculaBuscada.titulo;
  descripcion.value = peliculaBuscada.descripcion;
  imagen.value = peliculaBuscada.imagen;
  genero.value = peliculaBuscada.genero;
  //abrir ventaniita modal
  modalPelicula.show();
};
function actualizarPelicula() {
  console.log("actualizando pelicula...");
  //buscaar la posicion de la pelicula que estoy editando en el arreglo
  let posicionPeliBuscada = listaPeliculas.findIndex(
    (pelicula) => pelicula.codigo === codigo.value
  );
  console.log(posicionPeliBuscada);

  //actualizar los datos de la pelicula que estoy editando
  listaPeliculas[posicionPeliBuscada].titulo = titulo.value;
  listaPeliculas[posicionPeliBuscada].descripcion = descripcion.value;
  listaPeliculas[posicionPeliBuscada].imagen = imagen.value;
  listaPeliculas[posicionPeliBuscada].genero = genero.value;

  //actualizar el localstorage
  guardarPeliculasEnLocalStorage();

  //actualizar la tabla
  borrarTabla();
  cargarInicial();

  //cerrar la ventana modal
  modalPelicula.hide();
  limpiarFormulario();

  //indicarle lo que sucedio al usuario
  Swal.fire(
    "Pelicula!",
    "La pelicula seleccionada correctamente modificada",
    "success"
  );
}

