import React from 'react'
import DropdownMultipleField from './Fields/DropdownMultipleField'
import { ProjectUser } from '@graphql/types'

interface Props {
  assigneesList: ProjectUser[]
  selectedAssignees: ProjectUser[]
  handleAssigneesChange: (value: ProjectUser[]) => void

}

function Assignees({ assigneesList, selectedAssignees, handleAssigneesChange}: Props) {
  return (
    <DropdownMultipleField<ProjectUser> 
      options={assigneesList.map(assignee => ({ value: assignee.name || '', ...assignee })) || []}
      label="Assignees"
      onChange={value => handleAssigneesChange(value)}
      value={selectedAssignees.map(assignee => ({ value: assignee.name || '', ...assignee }))}
    />
  )
}

export default Assignees