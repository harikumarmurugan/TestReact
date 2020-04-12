import React from 'react';
import {observer} from 'mobx-react';
import UserStore from './Stores/UserStore';
import LoginForm from './Login';
import './App.css';


class App extends React.Component
{
  
  async componentDidMount()
  {

    try{
        let res= await fetch('http://localhost:3001/isLoggedIn',{
        method:'Post',
        headers:        {
          'Accept':'application/json',
          'Content-Type':'application/json'
        }

        })

        let result= await res.json();

        if(result && result.success){
              UserStore.loading=false;
              UserStore.isLoggedIn=true;
              UserStore.UserName=result.userName;
        }
        else
        {
          UserStore.loading=false;
          UserStore.isLoggedIn=false;
          UserStore.UserName=result.userName;

        }

    }
    catch(e){
        
      UserStore.loading=false;
      UserStore.isLoggedIn=false;
    }

  }

  async doLogout()
  {

    try{
        let res= await fetch('/logout',{
        method:'Post',
        headers:
        {
          'Accept':'application/json',
          'Content-Type':'application/json'
        }

        })

        let result=await res.json();

        if(result && result.success){
              UserStore.loading=false;
              UserStore.isLoggedIn=false;
              UserStore.UserName='';
        }

    }
    catch(e){
        console.log(e);
    }

  }

  render(){
    {        
        if (!UserStore.loading)
        {
          return (

          
          <div className="container">
              <LoginForm/>    
              </div>
          
          );
        }
        else
        {
          return (
          <div className="app">
                <div className="container">
                 Loading, please wait...
                  </div>
           </div>
          );
        }
    }
   
  }
}

export default observer(App);


