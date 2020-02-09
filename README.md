# Hackton Siigo

# Scripts Disponibles
 - npm start :Ejecuta la aplicación en modo de desarrollo. Abra http: // localhost: 3000 para verlo en el navegador.
 - npm run build: Compila la aplicación para producción en la carpeta de build.

# Api CRUD Customer y Products
Se realizo una app en VueJS con sus respectiva API , las cuales se observan en APP/src/routes y su visualizacion en App.vue

Puede observar la documentacion y testear la API usando https://documenter.getpostman.com/view/8357012/SWTHbv2u?version=latest

# Cargue de datos maestros
Se uso MongoDB como BD y se cargaron archivos csv a Mongo Compass, el cual esta sincronizado con Mongo Atlas en la nube.

![Archivos cargados en Mongo Atlas](https://github.com/cinthylli/Siigo/blob/master/img/cargueDatosMaestrosMongoAtlas.JPG)

![Archivos cargados en Mongo Compass](https://github.com/cinthylli/Siigo/blob/master/img/cargueDatosMaestrosMongoCompass.JPG)

# IBM CLOUD

Estas graficas son del modelo para predecir el producto a seleccionar:
![Calificacion de los modelos generados ](https://github.com/cinthylli/Siigo/blob/master/Modelo/LeaderBoard%20IT1.JPG)
![Mapa Relacion](https://github.com/cinthylli/Siigo/blob/master/Modelo/Mapa%20de%20Relacion%20IT1.JPG)
![Metricas Cuadro Comparativo](https://github.com/cinthylli/Siigo/blob/master/Modelo/Medidas%20ChartIT1.JPG)
![Metricas Estadisticas del Mejor Modelo](https://github.com/cinthylli/Siigo/blob/master/Modelo/Medidas%20Modelo%20IT1.JPG)

Snippet JS:
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const btoa = require("btoa");
const wml_credentials = new Map();

function apiPost(scoring_url, token, mlInstanceID, payload, loadCallback, errorCallback){
	const oReq = new XMLHttpRequest();
	oReq.addEventListener("load", loadCallback);
	oReq.addEventListener("error", errorCallback);
	oReq.open("POST", scoring_url);
	oReq.setRequestHeader("Accept", "application/json");
	oReq.setRequestHeader("Authorization", token);
	oReq.setRequestHeader("ML-Instance-ID", mlInstanceID);
	oReq.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
	oReq.send(payload);
}

// NOTE: generate iam_token based on provided documentation
const wmlToken = "Bearer " + iam_token;

// NOTE: retrieve ml_instance_id based on provided documentation
const mlInstanceId = ml_instance_id;

// NOTE: manually define and pass the array(s) of values to be scored in the next line
const payload = '{"input_data": [{"fields": ["id_prod", "tenand_id", "invoice_id", "quantity", "unit_value", "item_value", "customer_id", "doc_date", "total_discount", "total_tax", "total_value", "precio_productos", "name", "description", "list_price"], "values": [array_of_values_to_be_scored, another_array_of_values_to_be_scored]}]}';
const scoring_url = "https://us-south.ml.cloud.ibm.com/v4/deployments/ed641cae-5fa2-4c16-a611-4a1568e55901/predictions";

apiPost(scoring_url, wmlToken, mlInstanceId, payload, function (resp) {
	let parsedPostResponse;
	try {
		parsedPostResponse = JSON.parse(this.responseText);
	} catch (ex) {
		// TODO: handle parsing exception
	}
	console.log("Scoring response");
	console.log(parsedPostResponse);
}, function (error) {
	console.log(error);
});

# Documentacion Utilizada:
MEVN Curso - Mongodb, Express, Vuejs y Nodejs, Parte 1 - Backend con Nodejs, Express y Mongodb
- https://www.youtube.com/watch?v=ARIzrNwA5HQ
- https://www.youtube.com/watch?v=NQFaukftHpg
