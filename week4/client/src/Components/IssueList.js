import React from 'react'
import Issue from './Issue.js'

export default function IssueList(props){
  const { issues } = props
  return (
    <div className="todo-list">
    console.log(issues)
      { issues.map(issues => <Issue {...issues} key={issues._id}/>) }
    </div>
  )
}