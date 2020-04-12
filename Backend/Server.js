const express= require('express');
const app=express();
const path=require('path');
const mysql=require('mysql');
const session=require('express-session');
const mysqlStore=require('express-mysql-session')(session);
const Router =require('./Router');


app.use(express.static(path.join(__dirname,'build')));

app.use(express.json());

const db=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Test@123',
    database :'TestEnvironment'

});

db.connect(function(err){
    if(err)
    {
        console.log('Db error');
        throw err;
        return false;
    }
});

const sessionStorage= new mysqlStore({

    expiration:(1825*1000)
},db);

app.use(session({
    key:'wqwqekhwekfasdf',
    secret:'sdgdfgdfgdfgdf',
    store:sessionStorage,
    resave:false,
    saveUninitialized:false,
    cookie:{
        maxAge:(1825*1000),
        httponly:false
    }


}));


new Router(app,db)

app.get('/',function(req,res){
    res.sendFile(path.join(__dirname,'build','index.html'));
});

        app.post('/login',(req,res)=> {

            let uname= req.body.username;
            let password= req.body.password;
            uname = uname.toLowerCase();
            
            

            let cols=[uname];

            console.log('Select * from Tbl_UserDetails where username= ? ')

            db.query('Select * from Tbl_UserDetails where Name= ? ',cols,(err,data,fields)=>{

                if(err)
                {
                    res.json({
                        success:false,
                        msg:'Error occurred 1' 
                    });
                }

                if(data && data.length===1)
                {
                    console.log(password);
                    console.log(data[0].Password);
                    //console.log(password + data[0].password +password==data[0].password)

                       if(password==data[0].Password)
                       {
                        req.session.userID=   data[0].user_id;
                        res.json({
                            success:true,
                            username:data[0].username
                        });
                        return;
                       } 
                       else
                       {
                        res.json({
                            success:false,
                            msg:'Invalid user cred'
                        });
                        return;
                       }


                }
                else
                {
                 
                    res.json({
                        success:false,
                        msg:'user Not exists'
                    });
                    return; 
                }

            })

        })



        app.get('/isLoggedIn',(req,res)=> {
        res.json({
            success:false,
            msg:'Error occurred 2' 
        });

        return;
        });




app.listen(3000);
