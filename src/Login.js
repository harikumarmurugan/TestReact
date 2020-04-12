import React from 'react';
import './App.css';
import {observer} from 'mobx-react';
import UserStore from './Stores/UserStore';
import  ButtonField from './ButtonField';
import InputField from './inputField';
import {BrowserRouter as Router,NavLink}from 'react-router-dom' ;
import 'bootstrap/dist/css/bootstrap.min.css'
import {connect}  from 'react-redux';




class LoginForm extends React.Component
{
constructor(props)
{
    super(props);
    this.state={
        username:'',
        password:'',
        buttonDisabled:false
    }
    
}



async setInputvalue(property,val)
{
    val=val.target.value.trim();
    if(val.length > 12 )
    {
        return;
    }
    this.setState({
        [property]:val
    });

    

}

async resetForm(){
    await this.setState({
        username:'',
        password:'',
        buttonDisabled:false
    });

    }

async doLofin(){
    if(!this.state.username)
    return;
    if(!this.state.password)
    return; 
    this.setState({
        buttonDisabled:true
    })

    try{

        let res=await fetch('http://localhost:3001/login',{
            method:'post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                 username:this.state.username,
                 password:this.state.password
            })

        });

        let result=await res.json();
        if(result && result.success)
        {
            UserStore.username=result.username;
            UserStore.isLoggedIn=true;
            UserStore.loading=false;
            alert('success');
            // this.mapDispatchToProps.onSave();
            window.location.href='/home';

            

        }
        else
        {
            this.resetForm();
            alert(result.msg);
        }

    }
    catch(e)
    {
        console.log(e);
        this.resetForm();
        UserStore.username='test';
        UserStore.isLoggedIn=true;
        UserStore.loading=false;
    }

}

render(){
    return (
        <div >
        <div >
          <div id="logreg-forms">
            <form className="form-signin">
            <h1 className="h3 mb-3 font-weight-normal"> Sign in</h1>
            <input type="text" id="inputEmail" className="form-control"    required=""  placeholder='Username' 
            value={this.state.username ? this.state.username:''}
            onChange={((val) => this.setInputvalue('username',val))}
            />
            <input type="password" id="inputPassword" className="form-control"  placeholder='Password'
            value={this.state.password ? this.state.password:''}
            onChange={((val) => this.setInputvalue('password',val))} required=""/>
            
            <button className="btn btn-success btn-block" type="submit" onClick={this.doLofin.bind(this) } ><i className="fas fa-sign-in-alt"></i> Sign in</button>
            <a href="#" id="forgot_pswd">Forgot password?</a>
            
            
            <button className="btn btn-primary btn-block" type="button" id="btn-signup"><i className="fas fa-user-plus"></i> Sign up New Account</button>
            </form>

            <form action="/reset/password/" className="form-reset">
                <input type="email" id="resetEmail" className="form-control" placeholder="Email address" required="" />
                <button className="btn btn-primary btn-block" type="submit">Reset Password</button>
                <a href="#" id="cancel_reset"><i className="fas fa-angle-left"></i> Back</a>
            </form>
            
            <form action="/signup/" className="form-signup">
                <div className="social-login">
                    <button className="btn facebook-btn social-btn" type="button"><span><i className="fab fa-facebook-f"></i> Sign up with Facebook</span> </button>
                </div>
                <div className="social-login">
                    <button className="btn google-btn social-btn" type="button"><span><i className="fab fa-google-plus-g"></i> Sign up with Google+</span> </button>
                </div>
                
                <p >OR</p>

                <input type="text" id="user-name" className="form-control" placeholder="Full name" required="" />
                <input type="email" id="user-email" className="form-control" placeholder="Email address" required />
                <input type="password" id="user-pass" className="form-control" placeholder="Password" required />
                <input type="password" id="user-repeatpass" className="form-control" placeholder="Repeat Password" required />

                <button className="btn btn-primary btn-block" type="submit"><i className="fas fa-user-plus"></i> Sign Up</button>
                <a href="#" id="cancel_signup"><i className="fas fa-angle-left"></i> Back</a>
            </form>
            <br/>            
            </div>
            
                   
        </div>
        </div> 
        );
    }
    
}



const mapDispatchToProps = dispatch => ({    
        onSave: () =>
        dispatch({
          type: "change",
          payLoad: 'test'
        })
    
  });

const mapStateToProps= (state) =>{

    return{
        state:state
    };

}

export default connect(mapStateToProps,mapDispatchToProps)(LoginForm);
