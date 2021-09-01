import React from 'react'
import Issue from './Issue.js'

export default function IssueList(props){
  const { issues } = props
  return (
    <div className="issue-list">
    console.log(issues)
      { issues.map(issue => <Issue {...issue} key={issue._id}/>) }
    </div>
  )
}