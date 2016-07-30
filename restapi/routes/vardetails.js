var router = require('express').Router();
var controller = require('../controllers/SisamWSController');

var wsdl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/VariaveisWebService?wsdl';

router.get('/vardetails', controller( wsdl, setMethodToCall ) );

function setMethodToCall(client){
	return client.getListaVariaveisDesc;
}

module.exports = router;
