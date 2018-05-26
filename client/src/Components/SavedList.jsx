import React from 'react';
import SavedListEntry from './SavedListEntry.jsx';

const SavedList = ({savedJobs, deleteJob}) => (
  <div>
    <ul>
      {savedJobs.map((job, i) => {
        return <SavedListEntry key={i} job={job} deleteJob={deleteJob}/>
      })}
    </ul>
  </div>
)

export default SavedList;