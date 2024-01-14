import React from 'react'

import { ProjectQuery } from '@graphql/types'
import { useDataContext } from '@app/DataContext'
import Card from "@components/Card/Card";
import Box from "@mui/material/Box";

type Props = NonNullable<
  NonNullable<ProjectQuery['project']>['columns']
>[0]['cards'][0]

function MilestoneCard(props: Props) {
  const {
    cardModal: { setCardUuid, setOpen: setCardOpen },
  } = useDataContext()
const {
    milestoneModal: { setOpen: setMilestoneOpen },
} = useDataContext()

  const handleClick = () => {
    setCardUuid(props.uuid)
    setCardOpen(true)
    setMilestoneOpen(false)
  }

  return (
      <Box
          onClick={handleClick}
          sx={{
              cursor: 'pointer'
          }}
      >
        <Card
            name={props.name}
            deadline={props.deadline}
        />
      </Box>
  )
}

export default MilestoneCard
