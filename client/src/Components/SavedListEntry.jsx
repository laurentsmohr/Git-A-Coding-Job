import React from 'react';

class SavedListEntry extends React.Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
    }
  handleDelete() {
    this.props.deleteJob(this.props.job.key, this.props.job.id);
  } 

  render() {
    return (
      <li className='listEntry' style={{margin: "25px 0"}}>
        <a href={this.props.job.url} target="_blank"><span className='ListEntryTitle'>{this.props.job.title}</span></a>
        <p className='ListEntryCompany' style={{margin: "0 0 0 0"}}>{this.props.job.company} </p>
        <p className='ListEntryType' style={{margin: "0 0 0 0"}}>{this.props.job.type} </p>
        <button onClick={this.handleDelete}>delete</button>
      </li>
    )
  }
}

export default SavedListEntry;