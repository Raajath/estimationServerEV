const express=require('express');
const {router}=require('./route');
const app=express();
const PORT=8080;
app.use(express.json());
app.use(router);
app.use((req, res, next)=>{
  res.status(404);
  res.json({
    error: 'Not found',
  });
});

app.listen(PORT);
module.exports={app};
