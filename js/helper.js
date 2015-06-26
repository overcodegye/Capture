//  Declare SQL Query for SQLite
 
var createClienteTABLA = "CREATE TABLE IF NOT EXISTS TBL_CLIENTE (id integer primary key autoincrement, codigointerno integer not null, nombres varchar(50) null, apellidos varchar(50) null, dirfactura varchar(50) null, telf1 varchar(12) null, telf2 varchar(12) null, tipo char(1) null, fecreg datetime null, fecupd datetime null, usuariocre varchar(20) null, usuarioupd varchar(20) null, version integer null)";
var createVisitaClienteTABLA = "CREATE TABLE IF NOT EXISTS TBL_VISITA_CLIENTE (id INTEGER PRIMARY KEY AUTOINCREMENT, idcliente integer null, fecreg datetime null, tipo char(1) null, observacion varchar(30) null,imagen BLOB null,latitud float null,longitud float null,version integer null,foreign key(idcliente) references TBL_CLIENTE(id))";

var selectClienteTABLA = "SELECT * FROM TBL_CLIENTE";
var selectVisitaClienteTABLA = "SELECT * FROM TBL_VISITA_CLIENTE";

var insertClienteTABLA = "INSERT INTO TBL_CLIENTE (id, codigointerno, nombres, apellidos, dirfactura, telf1, tipo, fecreg, fecupd, usuariocre, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
var insertVisitaClienteTABLA = "INSERT INTO TBL_VISITA_CLIENTE (idcliente, fecreg, tipo, observacion, imagen, latitud, longitud, version) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";

/*var updateClienteTABLA = "UPDATE TBL_CLIENTE SET username = ?, useremail = ? WHERE id=?";
var updateVisitaClienteTABLA = "UPDATE TBL_VISITA_CLIENTE SET username = ?, useremail = ? WHERE id=?";

var deleteClienteTABLA = "DELETE FROM TBL_CLIENTE WHERE id=?";
var deleteVisitaClienteTABLA = "DELETE FROM TBL_VISITA_CLIENTE WHERE id=?";*/

var dropClienteTABLA = "DROP TABLE TBL_CLIENTE";
var dropVisitaClienteTABLA = "DROP TABLE TBL_VISITA_CLIENTE";
 
var db = openDatabase("dbapcli", "1.0", "Cliente Soyoda", 200000);  // Open SQLite Database
 
var dataset;

var DataType;
 
function initDatabase()  // Function Call When Page is ready.
{
    try {
        if (!window.openDatabase)  // Check browser is supported SQLite or not.
        { 
            alert('Databases are not supported in this browser.');
        }
        else {
			alert('Creo');
            createTable();  // If supported then call Function for create table in SQLite
			
        }
    }
    catch (e) {
        if (e == 2) {
            // Version number mismatch. 
            console.log("Invalid database version.");
        } else {
            console.log("Unknown error " + e + ".");
        }
        return;
    }
}
 
function createTable()  // Function for Create Table in SQLite.
{
    db.transaction(function (tx) { 
		//tx.executeSql(createClienteTABLA, [], showRecordsClienteTABLA, onError);
		tx.executeSql(createClienteTABLA);
		tx.executeSql(createVisitaClienteTABLA);
		tx.executeSql('insert into TBL_CLIENTE (id, codigointerno, nombres, apellidos, dirfactura, telf1, tipo, fecreg, fecupd, usuariocre, version) values (1, 1, "Manuel", "Palacios Huerta", "cdla los olivos mz 2343", "2485693", "a", "26-06-2015", "26-06-2015", "admin", 1)');
		showRecordsClienteTABLA();
		//tx.executeSql(createVisitaClienteTABLA, [], showRecords, onError);
	});
}
 
/*function insertRecord() // Get value from Input and insert record . Function Call when Save/Submit Button Click..
{
        var usernametemp = $('input:text[id=username]').val();
        var useremailtemp = $('input:text[id=useremail]').val();
		

        db.transaction(function (tx) { 
			tx.executeSql(insertClienteTABLA, [usernametemp, useremailtemp], loadAndReset, onError); 
			
		});
 
        //tx.executeSql(SQL Query Statement,[ Parameters ] , Sucess Result Handler Function, Error Result Handler Function );
 
}
 
function deleteRecord(id) // Get id of record . Function Call when Delete Button Click..
 
{
 
    var iddelete = id.toString();
 
    db.transaction(function (tx) { tx.executeSql(deleteStatement, [id], showRecords, onError); alert("Delete Sucessfully"); });
 
    resetForm();
 
}
 
function updateRecord() // Get id of record . Function Call when Delete Button Click..
{
 
    var usernameupdate = $('input:text[id=username]').val().toString();
 
    var useremailupdate = $('input:text[id=useremail]').val().toString();
 
    var useridupdate = $("#id").val();
 
    db.transaction(function (tx) { tx.executeSql(updateStatement, [usernameupdate, useremailupdate, Number(useridupdate)], loadAndReset, onError); });
 
}*/
 
function dropTable() // Function Call when Drop Button Click.. Talbe will be dropped from database.
{
    db.transaction(function (tx) { 
		tx.executeSql(dropClienteTABLA, [], showRecords, onError); 
		tx.executeSql(dropVisitaClienteTABLA, [], showRecords, onError); 
	});
    resetForm();
    initDatabase();
 
}
 
function loadRecord(i) // Function for display records which are retrived from database.
{
    var item = dataset.item(i);
    $("#username").val((item['username']).toString());
    $("#useremail").val((item['useremail']).toString());
    $("#id").val((item['id']).toString());
 
}
 
function resetForm() // Function for reset form input values.
{
    $("#username").val("");
    $("#useremail").val("");
    $("#id").val("");
}
 
function loadAndReset() //Function for Load and Reset...
{
    resetForm();
    showRecords()
}
 
function onError(tx, error) // Function for Hendeling Error...
{
    alert(error.message);
}
 
function showRecordsClienteTABLA() // Function For Retrive data from Database Display records as list
{
    $("#consulta").html('')
    db.transaction(function (tx) {
        tx.executeSql(selectClienteTABLA, [], function (tx, result) {
            dataset = result.rows;
            for (var i = 0, item = null; i < dataset.length; i++) {
                item = dataset.item(i);
                var linkeditdelete = '<li>' + item['nombres'] + ' , ' + item['apellidos'] + '    ' + '<a href="#" onclick="loadRecord(' + i + ');">edit</a>' + '    ' +
                                            '<a href="#" onclick="deleteRecord(' + item['id'] + ');">delete</a></li>';
                $("#consulta").append(linkeditdelete);
            }
        });
    });
}
 
/*$(document).ready(function () // Call function when page is ready for load..
{
    //$("body").fadeIn(2000); // Fede In Effect when Page Load..
    initDatabase();
    $("#submitButton").click(insertRecord);  // Register Event Listener when button click.
    $("#btnUpdate").click(updateRecord);
    $("#btnReset").click(resetForm);
    $("#btnDrop").click(dropTable);
 
});*/