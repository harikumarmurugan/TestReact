class Router
{

    constructor(app,db)
    {

        this.login(app,db);
        // this.logout(app,db);
        this.isLoggedIn(app,db);
    }

    login(app,db)
    {
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

    }

    isLoggedIn(app,db)
    {

        app.get('/isLoggedIn',(req,res)=> {
        res.json({
            success:false,
            msg:'Error occurred 2' 
        });

        return;
        });
    }
    

}

// logout(app,db)
// {

// }




module.exports= Router;