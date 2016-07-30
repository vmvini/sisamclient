var createRequestSoapClient = require('../../mycomponents/request_client_soap');

var handleRequest = function(wsdl, setMethodToCall, setArgs ){

	return function(req, res){
		
		var args = {};
		
		if(setArgs !== undefined){
			args = setArgs(req);
		}
		
		var requestSoapClient = createRequestSoapClient(req, res);

		requestSoapClient(wsdl, function(soapClient){

			soapClient
				.setArgs(args)
				.setMethodToCall( function(client){
					return setMethodToCall(client);
				} )
				.execute();

		});

	};



};


module.exports = handleRequest;
