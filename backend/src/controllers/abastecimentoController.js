exports.calcular=(req,res)=>{
const km=req.body.hodometro_final-req.body.hodometro_inicial;
const consumo=km/req.body.litros;
const valor=req.body.litros*req.body.preco_litro;
res.json({km,consumo,valor});
}