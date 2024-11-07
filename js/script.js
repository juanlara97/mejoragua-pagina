$(document).ready(function () {

    //SCRIPT PARA FIJAR LA BARRA AL HACER SCROLL
    var altura = $("#navegacion").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollTop() > altura ){
  			$("#navegacion").addClass('nav-fixed');
  		} else {
  			$("#navegacion").removeClass('nav-fixed');
  		}
  	});

    //SCRIPTS PARA ANIMACIONES DE ANUNCIOS
    var anun1 = $("#anuncio1").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollBottom() > anun1 ){
  			$("#anuncio1").addClass('e-izquierda');
  		} else {
  			$("#anuncio1").removeClass('e-izquierda');
  		}
  	});
    var anun2 = $("#anuncio2").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollBottom() > anun1 ){
  			$("#anuncio2").addClass('e-derecha');
  		} else{
  			$("#anuncio2").removeClass('e-derecha');
  		}
  	});
    var anun3 = $("#anuncio3").offset().top;
  	$(window).on('scroll', function(){
  		if ( $(window).scrollBottom() > anun1 ){
  			$("#anuncio3").addClass('e-arriba');
  		} else {
  			$("#anuncio3").removeClass('e-arriba');
  		}
  	});
});

$.fn.scrollBottom = function() {
    return this.scrollTop() + this.height();
};

var carro;
var userActive;

function abrir_tienda(){
  document.location.href='tienda.html';
  if (localStorage.getItem("user") == null) {
    alert("No has iniciado Sesión, hazlo para recibir ofertas especiales");
  }
}

function abrir(sig){
  document.location.href=sig;
}

function agregar(id){
    var producto;
    var precio;
    var cantidad;
    var cod;
    var monto;

    switch (id) {
      case "#btn_prod01":
        cod= "#p1";
        producto = "Xiaomi Mi A2";
        precio = 700;
        cantidad = $("#p1").text();
        break;
      case "#btn_prod02":
        cod= "#p2";
        producto = "Xiaomi Mi 8 Se";
        precio = 800;
        cantidad = $("#p2").text();
        break;
      case "#btn_prod03":
        cod= "#p3";
        producto = "Xiaomi Mi 9";
        precio = 2700;
        cantidad = $("#p3").text();
        break;
      case "#btn_prod04":
        cod= "#p4";
        producto = "Redmi Note 7";
        precio = 900;
        cantidad = $("#p4").text();
        break;
      case "#btn_prod05":
        cod= "#p5";
        producto = "Redmi Note 6 Pro";
        precio = 700;
        cantidad = $("#p5").text();
        break;
      case "#btn_prod06":
        cod= "#p6";
        producto = "Xiaomi Mi A2 Lite";
        precio = 500;
        cantidad = $("#p6").text();
        break;
    }

    guardarItem(cod,producto, cantidad, precio);
    document.location.href='carrito.html';
}

function guardarItem(cod, producto, cantidad, precio)
{
    // Verificar si nuestra variable datos no existe
    if (localStorage.getItem("grup_3") == null)
    {
        var arrayFila       = [1, cod, producto, cantidad, precio, precio*cantidad];
        var arrayTabla      = [arrayFila];
        carro               = arrayTabla;
        var arrayTablaJSON  = JSON.stringify(arrayTabla);
        localStorage.setItem("grup_3", arrayTablaJSON);
    }
    else
    {
        var arrayTabla = JSON.parse(localStorage.getItem("grup_3"));
        var posicion = 0;
        var existe = false;

        for(var i=0; i<arrayTabla.length; i++)
        {
            posicion = i + 1;
            arrayTabla[i][0] = posicion;
            if (arrayTabla[i][1] == cod){
              existe = true;
              break;
            }
        }


        if(existe){
          arrayTabla[i][3] = parseInt(arrayTabla[i][3]) + parseInt(cantidad);
          arrayTabla[i][5] = arrayTabla[i][4] * arrayTabla[i][3];
        }else{
          var arrayFilaInsertar = [posicion+1, cod, producto, cantidad, precio, precio*cantidad];
          arrayTabla.push(arrayFilaInsertar);
        }
        // Insertar a arrayTabla

        carro = arrayTabla;

        // Convertir arrayTabla a JSOn(cadena) y guardar en LocalStorage
        localStorage.setItem("grup_3", JSON.stringify(arrayTabla));
    }
    listar();
}

function eliminar(id)
{
    if(localStorage.getItem("grup_3") != null)
    {
        var arrayTabla = JSON.parse(localStorage.getItem("grup_3"));
        for(var i = 0; i<arrayTabla.length; i++)
        {
            if(arrayTabla[i][0] == id)
            {
              arrayTabla.splice(i, 1);
            }
        }
        carro = arrayTabla;
        localStorage.setItem("grup_3", JSON.stringify(arrayTabla));
        listar();
    }
}

