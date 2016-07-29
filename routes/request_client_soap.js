var soap = require('soap');


var createRequestSoapClient = function(router){

	return function(wsdl, clientSoapCallback){
		router.get('/', function(req, res, next){

			console.log("recebeu requisicao");
			soap.createClient(wsdl, function(err, client){
				if(err){
					res.status(404);
					res.json({err:err, message: "erro ao conectar com webservice"});
					return;
				}
				if(!client){
					res.status(404);
					res.json({message:"nenhum cliente foi obtido" });
					return;
				}

				console.log("recebeu cliente webservice");

				clientSoapCallback(client, req, function(err){

					if(err){
						res.status(404);
						res.json({err:err, message: "erro ao chamar método"});
						return;
					}

				}, function(result){

					if(!result){
						res.status(404);
						res.json({message: "resultado nulo!"});
						return;
					}

					res.status(200);
					res.json({message:"success", result:result});

				});

			});
		});

	};

}

module.exports = createRequestSoapClient;