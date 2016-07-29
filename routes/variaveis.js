var express = require('express');
var router = express.Router();
var soap = require('soap');
var variaveisUrl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/VariaveisWebService?wsdl';


router.get('/', function(req, res, next){
	var args = {};
	
	soap.createClient(variaveisUrl,  function(err, client) {
	   	
		if(err){
			res.status(404);
			res.json({err:err, message: "erro ao conectar com webservice variaveis"});
			return;
		}

		if(!client){
			res.status(404);
			res.json({message:"nenhum cliente foi obtido" });
			return;
		}

	    client.getListaVariaveis(args, function(err, result) {

	    	if(err){
	    		res.status(404);
	    		res.json({err:err, message: "erro ao chamar getListaVariaveisDesc"});
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