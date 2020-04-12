import React from 'react';
import UserStore from './Stores/UserStore';
import ButtonField from './ButtonField'
class Home extends React.Component
{
   
    doLogout(){
        this.props.history.push('/');
    }

render()
  {
            return(
                
                <div className="container">                    
                        Welcome {UserStore.username}
                        <ButtonField 
                        text={'Log out'} 
                        disabled={false}
                        onClick={() => this.doLogout()}
                        />
                        
                </div>
            ) 
        
    }
    
}

export default Home;

