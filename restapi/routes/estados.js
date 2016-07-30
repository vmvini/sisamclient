var router = require('express').Router();
var controller = require('../controllers/SisamWSController');
var wsdl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/CidadesWebService?wsdl';

router.get('/estados', controller(wsdl, setMethodToCall ) );

function setMethodToCall(client){
	return client.getEstados;
}

module.exports = router;
