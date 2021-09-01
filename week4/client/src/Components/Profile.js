import React, { useContext } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
//import Issue from './Issue.js'
import { UserContext } from '../Context/UserProvider.js'

export default function Profile() {
    const { user, addIssue, issues } = useContext(UserContext)
  
    return (
      <div className="profile issues">
        <h1>Welcome {`${user.firstname} ${user.lastname}`}</h1>
        <IssueForm addIssue={addIssue} />
        <h3>Your Issues</h3>
        <IssueList issues={issues} />
      </div>
    )
  }
