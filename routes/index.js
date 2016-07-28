var express = require('express');
var router = express.Router();
var soap = require('soap');

var cidadesUrl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/CidadesWebService?wsdl';
var mesAnoUrl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/MesAnoWebService?wsdl';
var variaveisUrl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/VariaveisWebService?wsdl';
var tabulacaoUrl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/TabulacaoWebService?wsdl';



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/cidade', function(req, res, next){
	console.log("cidade requisitada: " + req.query.cidade);
	var args = {cidade: req.query.cidade};
	
	soap.createClient(cidadesUrl,  function(err, client) {
	   	
		if(err){
			res.status(404);
			res.json({err:err, message: "erro ao conectar com webservice cidades"});
			return;
		}

		if(!client){
			res.status(404);
			res.json({message:"nenhum cliente foi obtido" });
			return;
		}

	    client.getMunicipios(args, function(err, result) {

	    	if(err){
	    		res.status(404);
	    		res.json({err:err, message: "erro ao chamar getMunicipios"});
	    		return;
	    	}

	    	if(!result){
	    		res.status(404);
	    		res.json({message: "resultado nulo!"});
	    		return;
	    	}

	        res.status(200);
	        res.json( {message: "success", result: result} );
	    });
	});

});

module.exports = router;