function cantidad(s,id){
      var cont = parseInt($(id).text());
      if(s==0 && cont>1){
        cont=cont-1;
      }
      if(s==1){
        cont=cont+1;
      }
      $(id).text(cont);
}

function actualizar(cod,can){
  if(localStorage.getItem("grup_3") != null)
  {
      var arrayTabla = JSON.parse(localStorage.getItem("grup_3"));
      for(var i = 0; i<arrayTabla.length; i++)
      {

          if(arrayTabla[i][1] == cod)
          {
            var arrayFila = arrayTabla[i];
            var precio = parseInt(arrayFila[4]);
            var monto = precio*can;
            arrayFila.splice(3, 1,can);
            arrayFila.splice(5, 1,monto);
            arrayTabla.splice(i,1,arrayFila);

          }
      }
      localStorage.setItem("grup_3", JSON.stringify(arrayTabla));
    }
}

var total=0;

function disminuirProd(cod)
{
  var arrayTabla = JSON.parse(localStorage.getItem("grup_3"));

  for(var i = 0; i<arrayTabla.length; i++)
  {
    if (arrayTabla[i][1] == cod){
      if (arrayTabla[i][3] > 1){
        arrayTabla[i][3] --;
        arrayTabla[i][5] = arrayTabla[i][3] * arrayTabla[i][4];
        break;
      }else{
        eliminar(arrayTabla[i][0]);
        break;
      }
    }
  }

  // Convertir array a JSON(cadena) y guardar en localStorage
  localStorage.setItem("grup_3", JSON.stringify(arrayTabla));

  listar();
}

function listar()
{
    total = 0;
    $("#tblDatos").html("");
    if(localStorage.getItem("grup_3") != null)
    {
        var arrayTabla = JSON.parse(localStorage.getItem("grup_3"));
        for(var i = 0; i<arrayTabla.length; i++)
        {
            // Crear fila
            var fila = "";
            fila += "<tr>";
            fila += "<td>"+arrayTabla[i][0]+"</td>";
            fila += "<td>"+arrayTabla[i][2]+"</td>";
            fila += "<td>s/ "+arrayTabla[i][4]+"</td>";
            fila += "<td>"+arrayTabla[i][3]+"</td>";
            fila += '<td><button class="btn btn-sm btn-danger btn-tb" onclick="disminuirProd('+"'"+arrayTabla[i][1]+"'"+')">-</button>&nbsp';
            fila += '<button class="btn btn-sm btn-info btn-tb" onclick="guardarItem('+"'"+arrayTabla[i][1]+"'"+','+"'"+arrayTabla[i][2]+"'"+', 1,'+"'"+arrayTabla[i][4]+"'"+')">+</button></td>';
            fila += "<td>s/ "+arrayTabla[i][5]+"</td>";
            fila += "<td>"+'<button class="btn btn-sm btn-danger" onclick="eliminar('+arrayTabla[i][0]+')">X</button></td>';
            fila += "</tr>";

            total = parseInt(total) + parseInt(arrayTabla[i][5]);
            $("#tblDatos").append(fila);
        }
    }
    var fila = "";
    fila += "<tr>";
    fila += "<td></td>";
    fila += "<td></td>";
    fila += "<td></td>";
    fila += "<th colspan=2>"+"Total:"+"</th>";
    fila += "<th>s/ "+total+"</th>";
    fila += "<td></td>";
    fila += "</tr>";
    $("#tblDatos").append(fila);
}

function calcPedido(){
  var val = document.getElementById("cboTPedido").value;

  if(val == 0){
    $("#time").text("15-20 días");
    $("#cost").text("s/ "+ (parseInt(total)+parseInt(100)));
  }
  if(val == 1){
    $("#time").text("20-45 días");
    $("#cost").text("s/ "+ (parseInt(total)+parseInt(50)));
  }
  if(val == 2){
    $("#time").text("7-10 días");
    $("#cost").text("s/ "+ (parseInt(total)+parseInt(150)));
  }
}

function realizarCompra()
{
  if(localStorage.getItem("grup_3") != null)
  {
    if(userActive != null)
    {
      var val = $('#time').text();
      if (val != '') {
        if( $('#terminos').prop('checked') ) {
            guardarCompra(userActive);
        }else{
          alert("Acepte los términos y condiciones");
        }
      }else{
        alert("Seleccione un tipo de envio");
      }
    }else{
      document.location.href='login.html';
    }
  }else{
    alert("NO HA AÑADIDO NINGÚN PRODUCTO A SU PEDIDO");
  }

}

