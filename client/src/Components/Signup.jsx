import React from 'react';
import axios from 'axios';

class Signup extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleDisplay = this.toggleDisplay.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    axios.post('/signupUser', {
      username: this.state.username,
      password: this.state.password
    })
    .then(res => {
      if (typeof res.data === 'string') {
        this.toggleDisplay(res.data);
      } else {
        this.props.loggedIn(res.data.insertId);
      }
    })
    .catch(err => {
      console.error(err)
    })
  }

  toggleDisplay(id) {
    if(document.getElementById(id).style.display === 'none') {
      document.getElementById(id).style.display = 'block';
    } else {
      document.getElementById(id).style.display = 'none';
    }
  }

  handleChange(e) {
    if(e.target.id === 'usernameInput') {
      this.setState({username: e.target.value});
    } else {
      this.setState({password: e.target.value});      
    }
  }


  render () {
      return (
        <div className='content'>
        <p className='title'>Create Account</p>
          <form onSubmit={this.handleSubmit} className="search-bar form-inline">
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input className="input" id="usernameInput" type="text" value={this.state.username} placeholder="Enter your username" onChange={this.handleChange}/>
                </div>
                <p className='help is-danger' id='usernameTaken' style={{display: 'none'}}>The username already exist</p>
              </div>
              <div className="field">
                <label className="label">Password</label>
                <div className="control">
                  <input className="input" id="passwordInput" type="password" value={this.state.password} placeholder="Enter your password" onChange={this.handleChange}/>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-link" type="submit">Create Account</button>
                </div>
              </div>
              <div onClick={this.props.switchToLogin}>
                <p style={{cursor: 'pointer'}}>Login to your Account</p>
              </div> 
            </form> 
        </div>
      )
  }
}
export default Signup;