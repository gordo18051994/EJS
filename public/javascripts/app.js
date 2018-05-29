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

  $.get("/Serv_precio", function (data) {
    console.log(data)
    for(let i = 0; i < data.length; i++){
      $("#servicios").append('<li>' + data[i].Nombre_Servicio + '</li>')
    
    $("#precios").append('<li>' + data[i].PrecioServicio + '</li>')
    }
  })

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
      .post("/reg_empresa", form_empresa, function(results) {
        debugger;
      })
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

function iniciarMapa() {
  var uluru = { lat: 36.71781, lng: -4.433715 };
  var map = new google.maps.Map(document.getElementById("map"), {
    zoom: 18,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}
