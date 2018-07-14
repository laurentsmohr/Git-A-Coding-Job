import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        description: '',
        location: '',
        fullTime: false
    }
   this.handleCheckbox = this.handleCheckbox.bind(this);
   this.descriptionChange = this.descriptionChange.bind(this);
   this.locationChange = this.locationChange.bind(this);
   this.handleSearch = this.handleSearch.bind(this);
  }

  handleCheckbox(e) {
    if(e.target.checked) {
      this.setState({fullTime: true})
    } else {
      this.setState({fullTime: false})
    }
  }

  descriptionChange(e) {
    this.setState({description: e.target.value});
  }

  locationChange(e) {
    this.setState({location: e.target.value});
  }

  handleSearch(e) {
    e.preventDefault();
    var descr = this.state.description;
    var loc = this.state.location;
    var params = {};
    if(descr.length > 0) {
      params.description = descr;
    }
    if(loc.length > 0) {
      params.location = loc;
    }
    if(this.state.fullTime === true) {
      params.full_time = "on";
    }
    axios.post('/search', {params})
    .then(response => {
      if(response.data.length === 0) {
        let doc = document.getElementById('noSearchResults');
        doc.style.display = 'block';
        setTimeout(() => {
          doc.style.display = 'none';
        }, 2000);
      } else {
        this.props.handleServerResponse(response.data);
      }
    })
    .catch(err => {
      console.error(err);
    })
    
  }

  render() {
    return (
      <form onSubmit={this.handleSearch} className="search-bar form-inline">
        <div className="field">
          <label className="label">Keywords</label>
          <div className="control">
            <input className="input" id="descriptionInput" type="text" placeholder="Filter by title, benefits, companies, expertise" value={this.state.description} onChange={this.descriptionChange}/>
          </div>
        </div>
        <div className="field">
          <label className="label">Location</label>
          <div className="control">
            <input className="input" id="locationInput" type="text" placeholder="Filter by city, state, zip code or country" value={this.state.location} onChange={this.locationChange}/>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <label className="checkbox" for="fullTimeCheckbox">
              <input style={{margin: "0 5px 0 0"}} type="checkbox" id="fullTimeCheckbox" onChange={this.handleCheckbox}/>
              Full-time positions only?</label>
          </div>
        </div>
        <div className="field">
          <div className="control">
            <button className="button is-link" type="submit" >Submit</button>
          </div>
          <p className='help is-danger' id='noSearchResults' style={{display: 'none', textAlign: 'center', marginTop: '10px' }}>The keywords match no results. Try broadening your search.</p>
        </div>
      </form> 
    ); 
  }
}

export default Search;