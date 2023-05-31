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
// Para evitar errores en otras páginas que no sean el carrito, agrego un operador OR
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


/* BOTONES CARRITO */

// Defino una función que agregue eventos en los botones de un producto del carrito (sumar un item, restar un item, eliminar un producto del carrito)

function crearBotonesCarrito(producto) {
    let productoEnCarrito = document.getElementById(`producto-${producto.id}`);

    if (productoEnCarrito) {

        // BOTON PARA SUMAR ITEMS
        let botonSumar = productoEnCarrito.getElementsByClassName("cart-item_add");
        botonSumar[0].addEventListener("click", sumarItem);

        function sumarItem() {
            producto.cantidadEnCarrito++;

            let cantidadEnCarritoHTML = carritoContenido.querySelector(`#producto-${producto.id} .cantidad-item`);
            cantidadEnCarritoHTML.innerHTML = producto.cantidadEnCarrito;

            sumarPrecio(producto.precio);

            numeroCarrito++;
            numeroCarritoHTML.innerHTML = numeroCarrito;
            localStorage.setItem("numeroCarrito", numeroCarrito);

            localStorage.setItem("carrito", JSON.stringify(carrito));
            localStorage.setItem("carritoHTML", carritoContenido.innerHTML);
        }


        // BOTON PARA RESTAR ITEMS
        let botonRestar = productoEnCarrito.getElementsByClassName("cart-item_subtract");
        botonRestar[0].addEventListener("click", restarItem);

        function restarItem() {
            if (producto.cantidadEnCarrito > 1) {
                producto.cantidadEnCarrito--;

                let cantidadEnCarritoHTML = carritoContenido.querySelector(`#producto-${producto.id} .cantidad-item`);
                cantidadEnCarritoHTML.innerHTML = producto.cantidadEnCarrito;

                sumarPrecio(- producto.precio);

                numeroCarrito--;
                numeroCarritoHTML.innerHTML = numeroCarrito;
                localStorage.setItem("numeroCarrito", numeroCarrito);

                localStorage.setItem("carrito", JSON.stringify(carrito));
                localStorage.setItem("carritoHTML", carritoContenido.innerHTML);
            }
        }

        // BOTON PARA ELIMINAR PRODUCTO DEL CARRITO
        let botonEliminar = productoEnCarrito.getElementsByClassName("cart-item_delete");
        botonEliminar[0].addEventListener("click", eliminarItem);

        function eliminarItem() {

            sumarPrecio(- producto.precio * producto.cantidadEnCarrito);

            numeroCarrito = numeroCarrito - producto.cantidadEnCarrito;
            numeroCarritoHTML.innerHTML = numeroCarrito;

            localStorage.setItem("numeroCarrito", numeroCarrito);

            // elimino producto del carrito
            indiceDelProducto = carrito.indexOf(producto);
            carrito.splice(indiceDelProducto, 1);

            // elimino item del html
            productoEnCarrito.remove();

            localStorage.setItem("carrito", JSON.stringify(carrito));

            if (numeroCarrito == 0) {
                carritoContenido.innerHTML = `<p class="center-text">Tu carrito está vacío</p>`
            }
            localStorage.setItem("carritoHTML", carritoContenido.innerHTML);

            Toastify({
                text: `${producto.nombre} fue eliminado del carrito`,
                duration: 3000,
                gravity: "bottom",
                position: "right",
                style: {
                    background: "#FF5858",
                }
            }).showToast();
        }
    }
}


// Usando la función anterior, agrego eventos en los botones de cada producto del carrito

carrito.forEach((producto) => {
    crearBotonesCarrito(producto);
});


/* CATALOGO Y BOTONES PARA AGREGAR AL CARRITO */

// Defino una función para agregar un producto al array carrito, guardarlo en el Local Storage y sumar su precio al costo total
function agregarCarrito(producto) {

    // para definir la cantidadEnCarrito buscamos primero si el producto está ya en el carrito en el localStorage

    // Creo un array con los nombres de los productos en el carrito
    let nombresCarrito = carrito.map((item) => item.nombre);

    // A partir de ese array, chequeo si el producto ya está en el carrito. Si está, lo reemplazo con el objeto actualizado. Si no, simplemente lo agrego

    let indiceProducto = nombresCarrito.indexOf(producto.nombre);

    if (indiceProducto == -1) {
        producto.cantidadEnCarrito = 1;
        carrito.push(producto);
    }
    else {
        producto.cantidadEnCarrito = carrito[indiceProducto].cantidadEnCarrito + 1;
        carrito[indiceProducto] = producto;

        let cantidadEnCarritoHTML = carritoContenido.getElementsByClassName("cantidad-item");

        cantidadEnCarritoHTML[indiceProducto].innerHTML = carrito[indiceProducto].cantidadEnCarrito;


        localStorage.setItem("carritoHTML", carritoContenido.innerHTML);
    }

    numeroCarrito++;
    numeroCarritoHTML.innerHTML = numeroCarrito;
    localStorage.setItem("numeroCarrito", numeroCarrito);

    localStorage.setItem("carrito", JSON.stringify(carrito));

    sumarPrecio(producto.precio);
}


/* FILTROS */

// Creo dos arrays: uno con los tipos de productos y otro con las temáticas (ordenados alfabéticamente)

const tipos = ["almohadon", "cuaderno"];
const tematicas = ["Alicia en el País de las Maravillas", "Harry Potter", "Lilo y Stitch", "Mario Bros", "Marvel", "Sailor Moon", "Studio Ghibli"];

// Accedo a los botones de la sección de filtros
let botonesFiltros = document.getElementsByClassName("boton-filtro");

