import React from 'react'
import DropdownMultipleField from './Fields/DropdownMultipleField'
import { Tag } from '@graphql/types'

interface Props {
  tagsList: Tag[]
  selectedTags: Tag[]
  handleTagsChange: (value: Tag[]) => void

}

function Tags({ tagsList, selectedTags, handleTagsChange}: Props) {
  return (
    <DropdownMultipleField<Tag>
      label="Tags"
      options={tagsList}
      onChange={value => handleTagsChange(value)}
      value={selectedTags}
    />
  )
}

export default Tags