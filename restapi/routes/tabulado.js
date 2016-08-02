var router = require('express').Router();
var controller = require('rest-to-soap-mapper');
var wsdl = "http://sisam.cptec.inpe.br/sisam_webservice/services/TabulacaoWebService?wsdl";

router.post('/tabulado', validate,  controller(wsdl, setMethodToCall, setArgs ) );

function validate(req, res, next){

	if( !req.body.tabulado ){
		res.status(404);
		res.json({message:"dados tabulares nao encontrados na requisicao"});
		return;
	}
	next();

}

function setArgs(req){
	/*var args = {

		
		opc_data:'ano',
		mes:null,
		ano:[
			"2012-12-31",
		      "2011-12-31",
		      "2010-12-31",
		      "2009-12-31",
		      "2008-12-31",
		      "2007-12-31",
		      "2006-12-31",
		      "2005-12-31",
		      "2004-12-31"
		],
		//data_inicial:"2012-12-31",
		//data_final:new Date(),

		opc_estMun:'municipio',
		estado:[
		"SP"

		],
		municipio:[
			"3976" //gid
		],

		vars:[
		"focoq",
		"rad_uv",
		"tmp_ar_max",
		"umid_ar_max"
		]

	};*/

	var args = req.body.tabulado;
	return args;
}

function setMethodToCall(client){
	return client.getDadosTabulados;
}

module.exports = router;
