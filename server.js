
const express=require('express');
const app=express();
app.use(express.json());
app.use(express.static('public'));

let abastecimentos=[];

app.get('/api/abastecimentos',(req,res)=>res.json(abastecimentos));

app.post('/api/abastecimentos',(req,res)=>{
 const d=req.body;
 const km=(d.hodometroFinal-d.hodometroInicial);
 const consumo= d.litros ? km/d.litros : 0;
 const valor=d.litros*d.precoLitro;
 const item={...d,km,consumo,valor,id:Date.now()};
 abastecimentos.push(item);
 res.json(item);
});

app.listen(3000,()=>console.log('http://localhost:3000'));
