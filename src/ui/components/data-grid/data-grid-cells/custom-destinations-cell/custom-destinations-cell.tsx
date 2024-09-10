import { FC, memo } from 'react'

import { Text } from '@components/shared/text'

import { useStyles } from './custom-destinations-cell.style'

interface ICustomDestination {
  costDeliveryToUsa: string
  destinationName: string
  roi: string
  weight: string
}

interface CustomDestinationsCellProps {
  destinations: ICustomDestination[]
  field: keyof ICustomDestination
}

export const CustomDestinationsCell: FC<CustomDestinationsCellProps> = memo(({ destinations, field }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {destinations.map((destination, index) => (
        <div key={index} className={styles.destination}>
          <Text text={destination[field]} />
        </div>
      ))}
    </div>
  )
})
