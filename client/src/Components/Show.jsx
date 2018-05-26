import React from 'react';

const Show = (props) => (
  <div className='content'>
    <a href={props.job.url} target="_blank"><span className='ListEntryTitle'>{props.job.title}</span></a>
    <p className='ListEntryCompany' style={{margin: "0 0 0 0"}}>{props.job.company}</p>
    <p className='ListEntryType'>{props.job.type}</p> 
    <article className="box" type="text/html" style={{width: "auto", height: "350px", overflow: "auto"}} dangerouslySetInnerHTML={{ __html: props.job.description }}></article>
    <div className="content" style={{margin: "auto", textAlign: "center"}}>
      <button className="button" style={{margin: "5px 25px"}} onClick={props.saveJob}>Save this Job</button>
      <button className="button" style={{margin: "5px 25px"}} onClick={props.nextJob}>Show next</button>
    </div>
  </div>
)

export default Show;