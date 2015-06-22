var server = "http://petshome-ec.com/Cisc_Parking/public"; /*Nombre del dominio del server petshome-ec.com*/
var intervalos;


//---------------------------------------------------------------------------------------------------------------------------
//Login Aplicacion
//---------------------------------------------------------------------------------------------------------------------------
function LoginAPP() {
    $("#loginbtn").html("cargando...");
    $.ajax({
        url: server + "/default/index/loginmovil?user=" + $('#txt_user').val() + "&&pass=" + $('#txt_pass').val(),
        type: "post",
        data: '',
        success: function (data) {
            if (data != "ERROR") {
                location.href = "main.html?noma_user=" + $('#txt_user').val() + "&&cod_user=" + data+"&&nom_user=" + $('#txt_user').val();
            } else {
                $('#txt_user').val('');
                $('#txt_pass').val('');
                $("#txt_user").focus();
                alertas("Por Favor Verificar Usuario y Clave...");
            }
            $("#loginbtn").html("Login");
        }
    });
}


function menuAPP(menu) {
    $('#contenerdor').html('');
    $('#contenerdor').load(menu);
}

function graficos_cars_index() {
    $.ajax({
        url: server + "/default/reservacion/graficosautosindex",
        type: "post",
        data: '',
        success: function (data) {

            var mystring = data;
            var find = "Cisc_Parking";
            var regex = new RegExp(find, "g");
            mystring = mystring.replace(regex, "");

            find = "/public/libs/";
            regex = new RegExp(find, "g");
            mystring = mystring.replace(regex, "");

            find = "_";
            regex = new RegExp(find, "g");
            mystring = mystring.replace(regex, "");

            find = "/images";
            regex = new RegExp(find, "g");
            mystring = mystring.replace(regex, "images");


            $("#div_reservaciones").html(mystring);
        }
    });
}

function escapeRegExp(string) {
    return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
}

function replaceAll(string, find, replace) {
    return string.replace(new RegExp(escapeRegExp(find), 'g'), replace);
}

function graficos_cars_cli() {
    $.ajax({
        url: server + "/default/reservacioncli/graficosautos",
        type: "post",
        data: '',
        success: function (data) {

            var mystring = data;
            var find = "/Cisc_Parking";
            var regex = new RegExp(find, "g");
            mystring = mystring.replace(regex, "");

            find = "/public/libs/";
            regex = new RegExp(find, "g");
            mystring = mystring.replace(regex, "");

            find = "_";
            regex = new RegExp(find, "g");
            mystring = mystring.replace(regex, "");

            find = "/images";
            regex = new RegExp(find, "g");
            mystring = mystring.replace(regex, "images");


            $("#div_reservaciones").html(mystring);
        }
    });
}

function NUEVOFORMULARIORESERVA(id_parqueo) {
    $('#contenerdor').html('');
    //$('#contenerdor').load(server + "/default/reservacioncli/movillist?id=&id_parqueo=" + id_parqueo);
    $.ajax({
        url: server + "/default/reservacion/frmingreso?id_user=" + $.urlParam('cod_user') + "&&id=1&&id_parqueo=" + id_parqueo,
        type: "post",
        data: '',
        success: function (data) {
            $("#contenerdor").html(data);
        }
    });
}

function GUARDARFORMULARIO() {
    //Evitar el doble click
    $("#btn_guardar").attr("disabled", "disabled");
    $.ajax({
        url: server + "/default/reservacioncli/Guardar?cod_cliente=" + $("#cod_cliente").val() + "&&est_movimiento=" + $("#est_movimiento").val() + "&&vehiculo=" + $("#vehiculo").val() + "&&id_dimension=" + $("#id_dimension").val() + "&&fecha=" + $("#fecha").val() + "&&id=",
        type: "post",
        data: '',
        success: function (data) {
            update_qrcode(data);
            alertas("Proceso Realizado");
        }
    });
}

function CANCELARFORMULARIO() {
    menuAPP("reservas.html");
}

function notificaciones() {
    $.ajax({
        url: server + "/default/notificacion/usermovil?id_user=" + $.urlParam('cod_user'),
        type: "post",
        data: '',
        success: function (data) {
            $('#notificaciones').html('');
            $("#notificaciones").html(data);
        }
    });
}

function historico() {
    $.ajax({
        url: server + "/default/porcobrar/listadomovil?id_user=" + $.urlParam('cod_user') + "&&page=1&&filtros=null",
        type: "post",
        data: '',
        success: function (data) {
            $('#historico').html('');
            $("#historico").html(data);
        }
    });
}


//---------------------------------------------------------------------------------------------------------------------------
//Generales
//---------------------------------------------------------------------------------------------------------------------------
function alertas(suceso) {
    $("#alertas").show();
    $("#alertas").html(suceso);
    setTimeout("$('#alertas').hide();",2000);
}
