var router = require('express').Router();
var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/MesAnoWebService?wsdl";
var controller = require('../controllers/SisamWSController');

router.get('/anos', controller(wsdl, setMethodToCall ) );


function setMethodToCall(client){
	return client.getAnos;
}

module.exports = router;

