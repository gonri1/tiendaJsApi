//PARA ESTE PROYECTO SE HAN USADO LAS SIGUIENTES LIBRERIAS

// Bootstrap 5.3 para los estilos   https://getbootstrap.com/
// SweetAlert para css dedicados (confirms y alerts)   https://sweetalert2.github.io/
// https://pixabay.com/ para imagenes


//Creo repositorios donde van a ir ubicadas las crads

let cardRepository = document.querySelector('#cardRepository');
let cardRepository2 = document.querySelector('#cardRepository2');
let totalCompras = 0;//variable almacena el total de las compras



//Refresco de pagina con boton "refresh"

let refresh = document.querySelector('#refresh');

refresh.addEventListener('click', function (e) {

  let alertaRefresh = Swal.fire("Refrescando");

  if (alertaRefresh) {
    
    cardRepository.innerHTML = "";
    cardRepository2.innerHTML = ""; //Vaciamos lo que haya 
    carrito.innerHTML = "";
    contenedorTotales.innerHTML = "";
    totalCompras = 0;

    async function refreshPage() {

      let resultadoJSON = await fetch('https://dummyjson.com/products');
      let resultadoReal = await resultadoJSON.json();

      resultadoReal.products.forEach(function (element) {
        let card = document.createElement("div");
        card.setAttribute("class", "col mb-4");

        card.innerHTML += `<div class="card">
      <img src="${element.thumbnail}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${element.price} €</h5>
        <p class="card-text">${element.category}</p>
        <p class="card-text">${element.brand}</p>
        <a href="#" class="btn btn-primary" value="${element.price}">Añadir al Carrito</a>
      </div>
    </div>`;


        if (element.id <= 15) {
          cardRepository.appendChild(card);
        } else {
          cardRepository2.appendChild(card);
        }
      });
    }
    refreshPage();
  }
})


//Carga de las cards segun se cargue la pagina


document.addEventListener("DOMContentLoaded", function (event) {

  Swal.fire({
    title: "Bienvenido a la tienda de Ivan",
    text: "Acepta nuestra politica de Cookies para continuar",
    icon: "question"
  });

  async function consultarUsuariosCargaDom() {

    let resultadoJSON = await fetch('https://dummyjson.com/products');
    let resultadoReal = await resultadoJSON.json();

    resultadoReal.products.forEach(function (element) {
      let card = document.createElement("div");
      card.setAttribute("class", "col mb-4");

      card.innerHTML += `<div class="card">
      <img src="${element.thumbnail}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${element.price} €</h5>
        <p class="card-text">${element.category}</p>
        <p class="card-text">${element.brand}</p>
        <a href="#" class="btn btn-primary" value="${element.price}">Añadir al Carrito</a>
      </div>
    </div>`;


      if (element.id <= 15) {
        cardRepository.appendChild(card);
      } else {
        cardRepository2.appendChild(card);
      }
    });
  }

  consultarUsuariosCargaDom();
});



// Select  por Precio e impresion de cards

let formularioSelect = document.querySelector("#formSelect");
let select = document.querySelector("#select");

formularioSelect.addEventListener("submit", function (event) {

  event.preventDefault();

  let resultadoSelect = select.value;


  if (resultadoSelect == "ascendente") {//ascendente

    async function consultarUsuariosPrecio() {

      try {

        cardRepository.innerHTML = "";
        cardRepository2.innerHTML = ""; //Vaciamos lo que haya 

        let resultadoJSON = await fetch('https://dummyjson.com/products');
        let resultadoReal = await resultadoJSON.json();

        // Ordenar los productos por precio de menor a mayor

        resultadoReal.products.sort((a, b) => a.price - b.price);
        resultadoReal.products.forEach(function (element) {

          let card = document.createElement("div");
          card.setAttribute("class", "col mb-4");

          card.innerHTML += `<div class="card">
                  <img src="${element.thumbnail}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.price} €</p>
                      <h5 class="card-title">${element.brand} €</h5>
                      <a href="#" class="btn btn-primary" value="${element.price}">Añadir al Carrito</a>
                  </div>
              </div>`;


          if (element.id <= 15) {
            cardRepository.appendChild(card);
          } else {
            cardRepository2.appendChild(card);
          }
        });

      } catch (error) {
        console.error("Error al consultar la API:", error);
      }
    }


    consultarUsuariosPrecio();

  } else if (resultadoSelect == "descendiente") {//descendiente

    async function consultarUsuariosPrecio() {

      try {

        cardRepository.innerHTML = "";
        cardRepository2.innerHTML = ""; //Vaciamos lo que haya 

        let resultadoJSON = await fetch('https://dummyjson.com/products');
        let resultadoReal = await resultadoJSON.json();

        // Ordenar los productos por precio de menor a mayor

        resultadoReal.products.sort((a, b) => b.price - a.price);

        resultadoReal.products.forEach(function (element) {

          let card = document.createElement("div");
          card.setAttribute("class", "col mb-4");

          card.innerHTML += `<div class="card">
                  <img src="${element.thumbnail}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.price} €</p>
                      <h5 class="card-title">${element.brand} €</h5>
                      <a href="#" class="btn btn-primary" value="${element.price}">Añadir al Carrito</a>
                  </div>
              </div>`;


          if (element.id <= 15) {
            cardRepository.appendChild(card);
          } else {
            cardRepository2.appendChild(card);
          }
        });

      } catch (error) {
        console.error("Error al consultar la API:", error);
      }
    }
    consultarUsuariosPrecio();
  }

});


// Realizamos un formulario tipo Select con las Categorias

let selectCategories = document.querySelector("#selectCategories"); //Nodo padre

