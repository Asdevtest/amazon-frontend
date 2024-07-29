import { RadioChangeEvent } from 'antd'
import { FC, memo } from 'react'
import { BsCardText } from 'react-icons/bs'
import { GoRows } from 'react-icons/go'
import { MdTableRows } from 'react-icons/md'

import { tableViewMode } from '@constants/table/table-view-modes'

import { CustomRadioButton } from '@components/shared/custom-radio-button'

import { useStyles } from './view-cards-select.style'

interface FreelanceTypeTaskSelectProps {
  withTabelView?: boolean
  withoutBlockCardView?: boolean
  viewMode: string
  onChangeViewMode: (e: RadioChangeEvent) => void
}

export const ViewCardsSelect: FC<FreelanceTypeTaskSelectProps> = memo(props => {
  const { withTabelView, withoutBlockCardView, viewMode, onChangeViewMode } = props
  const { classes: styles } = useStyles()

  const options = [
    withTabelView && {
      label: <MdTableRows className={styles.icon} />,
      value: tableViewMode.TABLE,
    },
    !withoutBlockCardView && {
      label: <BsCardText className={styles.icon} />,
      value: tableViewMode.BLOCKS,
    },
    {
      label: <GoRows className={styles.icon} />,
      value: tableViewMode.LIST,
    },
  ].filter(option => typeof option === 'object')

  return (
    <CustomRadioButton
      size="large"
      buttonStyle="solid"
      options={options}
      defaultValue={viewMode}
      onChange={onChangeViewMode}
    />
  )
})
