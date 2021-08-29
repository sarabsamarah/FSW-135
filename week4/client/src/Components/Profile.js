import React, { useContext } from 'react'
import IssueForm from './IssueForm.js'
import IssueList from './IssueList.js'
//import Issue from './Issue.js'
import { UserContext } from '../Context/UserContext.js'

export default function Profile(){
  const { 
    user: { 
      username 
    }, 
    addIssue, 
    issues 
  } = useContext(UserContext)

  return (
    <div className="profile">
      <h1>Hey There @{username}!</h1>
      <h3>report an issue</h3>
      <IssueForm addIssue={addIssue}/>
      <h3>your issue log</h3>
      <IssueList issues={issues}/>
    </div>
  )
}
