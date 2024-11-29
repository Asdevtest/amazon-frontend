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
      <Avatar src={getAmazonImageUrl(data.image)} size={20} />
      <p className={styles.countryText}>{`${data.title} (${data.shortTitle})`}</p>
    </div>
  )
})
