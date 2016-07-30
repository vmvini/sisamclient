var router = require('express').Router();
var wsdl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/CidadesWebService?wsdl';
var controller = require('rest-to-soap-mapper');
router.get('/estados', controller(wsdl, setMethodToCall ) );

function setMethodToCall(client){
	return client.getEstados;
}

module.exports = router;
