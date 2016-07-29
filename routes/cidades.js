var express = require('express');
var router = express.Router();
var soap = require('soap');

var cidadesUrl = 'http://sisam.cptec.inpe.br/sisam_webservice/services/CidadesWebService?wsdl';

router.get('/', function(req, res, next) {
  var args = {
    cidade: req.query.cidade
  };

  soap.createClient(cidadesUrl, function(err, client) {
    if (err) {
      res.status(404);
      res.json({
        err: err,
        message: "Erro: Não foi possível conectar ao webservice 'CidadesWebService'."
      });
      return;
    }

    if (!client) {
      res.status(404);
      res.json({
        message: "Erro: Não foi possível obter um cliente para o webservice."
      });
      return;
    }

    client.getMunicipios(args, function(err, result) {
      if (err) {
        res.status(404);
        res.json({
          err: err,
          message: "Erro: Não foi possivel realizar chamada do metodo 'getMunicipios'."
        });
        return;
      }

      if (!result) {
        res.status(404);
        res.json({
          message: "Erro: Nenhum resultado foi obtido."
        });
        return;
      }

      res.status(200);
      res.json({
        message: "success",
        result: result
      });
    });
  });
});

module.exports = router;
