import React from 'react';

class Login extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      username: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.handleLogin(this.state.username)
  }

  handleChange(e) {
    this.setState({username: e.target.value});
  }

  render () {
      return (
        <div className='content'>
          <form onSubmit={this.handleSubmit} className="search-bar form-inline">
              <div className="field">
                <label className="label">Username</label>
                <div className="control">
                  <input className="input" id="descriptionInput" type="text" value={this.state.username} placeholder="Create a username" onChange={this.handleChange}/>
                </div>
              </div>
              <div className="field">
                <div className="control">
                  <button className="button is-link" type="submit">Login</button>
                </div>
              </div>
            </form> 
        </div>
      )
  }
}
export default Login;