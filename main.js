// Defino una variable que acceda al contenido del carrito y al numero de items en el carrito en el HTML
// Si ya se había ingresado a la página antes, el carrito saca información del storage

let carritoContenido = document.getElementById("contenido-carrito") || document.createElement("div");
carritoContenido.innerHTML = localStorage.getItem("carritoHTML") || `
    <p class="center-text">Tu carrito está vacío</p>`

let numeroCarritoHTML = document.getElementById("items-en-carrito");
numeroCarritoHTML.innerHTML = localStorage.getItem("numeroCarrito") || 0;


// Creo un array que tenga los productos del carrito
// Si ya se había ingresado a la página antes, el carrito saca información del storage
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Defino una variable que cuente el total de items en el carrito
let numeroCarrito = carrito.reduce((sumaParcial, producto) => sumaParcial + producto.cantidadEnCarrito, 0);

// Accedo al HTML a través de una variable, para modificar el total de la compra
let totalCompra = document.getElementById("precio-final") || document.createElement("span");

// Defino una variable que lleve el precio total acumulado y agrego el valor al HTML
let precioTotal = Number(localStorage.getItem("precioTotal")) || 0;
totalCompra.innerHTML = `${precioTotal}`;

// Defino una función que sume una cantidad al precio total, y después muestre el nuevo precio total
function sumarPrecio(precioProducto) {
    precioTotal = precioTotal + precioProducto;
    localStorage.setItem("precioTotal", precioTotal);

    totalCompra.innerHTML = `${precioTotal}`;
}

// Defino funciones que generen eventos para Sumar y Restar la cantidad de items en el carrito de un determinado producto. Los argumentos son un botón y un índice.

function crearBotonSumar(boton, i) {
    boton.addEventListener("click", sumarItem);

    function sumarItem() {
        carrito[i].cantidadEnCarrito++;

        let cantidadEnCarritoHTML = carritoContenido.getElementsByClassName("cantidad-item");
        cantidadEnCarritoHTML[i].innerHTML = carrito[i].cantidadEnCarrito;

        sumarPrecio(carrito[i].precio);

        numeroCarrito++;
        numeroCarritoHTML.innerHTML = numeroCarrito;
        localStorage.setItem("numeroCarrito", numeroCarrito);

        localStorage.setItem("carrito", JSON.stringify(carrito));
        localStorage.setItem("carritoHTML", carritoContenido.innerHTML);
    }
}


function crearBotonRestar(boton, i) {
    boton.addEventListener("click", restarItem);

    function restarItem() {
        if (carrito[i].cantidadEnCarrito > 1) {
            carrito[i].cantidadEnCarrito--;

            let cantidadEnCarritoHTML = carritoContenido.getElementsByClassName("cantidad-item");
            cantidadEnCarritoHTML[i].innerHTML = carrito[i].cantidadEnCarrito;

            sumarPrecio(- carrito[i].precio);

            numeroCarrito--;
            numeroCarritoHTML.innerHTML = numeroCarrito;
            localStorage.setItem("numeroCarrito", numeroCarrito);

            localStorage.setItem("carrito", JSON.stringify(carrito));
            localStorage.setItem("carritoHTML", carritoContenido.innerHTML);
        }
    }
}

// Genero los eventos sumar y restar la cantidad de items del carrito, para los elementos del carrito guardados en el local storage

let botonSumar = document.getElementsByClassName("cart-item_add");

if (botonSumar[0]) {
    for (let i = 0; i < botonSumar.length; i++) {
        crearBotonSumar(botonSumar[i], i);
    }
}


let botonRestar = document.getElementsByClassName("cart-item_subtract");

if (botonRestar[0]) {
    for (let i = 0; i < carrito.length; i++) {
        crearBotonRestar(botonRestar[i], i);
    }
}

// Defino una clase que me permita crear un objeto para cada producto, con nombre, ruta de la imagen, precio y cantidad de unidades del producto en el carrito

