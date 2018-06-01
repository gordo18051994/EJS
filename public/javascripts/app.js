var init = function() {
  // 	// $('#listaElementos').on('click','.tarea',function(evnt){

  // 	// 	jQuery.post( "api/tareas/borrar",{id:evnt.target.id.substring(6)} , function(tarea){

  // 	// 			$(evnt.target).remove();
  // 	// 	})

  // 	// })

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
      $("#servicios").append("<li>" + data[i].Nombre_Servicio + "</li>");

      $("#precios").append("<li>" + data[i].PrecioServicio + "</li>");
    }
  });

  $("#registrar_servicio").on("click", function(data) {
    var precio = $("#precio").val();
    var servicio = $("#servicio").val();
    $.post("/Servicio", { servicio: servicio, precio: precio }, function(
      results
    ) {
      alert("datos enviados");
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
          '"></ul></div></div><button type="button"name="' + data[i].Nombre +'" class="traer" id="bt' +
          data[i].Nombre +
          '">' + 'View details &raquo;</button></div>'
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

    setTimeout(()=>{$(".traer").on('click', function() {
      var name = $(this).attr("name")
      
      $.post("/Inscripcion", {name: name}, function(data) {
        $(".gym").append('<li>' + data[0].N_gym + '</li>');
     
        for(let i = 0; i < data[i].length; i++){
          debugger
          $("#ser").append('<li>' + data[i].S_gym + '</li>');
          $("#pre").append('<li>' + data[i].precio + '</li>');
    }})
      })
      }, 40)

    
  


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
        alert("Usuario Registrado");
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
          alert("Empresa Registrado");
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
      alert("Logueado");
    }).done(function() {
      $.get("/", function() {
        alert("pagina principal");
        location.href = "/";
      });
    });
  });

  $("#SigninEmpresa").on("click", function() {
    var email = $("#email").val();
    var password = $("#password").val();
    $.post("/SignEmpresa", { email: email, password: password }, function() {
      alert("Empresa Logueada");
    }).done(function() {
      $.get("/", function() {
        alert("pagina principal Empresa");
        location.href = "/panelEmpresa";
      });
    });
  });

  $("#Logout").on("click", function() {
    $.get("/Logout", function() {
      alert("LogOut con Éxito");
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

$().ready(init);



// function iniciarMapa() {
//   var uluru = { lat: 36.71781, lng: -4.433715 };
//   var map = new google.maps.Map(document.getElementById("map"), {
//     zoom: 18,
//     center: uluru
//   });
//   var marker = new google.maps.Marker({
//     position: uluru,
//     map: map
//   });
// }
