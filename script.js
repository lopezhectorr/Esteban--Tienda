const precios = { 1: 4000, 2: 4500, 3: 5000, 4: 5500 };
let total = 0;
let productosSeleccionados = {};

function seleccionarProducto(numero) {
    if (!productosSeleccionados[numero]) {
        productosSeleccionados[numero] = { cantidad: 1, precio: precios[numero] };
    }
    actualizarVenta();
}

function actualizarVenta() {
    let detalleVenta = document.getElementById("detalle-venta");
    detalleVenta.innerHTML = "";
    total = 0;

    Object.keys(productosSeleccionados).forEach(num => {
        let producto = productosSeleccionados[num];
        total += producto.cantidad * producto.precio;

        let div = document.createElement("div");
        div.classList.add("detalle");
        div.innerHTML = `
            <span>${num}° N Huevo - $${producto.precio}</span>
            <button onclick="cambiarCantidad(${num}, -1)">-</button>
            <span>${producto.cantidad}</span>
            <button onclick="cambiarCantidad(${num}, 1)">+</button>
            <span>Total: $${producto.cantidad * producto.precio}</span>
        `;
        detalleVenta.appendChild(div);
    });

    document.getElementById("total").innerText = total;
}

function cambiarCantidad(numero, cambio) {
    if (productosSeleccionados[numero]) {
        productosSeleccionados[numero].cantidad += cambio;
        if (productosSeleccionados[numero].cantidad < 1) {
            delete productosSeleccionados[numero];
        }
        actualizarVenta();
    }
}