async function selectCategorias() {
  try {
    let resultadoJSON = await fetch('https://dummyjson.com/products/categories');
    let resultadoReal = await resultadoJSON.json();

    let categoriasUnicas = new Set(resultadoReal);//Eliminamos coincidencias

    categoriasUnicas.forEach(function (element) {
      let option = document.createElement('option');
      option.textContent = element;
      selectCategories.appendChild(option);
    });

  } catch (error) {
    console.error("Error al consultar la API:", error);
  }
}


selectCategorias();


//Realizamos un formulario tipo Select con las Marcas

let selectBrands = document.querySelector("#selectBrand"); //Nodo padre

async function selectBrand() {

  try {
    let resultadoJSON = await fetch('https://dummyjson.com/products');
    let resultadoReal = await resultadoJSON.json();

    let marcasUnicas = new Set();//Eliminamos coincidencias

    selectBrands.innerHTML = " <option selected>Selecciona Marca</option>";

    resultadoReal.products.forEach(function (element) {
      marcasUnicas.add(element.brand);
    });

    marcasUnicas.forEach(function (marca) {
      let option = document.createElement('option');
      option.textContent = marca;
      selectBrands.appendChild(option);
    });

  } catch (error) {
    console.error("Error al consultar la API:", error);
  }
}

selectBrand();



//Impresion Html por categoria


let formularioCategory = document.getElementById("formSelectCategories");

formularioCategory.addEventListener("submit", function (event) {

  event.preventDefault();

  cardRepository.innerHTML = "";
  cardRepository2.innerHTML = ""; //Vaciamos lo que haya 

  async function cargaFormularioCategory() {
    try {
      let resultadoJSON = await fetch('https://dummyjson.com/products');
      let resultadoReal = await resultadoJSON.json();

      resultadoReal.products.forEach(function (element) {

        if (element.category == selectCategories.value) {

          let card = document.createElement("div");
          card.setAttribute("class", "col mb-4");

          card.innerHTML += `<div class="card">
                  <img src="${element.thumbnail}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.price} €</p>
                      <h5 class="card-title">${element.brand}</h5>
                      <a href="#" class="btn btn-primary" value="${element.price}">Añadir al Carrito</a>
                  </div>
              </div>`;

          cardRepository.appendChild(card);
        }
      });

    } catch (error) {
      console.error("Error al consultar la API:", error);
    }

  }

  cargaFormularioCategory();
});



//Impresion Html por Marca (brand)


let formularioBrand = document.getElementById("formSelectBrand");

formularioBrand.addEventListener("submit", function (event) {

  event.preventDefault();

  cardRepository.innerHTML = "";
  cardRepository2.innerHTML = ""; //Vaciamos lo que haya 

  async function cargaFormularioBrand() {

    try {
      let resultadoJSON = await fetch('https://dummyjson.com/products');
      let resultadoReal = await resultadoJSON.json();

      resultadoReal.products.forEach(function (element) {

        if (element.brand == selectBrands.value) {

          let card = document.createElement("div");
          card.setAttribute("class", "col mb-4");

          card.innerHTML += `<div class="card">
                  <img src="${element.thumbnail}" class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${element.title}</h5>
                      <p class="card-text">${element.price} €</p>
                      <h5 class="card-title">${element.brand}</h5>
                      <a href="#" class="btn btn-primary" value="${element.price}">Añadir al Carrito</a>
                  </div>
              </div>`;

          cardRepository.appendChild(card);
        }
      });

    } catch (error) {
      console.error("Error al consultar la API:", error);
    }

  }
  cargaFormularioBrand();
});


//MANEJO DE CARRITO (son dos repositorios)

let carrito = document.querySelector('#carrito'); // Nodo padre carrito
let total = document.querySelector('#total'); // Nodo padre total

cardRepository.addEventListener('click', function (event) {

  Swal.fire({
    title: "Estas seguro de agregar el producto?",
    text: "No podrás revertirlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si agregalo!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Agregado!",
        text: "El producto ha sido agregado",
        icon: "success"
      });
      
      let res = parseFloat(event.target.getAttribute('value')); // Convertir a número

      let preciosTr = document.createElement('tr');
      let preciosTd = document.createElement('td');
      preciosTd.setAttribute("class", "fw-bold fs-5 text-center bg-info border border-top");

      preciosTd.innerHTML = `${res}€`;

      carrito.appendChild(preciosTr);
      carrito.appendChild(preciosTd);

      //Total compras

      totalCompras += res;
    }
  });

});

cardRepository2.addEventListener('click', function (event) {


  Swal.fire({
    title: "Estas seguro de agregar el producto?",
    text: "No podras revertirlo!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Si, agregalo!"
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: "Agregado!",
        text: "El producto ha sido agregado",
        icon: "success"
      });
      let res = parseFloat(event.target.getAttribute('value')); // Convertir a número

      let preciosTr = document.createElement('tr');
      let preciosTd = document.createElement('td');
      preciosTd.setAttribute("class", "fw-bold fs-5 text-center bg-info border border-top");



      preciosTd.innerHTML = `${res}€`;

      carrito.appendChild(preciosTr);
      carrito.appendChild(preciosTd);

      //Total compras

      totalCompras += res;
    }
  });






});


//MANEJO DEL TOTAL DE COMPRAS

let contenedorTotales = document.querySelector("#contenedorTotales");
let mainCards = document.querySelector("#mainCards");

mainCards.addEventListener('mouseout', function (event) {

  contenedorTotales.innerHTML = "";

  let parrafoTotal = document.createElement("p");
  parrafoTotal.setAttribute("class", "fw-bold fs-3 text-center bg-warning");



  parrafoTotal.innerHTML = `${totalCompras}€`;

  contenedorTotales.appendChild(parrafoTotal);

});

