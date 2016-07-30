var router = require('express').Router();
var controller = require('../controllers/SisamWSController');
var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/MesAnoWebService?wsdl";

router.get('/meses', controller(wsdl, setMethodToCall ) );

function setMethodToCall(client){
	return client.getMeses;
}

module.exports = router;