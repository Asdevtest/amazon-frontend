import { Avatar } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { observer } from 'mobx-react'
import { FC } from 'react'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { useStyles } from './country-option.style'

interface CountryOptionProps {
  data: BaseOptionType
}

export const CountryOption: FC<CountryOptionProps> = observer(({ data }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.selectOption}>
      <Avatar size={20} src={getAmazonImageUrl(data.image)} />
      <p>{`${data.title} (${data.shortTitle})`}</p>
    </div>
  )
})
