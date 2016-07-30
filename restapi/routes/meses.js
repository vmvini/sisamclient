var router = require('express').Router();
var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/MesAnoWebService?wsdl";
var controller = require('rest-to-soap-mapper');
router.get('/meses', controller(wsdl, setMethodToCall ) );

function setMethodToCall(client){
	return client.getMeses;
}

module.exports = router;