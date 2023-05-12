// Defino una clase que me permita crear un objeto para cada producto, con nombre, precio y cantidad de unidades del producto en el carrito (empieza siempre en 0)
class Producto {
    constructor(nombre, rutaImagen, precio) {
        this.nombre = nombre;
        this.imagen = rutaImagen;
        this.precio = Number(precio);
        this.cantidadEnCarrito;
    }
}

const cantidadDeProductos = 12;

for (let i = 0; i < cantidadDeProductos; i++)

// Defino un objeto para cada producto

const almohadon = new Producto("Almohadón Harry Potter", 2600);
const cuaderno = new Producto("Cuaderno Totoro", 2500);
const combo = new Producto("Combo Mario Bros", 7600);
const almohadon2 = new Producto ("Almohadon Totoro", 2600)

// Creo un array con todos los productos

const listaDeProductos = [almohadon, cuaderno, combo, almohadon2];

// Usando el método map, creo un array que contenga todos los enteros desde 1 hasta la longitud del array

indicesDeProductos = listaDeProductos.map( (producto) => listaDeProductos.indexOf(producto) + 1 );

// Defino una función que liste en un string los elementos de un array de productos con sus precios (a modo de catálogo)

function listarProductos(lista) {
    let productosConPrecio = []; // array que va a ir agregando cada trozo de string, sobre el que después usaremos el método join
    for (let i = 0; i < lista.length; i++) {
        productosConPrecio.push(" " + (i + 1) + ". " + listaDeProductos[i].nombre + " - $ " + listaDeProductos[i].precio);
    }
    return productosConPrecio.join("\n");
}

// Defino una función que liste en un string los productos agregados al carrito con sus respectivas cantidades

function verCarrito(lista) {
    let carrito = "";
    for (let i = 0; i < lista.length; i++) {
        if (lista[i].cantidadEnCarrito > 0) {
            carrito = carrito + "\n" + lista[i].nombre + " x " + lista[i].cantidadEnCarrito;
        }
    }
    if (carrito === "") {
        carrito = "Tu carrito está vacío";
    }
    return carrito;
}

// Defino una variable que lleve el precio total acumulado

let precioTotal = 0;

// Defino una función que sume una cantidad al precio total, y después muestre el nuevo precio total

function sumarPrecio(precioProducto) {
    precioTotal = precioTotal + precioProducto;
    alert("El precio total de su compra hasta el momento es de $" + precioTotal);
}

// Defino dos variables que guardan las opciones que elige el usuario

let seleccionBienvenida;
let seleccionCarrito;

// Defino el ciclo por el cual el usuario agrega productos al carrito

/* while (seleccionCarrito != 3) {
    seleccionBienvenida = Number(prompt("¡Bienvenido a la tienda de Santa Punk! \n\nElegí un producto para agregar al carrito: \n\n" + listarProductos(listaDeProductos) + "\n\nTambién podés acceder al carrito para revisar los productos elegidos y ver el precio final: \n\n" + (listaDeProductos.length + 1) + ". Ver carrito"));

    for (let i = 0; i < listaDeProductos.length; i++) {
        if (seleccionBienvenida == (i + 1) ) {
            sumarPrecio(listaDeProductos[i].precio);
            listaDeProductos[i].cantidadEnCarrito = listaDeProductos[i].cantidadEnCarrito + 1;
            break;
        }
    }

    if (seleccionBienvenida == (listaDeProductos.length + 1) ) {
        seleccionCarrito = Number(prompt(verCarrito(listaDeProductos) + "\n     Precio total: $ " + precioTotal + "\n\n 1. Elegir otro producto \n 2. Vaciar carrito \n 3. Finalizar compra"))

        if (seleccionCarrito == 2) {
            precioTotal = 0;
            listaDeProductos.forEach( (producto) => producto.cantidadEnCarrito = 0 );
            alert("Se vació el carrito")
        }
        else if ((seleccionCarrito != 1) && (seleccionCarrito != 3)) {
            alert("Comando no reconocido. Por favor, ingresá el número correspondiente a la opción elegida.")
        }
    }
    else if ( !indicesDeProductos.includes(seleccionBienvenida)) {
        alert("Comando no reconocido. Por favor, ingresá el número correspondiente a la opción elegida.");
    }

}

alert("El precio total de su compra es $" + precioTotal + "\n\n¡Gracias por elegirnos!");
*/