class Producto {
    constructor(nombre, imagen, precio) {
        this.nombre = nombre;
        this.imagen = imagen;
        this.precio = Number(precio);
        this.cantidadEnCarrito;
    }

    // defino un método para agregar el producto al array carrito, guardarlo en el Local Storage y sumar su precio al costo total
    agregarCarrito() {

        // para definir la cantidadEnCarrito buscamos primero si el producto está ya en el carrito en el localStorage

        // Creo un array con los nombres de los productos en el carrito
        let nombresCarrito = carrito.map((producto) => producto.nombre);

        // A partir de ese array, chequeo si el producto ya está en el carrito. Si está, lo reemplazo con el objeto actualizado

        let indiceProducto = nombresCarrito.indexOf(this.nombre);

        if (indiceProducto == -1) {
            this.cantidadEnCarrito = 1;
            carrito.push(this);
        }
        else {
            this.cantidadEnCarrito = carrito[indiceProducto].cantidadEnCarrito + 1;
            carrito[indiceProducto] = this;

            let cantidadEnCarritoHTML = carritoContenido.getElementsByClassName("cantidad-item");

            cantidadEnCarritoHTML[indiceProducto].innerHTML = carrito[indiceProducto].cantidadEnCarrito;


            localStorage.setItem("carritoHTML", carritoContenido.innerHTML);
        }

        numeroCarrito++;
        numeroCarritoHTML.innerHTML = numeroCarrito;
        localStorage.setItem("numeroCarrito", numeroCarrito);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        sumarPrecio(this.precio);
    }
}


// Defino un objeto para cada producto

const almohadonCheshire = new Producto("Gato de Cheshire", "assets/img/gato-cheshire-azul.jpg", 2600);

const almohadonStitch = new Producto("Stitch", "assets/img/stitch.jpg", 2600);

const almohadonHongos = new Producto("Hongos Mario Bros", "assets/img/mario-hongos.jpg", 2600);

const almohadonSailorMoon = new Producto("Sailor Moon", "assets/img/sailor-moon.jpg", 2600);

const comboHP = new Producto("Combo Harry, Ron y Hermione", "assets/img/harry-potter-personajes.jpg", 7600);

const cuadernoTotoro = new Producto("Cuaderno Totoro", "assets/img/cuaderno-totoro.jpg", 2500);

const comboMario = new Producto("Combo Mario Bros", "assets/img/mario-bros.jpg", 7600);

const almohadonHedwig = new Producto("Hedwig", "assets/img/hedwig.jpg", 2600);

const almohadonHPTorta = new Producto("Torta de cumpleaños de Harry", "assets/img/harry-torta.jpg", 2600);

const cuadernoHP = new Producto("Cuaderno Harry Potter", "assets/img/cuaderno-harry-potter.jpg", 2500);

const almohadonLoki = new Producto("Loki", "assets/img/loki.jpg", 2600);

const almohadonAlicia = new Producto("Alicia", "assets/img/alicia.jpg", 2600);


// Creo un array con todos los productos

const listaDeProductos = [comboMario, almohadonHongos, comboHP, almohadonHPTorta, almohadonHedwig, cuadernoHP, cuadernoTotoro, almohadonCheshire, almohadonAlicia, almohadonStitch, almohadonLoki, almohadonSailorMoon];

// Usando el método map, creo un array que contenga todos los enteros desde 1 hasta la longitud del array

indicesDeProductos = listaDeProductos.map((producto) => listaDeProductos.indexOf(producto) + 1);

// Accedo al catalogo del HTML

let catalogo = document.getElementById("lista-productos");

// Defino una función que liste los productos en el catálogo

