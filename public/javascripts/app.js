var init = function() {
  	$('#acciones').on('click','.borrar',function(evnt){
  
  		$.post("/borrar_serv",{id:evnt.target.id.substring(3)} , function(){
          $(evnt.target).remove();
          // alert("Servicio borrado")
          location.reload()
      })
    })

      $('#acciones').on('click','.edit',function(){
        var servicio = $(this).attr("data")
        var id_serv = $(this).attr("id");
        console.log(id_serv)
        
        $("#upd_serv").append('<span class="Servicio "id="' + id_serv.substring(2) + '">' + servicio + '</span>')
    })

    $('#guardar_cambios').on('click',function(){
      var precio = $("#cambiar_precio").val();
      var id = $(".Servicio").attr("id")
      
      
  		$.post("/upd_serv",{precio: precio, id: id} , function(){
          // alert("Servicio actualizado")
          location.reload()
  		})

  	})

  $.get("/Servicio", function(data) {
    for (let i = 0; i < data.length; i++) {
      $("#servicio").append(
        $(
          '<option name="serv" value="' +
            data[i].id +
            '">' +
            data[i].Nombre +
            "</option>"
        )
      );
    }
  });

  $.get("/Serv_precio", function(data) {
    for (let i = 0; i < data.length; i++) {
      $("#servicios").append('<label id="' + data[i].id_serv + '">' + data[i].Nombre_Servicio + '</label><br>');

      $("#precios").append("<span>" + data[i].PrecioServicio + "</span><br>");

      $("#acciones").append('<button type="button" data-toggle="modal" data-target="#myModal" data="' + data[i].Nombre_Servicio +'" id="up'+ data[i].id +'" class=" edit btn btn-primary">Editar</button>' + 
      '<button type="button" id="del'+ data[i].id +'" class=" borrar btn btn-danger">Borrar</button><br>')
    }
  });

  $("#registrar_servicio").on("click", function(data) {
    var precio = $("#precio").val();
    var servicio = $("#servicio").val();
    $.post("/Servicio", { servicio: servicio, precio: precio }, function(
      results
    ) {
      // alert("datos enviados");
      location.href = "/panelEmpresa";
    });
  });

  $.get("/getGimnasios", function(data) {
    for (let i = 0; i < data.length; i++) {
      $("#getgym").append(
        '<div class="col-lg-4"><div class="row"><h2 id="' +
          data[i].Nombre +
          '">' +
          data[i].Nombre +
          '</h2><div class="col-lg-6"><h3>Servicios</h3><ul id="ser_' +
          data[i].Nombre +
          '">' +
          '</ul></div><div class="col-lg-6"><h3>Precios</h3><ul id="pre_' +
          data[i].Nombre +
          '"></ul></div></div><button type="button" name="' + data[i].Nombre +'" class="traer btn btn-info btn-lg" id="bt' +
          data[i].Nombre +
          '">' + 'Elegir Servicio</button></div>'
      );
    }
  });
  

  $.get("/Servicio/index", function(data) {
    var h2 = $("h2");
    for (let j = 0; j < h2.length; j++) {
      for (let i = 0; i < data.gymserv.length; i++) {
        if (data.gymserv[i].Nombre_Gimnasio == h2.eq(j).attr("id")) {
          $('#ser_' + data.gymserv[i].Nombre_Gimnasio).append(
            '<li id="' +
              data.gymserv[i].id_ser +
              '">' +
              data.gymserv[i].Nombre_Servicio +
              '</li>'
          );
          $('#pre_' + data.gymserv[i].Nombre_Gimnasio).append(
            "<li>" + data.gymserv[i].Precio_Servicio + "</li>"
          );
        }
      }
    }
  })

    setTimeout(()=>{
      $(document).on('click', ".traer", function() {
        var nombre = $(this).attr("name");
        localStorage.setItem("Nombre_Gym", nombre)
        location.href = "/Inscripcion"
      })
    }, 20)
        var nombre = localStorage.Nombre_Gym
        console.log(nombre)
        $.post("/Inscripcion", {nombre: nombre}, function(data){
          $("#gym").text(data[0].N_gym)
          for(let i = 0; i < data.length; i++){
            if(data[i].N_gym = nombre){
              $("#servicio_ins").append('<option id="' + data[i].id_serv + '">' + data[i].S_gym + '</option>');
            }
          }
        })
        
        // var servicios =[]
        $("#Selec_serv").on('click', function() {
          var servicio = $("option:selected").text()
          console.log(servicio)
          $.post("/Inscripcion/servicio", {servicio: servicio, nombre: nombre}, function(data){
          if($("#ser").append('<li data-id="' + data[0].id_tabla + '" class="esteServicio">' + data[0].S_gym + '</li>')){
            // servicios = $("#ser li");
            // console.log(servicios)
          }
            
            $("#pre").append('<li class="lalala">' + data[0].precio + '</li>')
          })
          $("option:selected").remove()
        })
        // console.log("aqui", servicios)

          
        $("#inscribir").on('click', function() {
          var serviciosjuan;
          var preciosjuan;
          // $(".lalala").each(function(index) {
          //   var precios = $(this).text();
          //   preciosjuan[index] = precios 
          // })
          $(".esteServicio").each(function() {
            var servicio_id = $(this).data('id');
            serviciosjuan = servicio_id
        });
        
        var parametros = {
            id_servicios: serviciosjuan
            // precio_servicios: preciosjuan
        };
          console.log(parametros)
        //petición ajax
        // $.post("/FinalizarInscripcion", parametros, function(data) {

        // })
        $.ajax({
            url: "/FinalizarInscripcion",
            method: "post",
            data:parametros,
            success: function(data) {
               alert("OK");
            },

        })
           var elementos = $(".esteServicio"); 
        })

        $(".buscador").on('click', function() {
           var localidad = $(".localidad").val();
          var servicio = $("#servicio").val();
          console.log(localidad)
          $.post("/getGimnasiosIndex", {localidad: localidad, servicio: servicio}, function(data) {
            debugger

              for(let i = 0; i < data.length; i++) {
              $("#hola").append('<div class="col-md-6"><h2>' + data[i].Nombregym + '</h2><ul>'+
            '<li>Direccion: ' + data[i].direc_gym + 
            '</li><li>Localidad: ' + data[i].localidad + 
            '</li><li>Provincia: ' + data[i].prov_gym + 
            '</li><li>Teléfono: ' + data[i].tel_gym + 
            '</li><li>E-mail: ' + data[i].email_gym + 
            '<li>Servicio: ' + data[i].Nombreser + '</li>'+
            '<li>Precio: ' + data[i].PrecioServicio + '</li>' + 
            '</li></ul><button id="' + data[i].Nombregym + '" type="button" class="este btn btn-success btn-lg" ' +
            'style="padding: 20;font-size: 25px;margin-left:150px;">Registrar</button></div>')
            }
            
          })  
        })

        $(".new_busqueda").on('click', function() {
          location.reload();
        })

        $(document).on('click', '.este',function(){
          console.log("hola")
          location.href = "/gimnasios"
        })
        // var user = req.session.user.id
        // $.post("/getInscripciones", {user: user}, function(data) {
        //   for(let i = 0; i < data.length; i++) {
        //     $("#Inscripciones").append('<li>' +  + '</li>')
        //   }
          
        // })
  


  $("#registrar_usuario").on("click", function() {
    var d_form = {
      nombre: $("#nombre").val(),
      apellido1: $("#apellido1").val(),
      apellido2: $("#apellido2").val(),
      telefono: $("#telefono").val(),
      DNI: $("#DNI").val(),
      direccion: $("#direccion").val(),
      email: $("#email_reg").val(),
      provincia: $("#provincia").val(),
      localidad: $("#localidad").val(),
      password: $("#password_reg").val()
    };
    $.post("/Signup", d_form, function(results) {
      console.log(" jquery", d_form);
    }).done(function(results) {
      if (results.error === null) {
        location.href = "/Sign";
      } else {
        $("#error").css("display", "block");
      }
    });
  });

  $("#registrar_empresa").on("click", function() {
    var form_empresa = {
      nombre: $("#nombre_empresa").val(),
      telefono: $("#telefono_empresa").val(),
      direccion: $("#direccion_empresa").val(),
      email: $("#email_empresa").val(),
      provincia: $("#provincia_empresa").val(),
      localidad: $("#localidad_empresa").val(),
      password: $("#password_empresa").val()
    };
    jQuery
      .post("/reg_empresa", form_empresa, function(results) {})
      .done(function(results) {
        if (results.error === null) {
          location.href = "/panelEmpresa";
        } else {
          $("#error").css("display", "block");
        }
      });
  });

  $("#Signin").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    $.post("/Sign", { email: email, password: password }, function() {
    }).done(function() {
      location.href = "/perfilUsuario"
    });
  });

  $("#SigninEmpresa").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    $.post("/SignEmpresa", { email: email, password: password }, function() {
    }).done(function() {
      $.get("/", function() {
        location.href = "/panelEmpresa";
      });
    });
  });

  $("#Logout").on("click", function() {
    $.get("/Logout", function() {
      // location.href("/");
    });
  });

  // 	// jQuery.post( "api/tareas/crear",{nombre:$("#newTarea").val()} , function(tarea){

  // 	// 			$('#listaElementos').
  // 	// 		append($('<li class="tarea" id="tarea_' + tarea.id + '">' + tarea.nombre +'</li>'));
  // 	// 		$('#newTarea').val('');

  // 	// } )

  // })

  $(function() {
    $("#login-form-link").click(function(e) {
      $("#login-form")
        .delay(100)
        .fadeIn(100);
      $("#register-form").fadeOut(100);
      $("#register-form-link").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });
    $("#register-form-link").click(function(e) {
      $("#register-form")
        .delay(100)
        .fadeIn(100);
      $("#login-form").fadeOut(100);
      $("#login-form-link").removeClass("active");
      $(this).addClass("active");
      e.preventDefault();
    });
  });
};
function initMapMultiPuntosCenter() {
  
  var latlong1 = new google.maps.LatLng(36.7647499, -4.5642737);
  var latlong2 = new google.maps.LatLng(36.718855, -4.421054);
  var latlong3 = new google.maps.LatLng(36.722588, -4.442270);
  
  var opcionesMapa = {
      center: latlong1,
      zoom: 16,
      mapTypeControl: true,
      navigationControlOptions: {style:google.maps.NavigationControlStyle.SMALL}
      
  };
  
  var map = new google.maps.Map(document.getElementById("map"), opcionesMapa);
  var marker1 = new google.maps.Marker({position:latlong1, map:map, title:"Synergym"});
  var marker2 = new google.maps.Marker({position:latlong2, map:map, title:"Atenas"});
  var marker3 = new google.maps.Marker({position:latlong3, map:map, title:"Slimfit"});

  
  var boundbox = new google.maps.LatLngBounds();
  
  boundbox.extend(latlong1);
  boundbox.extend(latlong2);
  boundbox.extend(latlong3);
  
  map.setCenter(boundbox.getCenter());
  map.fitBounds(boundbox);
  
}
$().ready(init);



// function iniciarMapa() {
//   var map = new google.maps.Map(document.getElementById('map'), {
//     zoom: 15,
//     center: {lat: 36.717856, lng: -4.433775}
//   });
//   var geocoder = new google.maps.Geocoder();

//   document.getElementById('submit').addEventListener('click', function() {
//     geocodeAddress(geocoder, map);
//   });
// }

// function geocodeAddress(geocoder, resultsMap) {
//   var address = document.getElementById('address').value;
//   resultsMap
//   geocoder.geocode({'address': address + "España"}, function(results, status) {
//     if (status === 'OK') {
//       resultsMap.setCenter(results[0].geometry.location);
//       var marker = new google.maps.Marker({
//         map: resultsMap,
//         position: results[0].geometry.location
//       });

//     } else {
//       alert('Geocode was not successful for the following reason: ' + status);
//     }
//   });
// }