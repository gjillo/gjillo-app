import React from 'react'

import { ProjectQuery } from '@graphql/types'
import { useDataContext } from '@app/DataContext'
import Card from "@components/Card/Card";

type Props = NonNullable<
  NonNullable<ProjectQuery['project']>['columns']
>[0]['cards'][0]

function MilestoneCard(props: Props) {
  const {
    cardModal: { setCardUuid, setOpen },
  } = useDataContext()

  const handleClick = () => {
    setCardUuid(props.uuid)
    setOpen(true)
  }

  return (
    <Card
        name={props.name}
        deadline={props.deadline}
        onClick={handleClick}
    />
  )
}

export default MilestoneCard
