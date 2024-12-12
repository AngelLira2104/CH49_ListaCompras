//es para saber cuando alguien le da click al boton agregar
let btnAgregar = document.getElementById("btnAgregar");
let btnClear = document.getElementById("btnClear");
let txtNeme = document.getElementById("Name");//es para saber cuando el usuario accede al campo de texto
let txtNumber = document.getElementById("Number");//es para saber cuando el usuario accede al campo de texto

let alertValidaciones = document.getElementById("alertValidaciones");// es para funcion de la alerta
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");//es para la funcion de la alerta del texto
let tablaListaCompras = document.getElementById("tablaListaCompras");//es para sabe la referencia de la tabla 
let cuerpoTabla = tablaListaCompras.getElementsByClassName("tbody").item(0);//para saber el cuerpo de la tabla. el item es para empezar de 0 desde la tabla
let cont=0; //contador para contar cada linea
let costototal = "0";
let totalproductos = 0;
let datos = new Array();

let contadorProductos = document.getElementById("contadorProductos");//contador producto
let productosTotal = document.getElementById("productosTotal");//contador total
let precioTotal = document.getElementById("precioTotal");//contador cantidad.

/** Validaciones de campo de Cantidad
1. Dato
2. Informacion
3. Mayor que 0
*/
function ValidarCantidad(){//para validar la catidad
if(txtNumber.value.length<=0){
    return false;
}//validar cantidad
if(isNaN(txtNumber.value)){//valida si no es un numero
return false;
}//isNaN
if(Number(txtNumber.value)<=0){//si el dato es menor a 0
    return false;
}// validacion < 0
return true;
}

btnAgregar.addEventListener("click", function(event){
     event.preventDefault();
let isValid = true;//bandera, al ser true permite agregar los datos a la tabla
txtNeme.value = txtNeme.value.trim();//evalua si tiene espacios y si los tienes, los borra. 
txtNumber.value = txtNumber.value.trim();//evalua si tiene espacios y si los tienes, los borra. 
//Esta parte es para validar que si hay datos 
     txtNeme.style.border = "";
     alertValidacionesTexto.innerHTML= "";
     alertValidaciones.style.display="none";
// console.log("click..."); //para saber si funciona con temrinal de navegador
    //valida si no hay datos aplica el borde y aplica la alerta con un cuadro de deicición if
 if(txtNeme.value.length<3){
//2. borde de color Rojo
txtNeme.style.border = "solid red medium";
//1. Mostrar la alerta con el error
alertValidacionesTexto.innerHTML= "<strong>El nombre del producto no es correcto.</strong>";
alertValidaciones.style.display="block";
isValid=false;//bandera,si es falso no permite agregar los datos a la tabla
}//if menor que 3

if(! ValidarCantidad()){//si regresas un false
txtNumber.style.border = "solid red medium";//pinta el borde rojo
alertValidacionesTexto.innerHTML+="<br><strong>La cantidad no es correcta.</Strong>";//agrega comentario
alertValidaciones.scroll.display="block";//lo coloca dentro de un bloque
isValid=false;//bandera,si es falso no permite agregar los datos a la tabla
}//validar cantidad
function getPrecio(){//genera numero al hasar
return Math.round(Math.random()*10000)/100;
}//get precio
if(isValid){//para agregar los datos a la tabla
    cont++;//cuenta de uno en uno.
let precio = getPrecio();
     let row=`<tr>
             <td>${cont}</td>
             <td>${txtNeme.value}</td>
             <td>${txtNumber.value}</td>
             <td>${precio}</td>
             </tr>`;  //insertar cada dato ingresado en los txt
        
             let elemento = {
                "cont":cont,
                "nombre": txtNeme.value,
                "cantidad": txtNumber.value,
                "precio":precio
             };
             
             datos.push(elemento);

             localStorage.setItem.apply("datos",JSON.stringify(datos));

        cuerpoTabla.insertAdjacentHTML("beforeend",row);//para irlos inserando
          costototal += precio * Number(txtNumber.value);//multiplica el precio con el costo total
          precioTotal.innerText = "$ " + costototal.toFixed(2);// pone el precio total
          contadorProductos.innerText = cont;
          productosTotal.innerText = Number(txtNumber.value);// se contabiliza number y se guarda en total productos.
          totalproductos.innerText = totalproductos;//para arrojar en productos


          txtNeme.value="";
          txtNumber.value="";
          txtNeme.focus();
}//isvali
});//btnAgregar click
btnClear.addEventListener("click",function(event){
    event.preventDefault();
    txtNeme.value="";
    txtNumber.value="";

    txtNeme.style.border = "";
    alertValidacionesTexto.innerHTML= "";
    alertValidaciones.style.display="none";

    let cuerpoTabla = tablaListaCompras.getElementsByClassName("tbody").item(0);//para saber el cuerpo de la tabla. el item es para empezar de 0 desde la tabla
    let cont=0; //contador para contar cada linea
    let costototal = "0";
    precioTotal.innerText = "$ " + costototal.toFixed(2);// pone el precio total
    contadorProductos.innerText = cont;
    productosTotal.innerText = Number(txtNumber.value);// se contabiliza number y se guarda en total productos.
    totalproductos.innerText = totalproductos;
    cuerpoTabla.innerHTML = "";

    localStorage.setItem("costoTotal",costototal);//almacena el costototal el la base local de el internet
    localStorage.setItem("totalProducto",totalproductos);//almacena el totalproducto el la base local de el internet
    localStorage.setItem("cont",cont);//almacena el contador el la base local de el internet

})

window.addEventListener("load",function(event)){
    if(this.localStorage.getItem("costoTotal")!=null){//lo pone en su respectivo lugar cuandos e inicia el navegadro
       costototal = Number(this.localStorage.getItem("costoTotal"));
    }//!null
    if(this.localStorage.getItem("totaEnProductos")!=null){//lo pone en su respectivo lugar cuandos e inicia el navegadro
         totalproductos = number(this.localStorage.getItem("totaEnProductos"));
    }//!null
    if(this.localStorage.getItem("cont")!=null){//lo pone en su respectivo lugar cuandos e inicia el navegadro
         cont = number(this.localStorage.getItem("cont"));
    }//!null

      if(this.localStorage.getItem("datos")!null){
          datos = JASON.parse(this.localStorage.getItem("datos"));
      }
          
      datos.forEach((r)=>{
            let row= `<tr>
            <td>${r.cont}</td>
            <td>${r.nombre}</td>
            <td>${r.cantidad}</td>
            <td>${r.precio}</td>
            </tr>` 
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
      });
    precioTotal.innerText = "$"+ costototal.toFixed(2);
    contadorProductos.innerText = cont;
    productosTotal.innerHTML = totalproductos;
}//windows load