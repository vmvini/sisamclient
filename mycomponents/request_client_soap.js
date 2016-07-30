var soap = require('soap');

var createRequestSoapClient = function(req, res){

	return function(wsdl, clientSoapCallback){
		//router.get('/', function(req, res, next){
			console.log("recebeu requisicao");
			soap.createClient(wsdl, function(err, client){
				var soapClient;

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

				soapClient = new SoapClient(client);

				console.log("construiu soapClient");

				clientSoapCallback(soapClient);

			});
		//});

	};
	
	function SoapClient(client){

		var args;
		var methodToCall;

		this.setArgs = function(argsParam){
			args = argsParam;
			return this;
		};

		this.setMethodToCall = function(callback){
			methodToCall = callback(client);
			return this;
		};


		this.execute = function(){
			methodToCall.call(client, args, function(err, result){

				if(err){
					res.status(404);
					res.json({err:err, message: "erro ao chamar método"});
					return;
				}

				if(!result){
					res.status(404);
					res.json({message: "resultado nulo!"});
					return;
				}

				res.status(200);
				res.json({message:"success", result:result});

			} );
		};

	}


}

module.exports = createRequestSoapClient;