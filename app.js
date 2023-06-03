const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const request=require('request');
const https=require('https');
app.use(bodyparser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})
app.post('/',(req,res)=>{
  var email=req.body.email;
  var firstname=req.body.firstname;
  var lastname=req.body.lastname;
  var data={
    members:[
        {
            email_address: email,
            status:"subscribed",
            merge_fields:{
                FNAME:firstname,
                LNAME:lastname
            }

        }
    ]
  };
  var jsondata=JSON.stringify(data);
  
  const url='https://us21.api.mailchimp.com/3.0/lists/efa84ed752'
  const options={
      method:"POST",
      auth:"manuj:b091e84b837d88b481cd0070d3ed1a47-us21"
  }
 const request= https.request(url,options,(response)=>{
      response.on("data",(data)=>{
          let check=JSON.parse(data);
          
          if(check.error_count==0)
          {
            res.sendFile(__dirname+'/sucess.html');
          }
          else{
            res.sendFile(__dirname+'/failure.html');
          }
      })
  })
  request.write(jsondata);
  request.end();
})
app.post('/failure',(req,res)=>{
  res.redirect('/');
})

app.listen(3000,()=>{
    console.log('server started at  '+3000);
})
//api key
//b091e84b837d88b481cd0070d3ed1a47-us21

//list-id
//efa84ed752