function listarProductos(lista) {
    for (let i = 0; i < lista.length; i++) {
        let articulo = document.createElement("article");
        articulo.className = "articulo-catalogo";
        articulo.innerHTML = `
        <img src= \"${lista[i].imagen}\" alt="${lista[i].nombre}">
        <div class="articulo-descripcion">
            <h6 class="articulo-nombre"> ${lista[i].nombre} </h6>
            <p>$ ${lista[i].precio}</p>
            <button class="btn boton-carrito boton-agregar-carrito">
                Agregar al carrito
            </button>
        </div>
        `
        catalogo.append(articulo);
    }
}

// Agrego los productos al catálogo usando la función anterior (si estamos en la página de producto; es decir, si catalogo no es undefined)

if (catalogo) {
    listarProductos(listaDeProductos);


    // Defino un evento que agregue un producto al carrito al apretar el botón
    let botonCarrito = document.getElementsByClassName("boton-agregar-carrito");

    for (let i = 0; i < listaDeProductos.length; i++) {
        botonCarrito[i].addEventListener("click", agregarCarrito)

        function agregarCarrito() {
            if (carrito.length == 0) {
                carritoContenido.innerHTML = ""; // borro contenido del carrito
            };

            if (carrito.some((producto) => producto.nombre === listaDeProductos[i].nombre)) {
                listaDeProductos[i].agregarCarrito();
            }

            else {
                listaDeProductos[i].agregarCarrito();

                // agrego el elemento al carrito en HTML

                let itemCarrito = document.createElement("div");
                itemCarrito.className = "card mb-3";
                //itemCarrito.style.maxWidth = "540px"
                itemCarrito.innerHTML = `
                        <div class="row g-0 d-flex align-items-center">
                            <div class="col-md-4">
                                <img src=\" ../` + listaDeProductos[i].imagen + `\" class="img-fluid rounded-start" alt="${listaDeProductos[i].nombre}">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body item-carrito">
                                    <div class="descripcion-articulo-carrito text-md-center">
                                        <p class="card-title">${listaDeProductos[i].nombre}</p>
                                        <p class="card-text">$ ${listaDeProductos[i].precio}</p>
                                    </div>
                                    <div class="cantidad-item-carrito">
                                        <button class="cart-item_subtract btn">-</button>
                                        <p class="cantidad-item">${listaDeProductos[i].cantidadEnCarrito}</p>
                                        <button class=\"cart-item_add btn\">+</button>
                                    </div>
                                </div>
                            </div>
                        </div>
            `
                carritoContenido.append(itemCarrito);

                localStorage.setItem("carritoHTML", carritoContenido.innerHTML);

                // a partir del nuevo código HTML agregado, actualizo las variables y genero nuevamente los eventos Sumar y Restar para el último elemento del array

                //cantidadEnCarritoHTML = document.getElementsByClassName("cantidad-item");
                //botonSumar = document.getElementsByClassName("cart-item_add");
                //botonRestar = document.getElementsByClassName("cart-item_subtract");

                //let ultimoIndice = carrito.length - 1;

                //crearBotonSumar(botonSumar[ultimoIndice], ultimoIndice);
                //crearBotonRestar(botonRestar[ultimoIndice], ultimoIndice);
            }
        }
    }
}

// Evento para vaciar el carrito
let botonVaciar = document.getElementById("vaciar-carrito");


if (botonVaciar) {
    botonVaciar.addEventListener("click", vaciarCarrito);

    function vaciarCarrito() {
        for (const producto of carrito) {
            sumarPrecio(- (producto.precio * producto.cantidadEnCarrito));
            producto.cantidadEnCarrito = 0;
        }

        carritoContenido.innerHTML = `<p class="center-text">Tu carrito está vacío</p>`;
        carrito = [];

        numeroCarrito = 0;
        numeroCarritoHTML.innerHTML = 0;

        localStorage.removeItem("carrito");
        localStorage.removeItem("carritoHTML");
        localStorage.removeItem("precioTotal");
        localStorage.removeItem("numeroCarrito")
    }
}