// Creo evento para cada opción de filtro
for (let i = 0; i < botonesFiltros.length; i++) {
    botonesFiltros[i].addEventListener('click', () => {

        let productosBorrados = document.querySelectorAll(`#lista-productos > :not(.${botonesFiltros[i].id})`);

        let productosSeleccionados = document.getElementsByClassName(`${botonesFiltros[i].id}`)

        for (let i = 0; i < productosBorrados.length; i++) {
            productosBorrados[i].classList.add("d-none");
        }

        for (let i = 0; i < productosSeleccionados.length; i++) {
            productosSeleccionados[i].classList.remove("d-none");
        }
    })
};


/* BOTON ORDENAR */

let botonOrdenar = document.getElementById('select-ordenar');

if (botonOrdenar) {
    botonOrdenar.addEventListener('change', (event) => {
        catalogo.innerHTML = '';
        pedirProductos(event.target.value);
    })
}


/* CATALOGO */

// Accedo al catalogo del HTML

let catalogo = document.getElementById("lista-productos");

// Defino una función asincrónica que recoja los productos de la API (en este caso, del JSON local) y los liste en el catálogo

const pedirProductos = async (orden) => {
    const resp = await fetch('lista-de-productos.JSON');
    const listaDeProductos = await resp.json();

    if (orden == "A-Z") {
        listaDeProductos.sort((a, b) => {
            if (a.nombre > b.nombre) {
                return 1;
            }
            if (a.nombre < b.nombre) {
                return -1;
            }
            // a must be equal to b
            return 0;
        })
    } 
    
    else if (orden == "Z-A") {
        listaDeProductos.sort((a, b) => {
            if (a.nombre > b.nombre) {
                return -1;
            }
            if (a.nombre < b.nombre) {
                return 1;
            }
            return 0;
        })
    } 
    
    else if (orden == "Precio ascendente") {
        listaDeProductos.sort((a, b) => {
            if (a.precio > b.precio) {
                return 1;
            }
            if (a.precio < b.precio) {
                return -1;
            }
            return 0;
        })
    }

    else if (orden == "Precio descendente") {
        listaDeProductos.sort((a, b) => {
            if (a.precio > b.precio) {
                return -1;
            }
            if (a.precio < b.precio) {
                return 1;
            }
            return 0;
        })
    }

    listaDeProductos.forEach(producto => {
        let articulo = document.createElement("article");
        articulo.className = `${producto.tipo} ${producto.tematica} articulo-catalogo`;
        articulo.innerHTML = `
        <img src= \"${producto.imagen}\" alt="${producto.nombre}">
        <div class="articulo-descripcion">
            <h6 class="articulo-nombre"> ${producto.nombre} </h6>
            <p>$ ${producto.precio}</p>
            <button class="btn boton-carrito boton-agregar-carrito">
                Agregar al carrito
            </button>
        </div>
        `
        catalogo.append(articulo);
    });

    // Defino un evento que agregue un producto al carrito al apretar el botón
    let botonCarrito = document.getElementsByClassName("boton-agregar-carrito");

    for (let i = 0; i < listaDeProductos.length; i++) {
        botonCarrito[i].addEventListener("click", botonAgregarCarrito)

        function botonAgregarCarrito() {
            if (carrito.length == 0) {
                carritoContenido.innerHTML = ""; // borro contenido del carrito
            };

            if (carrito.some((producto) => producto.nombre === listaDeProductos[i].nombre)) {
                agregarCarrito(listaDeProductos[i]);
            }

            else {
                agregarCarrito(listaDeProductos[i]);

                // agrego el elemento al carrito en HTML

                let itemCarrito = document.createElement("div");
                itemCarrito.id = `producto-${listaDeProductos[i].id}`;
                itemCarrito.className = "item-carrito card mb-3";
                itemCarrito.innerHTML = `
                <div class="row g-0 d-flex align-items-center">
                    
                    <div class="col-md-4">
                        <img src=\" ../` + listaDeProductos[i].imagen + `\" class="img-fluid rounded-start" alt="${listaDeProductos[i].nombre}">
                    </div>
                    
                    <div class="col-md-8">
                        <div class="card-body carrito-descripcion-y-botones">
                            <div class="descripcion-articulo-carrito text-md-center">
                                <p class="card-title">${listaDeProductos[i].nombre}</p>
                                <p class="card-text">$ ${listaDeProductos[i].precio}</p>
                            </div>
                            
                            <div class="cantidad-item-carrito">
                                <button class="cart-item_subtract btn">-</button>
                                <p class="cantidad-item">${listaDeProductos[i].cantidadEnCarrito}</p>
                                <button class="cart-item_add btn">+</button>
                            </div>
                            
                            <div class="eliminar-item">
                                
                                    <button class="cart-item_delete btn p-0">
                                        <img src="../assets/img/bin.png" alt="Eliminar producto">
                                    </button>
                                
                            </div>
                        </div>
                    </div>
                </div>
                `;

                carritoContenido.append(itemCarrito);

                localStorage.setItem("carritoHTML", carritoContenido.innerHTML);
            }

            Toastify({
                text: `${listaDeProductos[i].nombre} fue agregado al carrito`,
                duration: 3000,
                gravity: "bottom",
                position: "right",
            }).showToast();
        }
    }
}

// Agrego los productos al catálogo usando la función anterior (solamente si estamos en la página de producto; es decir, si catalogo no es undefined)

if (catalogo) {
    pedirProductos();
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
        localStorage.removeItem("numeroCarrito");

        Swal.fire({
            icon: 'success',
            text: 'Se eliminaron todos los elementos del carrito',
            showConfirmButton: false,
            footer: '<a href="../index.html#catalogo" class="fw-bold fs-5">Volver al catálogo</a>'
        })
    }
}

