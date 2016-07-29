var express = require('express');
var router = express.Router();
var soap = require('soap');
var createRequestSoapClient = require('./request_client_soap');

var cidadesUrl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/CidadesWebService?wsdl';


var requestSoapClient = createRequestSoapClient(router);


requestSoapClient(cidadesUrl, function(client, req,  errcallback, resultcallback){

  var args = {
    cidade: req.query.cidade
  };

  client.getMunicipios(args, function(err, result){
    
    errcallback(err);
    resultcallback(result);

  });

} );


module.exports = router;
