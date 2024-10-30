import { memo } from 'react'

import { CustomInput } from '@components/shared/custom-input'

import { useStyles } from './header-info.style'

export const HeaderInfo = memo(() => {
  const { classes: styles } = useStyles()

  return (
    <div>
      <CustomInput required label="Title" />
    </div>
  )
})