function guardarCompra(nombre)
{
  var arrayTabla;
  //Verificar si nuestra variable datos no existe
  if(localStorage.getItem("comp_grup3") == null)
  {
      var arrayFila = [1, nombre, localStorage.getItem("grup_3"), total];
      arrayTabla = [arrayFila];
      var arrayTableJSON = JSON.stringify(arrayTabla);
      localStorage.setItem("comp_grup3", arrayTableJSON);
  }else
  {
      var arrayTabla = JSON.parse(localStorage.getItem("comp_grup3"));

      // Insertar array a tabla
      var arrayFilaInsertar = [(parseInt(arrayTabla.length)+1), nombre, localStorage.getItem("grup_3"), total];
      arrayTabla.push(arrayFilaInsertar);

      // Convertir array a JSON(cadena) y guardar en localStorage
      localStorage.setItem("comp_grup3", JSON.stringify(arrayTabla));
  }

  alert("Su compra ha sido Registrada\n" + nombre + "\nTotal de la compra: " + total);
  limpiar();
}

function limpiar(){
  localStorage.removeItem("grup_3");
  listar();
}

function mostrarCompras()
{
  var monto=0;
  $("#tblCompra").html("");
  if(localStorage.getItem("comp_grup3") != null)
  {
      var arrayTabla = JSON.parse(localStorage.getItem("comp_grup3"));
      for(var i = 0; i<arrayTabla.length; i++)
      {
          if(arrayTabla[i][4] == userActive){
            // Crear fila
            var fila = "";
            fila += "<tr>";
            fila += "<td>"+arrayTabla[i][0]+"</td>";
            fila += "<td>"+arrayTabla[i][1]+"</td>";
            fila += "<td> s/ "+arrayTabla[i][3]+"</td>";
            fila+="<td>"+'<button class="btn btn-sm btn-danger" onclick="eliminarC('+arrayTabla[i][0]+')">X</button></td>';
            fila += "</tr>";

            monto += arrayTabla[i][3];
            $("#tblCompra").append(fila);
          }
      }
  }
  var fila = "";
  fila += "<tr>";
  fila += "<th colspan=2>"+"Total:"+"</th>";
  fila += "<th>s/ "+monto+"</th>";
  fila += "<td></td>";
  fila += "</tr>";
  $("#tblCompra").append(fila);
}

function eliminarC(id)
{
    if(localStorage.getItem("comp_grup3") != null)
    {
        var arrayTabla = JSON.parse(localStorage.getItem("comp_grup3"));

        for(var i = 0; i<arrayTabla.length; i++)
        {
            if(arrayTabla[i][0] == id)
            {
                arrayTabla.splice(i, 1);
            }
        }
        localStorage.setItem("comp_grup3", JSON.stringify(arrayTabla));
        mostrarCompras();
    }
}

function login(){
  if(localStorage.getItem("user") != null){
    var arrayTabla = JSON.parse(localStorage.getItem("user"));

    for(var i = 0; i<arrayTabla.length; i++)
    {
        if(arrayTabla[i][6] == 1)
        {
            userActive = arrayTabla[i][3];
            $('#sesion_text').text(userActive);
        }
    }
  }
}

function registrar(){
  if($('#gridCheck').prop('checked')){
    if(localStorage.getItem("user") == null)
    {
        var arrayFila = [1, document.getElementById("registro_nombre").value, document.getElementById("registro_apellido").value, document.getElementById("registro_usuario").value, document.getElementById("registro_contraseña").value, document.getElementById("txtfecha").value, 1];
        arrayTabla = [arrayFila];
        var arrayTableJSON = JSON.stringify(arrayTabla);
        localStorage.setItem("user", arrayTableJSON);
    }else
    {
        var arrayTabla = JSON.parse(localStorage.getItem("user"));

        // Insertar array a tabla
        var arrayFilaInsertar = [(parseInt(arrayTabla.length)+1), document.getElementById("registro_nombre").value, document.getElementById("registro_apellido").value, document.getElementById("registro_usuario").value, document.getElementById("registro_contraseña").value, document.getElementById("txtfecha").value,1];
        arrayTabla.push(arrayFilaInsertar);

        // Convertir array a JSON(cadena) y guardar en localStorage
        localStorage.setItem("user", JSON.stringify(arrayTabla));

        for(var i = 0; i<arrayTabla.length-1; i++)
        {
            arrayTabla[i][6] == 0;
        }
    }
  }else{
    alert("Acepte los términos por favor");
  }
  document.location.href='index.html'
}
