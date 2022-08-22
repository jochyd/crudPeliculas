import { Pelicula } from "./classPelicula.js"; 

let listaPeliculas = [];

//codigo para instanciar una ventana modal formularioPelicula
const modalPelicula = new bootstrap.Modal(document.getElementById('formularioPelicula'));
const btnCrearPelicula = document.getElementById('btnCrearPelicula');
let codigo = document.getElementById('codigo');
let titulo = document.getElementById('titulo');
let descripcion = document.getElementById('descripcion');
let imagen = document.getElementById('imagen');
let genero = document.getElementById('genero');
let formulario = document.getElementById('formPeliculas');



//aqui agrego los event

btnCrearPelicula.addEventListener('click', mostrarFormulario);
formulario.addEventListener('submit', guardarPelicula);


function mostrarFormulario(){
    modalPelicula.show();
    console.log(uuidv4()); //este metodo genera identificadores unicos alfanumericos
    //mostrar el identifiicador unico cargado en el codgo que se vea
    codigo.value = uuidv4();


}

function guardarPelicula(e){
    e.preventDefault();
    //preguntar todas las validaciones
    //realizar el if grande

    //crear un objeto pelicula
    let nuevaPelicula = new Pelicula(codigo.value,titulo.value
        ,descripcion.value,imagen.value,genero.value)
    //guardar la pelicula en el arreglo
    listaPeliculas.push(nuevaPelicula);
    console.log(listaPeliculas);
    
    //limpiar el formulario para darle de alta a otra pelicula mas 
limpiarFormulario();
modalPelicula.hide();

}

function limpiarFormulario(){
    formulario.reset(); //reset resetea el value de todo lo que estaa en el form
    //resetear las clases de cada uno de los elementos maquetadoss
    titulo.className = 'form-control';
    descripcion.className = 'form-control';
    genero.className = 'form-control';
    imagen.className = 'form-control';
}