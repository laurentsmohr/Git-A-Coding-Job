import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Search from './Components/Search.jsx';
import SavedList from './Components/SavedList.jsx';
import Show from './Components/Show.jsx';
import Login from './Components/Login.jsx';
import Signup from './Components/Signup.jsx';


class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      jobs: [],
      currentJob: {},
      jobIndex: 0,
      viewSaved: false,
      savedJobs: [],
      user: "",
      authentication: "login",
    }
    this.clickSearch = this.clickSearch.bind(this);
    this.clickSaved = this.clickSaved.bind(this);
    this.handleServerResponse = this.handleServerResponse.bind(this);
    this.saveJob = this.saveJob.bind(this);
    this.nextJob = this.nextJob.bind(this);
    this.deleteListEntry = this.deleteListEntry.bind(this);
    this.switchToLogin = this.switchToLogin.bind(this);
    this.switchToSignup = this.switchToSignup.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
  }
  
  clickSearch(e) {
    e.preventDefault();
    if(this.state.viewSaved === true) {
      this.setState({
        viewSaved: false
      })
    } else {
      this.setState({
        jobs: []
      })
    }
  }
  clickSaved(e) {
    e.preventDefault();
    if(this.state.viewSaved === false) {
      this.setState({
        viewSaved: true
      })
    }
  }

  handleServerResponse(res) {
    this.setState({
      currentJob: res[0],
      jobs: res
    })
  }

  saveJob() {
    this.setState((prevState) => {
      prevState.savedJobs.push(this.state.currentJob);
      return {savedJobs: prevState.savedJobs};
    });
    
    axios.post('/save', {
      job: this.state.currentJob,
      user: this.state.user
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  nextJob() {
    var i = this.state.jobIndex;
    i++;
    if(i > this.state.jobs.length - 1) { 
      i = 0 
    };
    var next = this.state.jobs[i];
    this.setState({
      currentJob: next,
      jobIndex: i
    })
  }
  
  deleteListEntry(index) {
    var savedJobsArray = this.state.savedJobs;
    savedJobsArray.splice(index, 1);
    this.setState({
      savedJobs: savedJobsArray
    })
  }

  loggedIn(userID) {
    console.log('loggedIn', userID);
    this.setState({
      user: userID,
      authentication: 'authenticated'
    })
    axios.get(`/${userID}/savedJobs`)
    .then(res => {
      console.log('users jobs: ', res);
      this.setState({
        savedJobs: res.data
      })
    })
    .catch(err => {
      console.error(err);
    })
  }

  switchToSignup() {
    this.setState({authentication: 'signup'})
  }

  switchToLogin() {
    this.setState({authentication: 'login'})
  }

  renderContent() {
    if (this.state.viewSaved) {
      return <SavedList deleteJob={this.deleteListEntry} savedJobs={this.state.savedJobs}/>;
    } else if (this.state.jobs.length > 0) {
      return <Show newSearch={this.newSearch} saveJob={this.saveJob} nextJob={this.nextJob} job={this.state.currentJob}/>;
    } else {
      return <Search handleServerResponse={this.handleServerResponse}/>;
    }
  }

  render () {
    if(this.state.authentication === 'login') {
      return <Login loggedIn={this.loggedIn} switchToSignup={this.switchToSignup}/>;
    } else if (this.state.authentication === 'signup') {
      return <Signup loggedIn={this.loggedIn} switchToLogin={this.switchToLogin}/>
    } else {
      return (
        <div className="outer-wrapper">
          <nav style={{margin: "0 0 15px 0" }}>
            <button className="button" style={{width: "250px"}} onClick={this.clickSearch}>Search</button>
            <button className="button" style={{width: "250px", float: "right", position: "relative"}} onClick={this.clickSaved}>Saved</button>
          </nav>
          {this.renderContent()}
        </div>
      )
    }
  }
}

ReactDOM.render(<App />, document.getElementById('app'));