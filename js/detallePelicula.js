//tengo que tomar el parametro de la url 
// console.log(window.location.search)

const urlParametros = new URLSearchParams(window.location.search)
console.log(urlParametros.get('codigo')); //esto es el codifo que traemso de la url

// buscar en el localstorage las peliculas y buscar la pelicula que quiero mostrar 
let listaPeliculas = JSON.parse(localStorage.getItem('listaPeliculasKey')) || [];
let peliculaBuscada = listaPeliculas.find((pelicula)=> pelicula.codigo === urlParametros.get('codigo'));
console.log(peliculaBuscada);
//dibujar los datos de la pelicula encontrada
let seccionDetalle = document.getElementById('seccionDetalle');
seccionDetalle.innerHTML = `
<div class="card mb-3">
<div class="row g-0">
  <div class="col-md-4">
    <img src="${peliculaBuscada.imagen}" class="img-fluid rounded-start" alt="${peliculaBuscada.titulo}">
  </div>
  <div class="col-md-8">
    <div class="card-body">
      <h5 class="card-title">${peliculaBuscada.titulo}</h5>
      <p class="card-text">${peliculaBuscada.descripcion}</p>
      <p><span class="badge rounded-pill text-bg-primary">${peliculaBuscada.genero}</span></p>
      <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
    </div>
  </div>
</div>
</div>
`