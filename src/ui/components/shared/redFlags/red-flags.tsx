import React, { FC, useEffect, useState } from 'react'

import { Box, Checkbox, FormControlLabel } from '@mui/material'

import { ProductModel } from '@models/product-model'

import { useRedFlagStyles } from '@components/shared/redFlags/red-flags.styles'

interface Flag {
  title: string
  _id: string
  value: number
}

interface RedFlagsProps {
  isEditMode?: boolean
  activeFlags?: Flag[]
  handleSaveFlags?: (flags: Flag[]) => void
}

export const RedFlags: FC<RedFlagsProps> = props => {
  const { activeFlags = [], isEditMode, handleSaveFlags } = props
  const { classes: styles } = useRedFlagStyles()

  const [selectedFlags, setSelectedFlags] = useState<Flag[]>(activeFlags)
  const [flags, setFlags] = useState<Flag[]>([])

  useEffect(() => {
    if (isEditMode) {
      ProductModel.getProductRedFlags().then(value => setFlags(value))
    }
  }, [])

  const handleFlag = (flag: Flag) => {
    let newSelectedFlags = []

    if (selectedFlags.some(val => val._id === flag._id)) {
      newSelectedFlags = selectedFlags.filter(el => el._id !== flag._id)
    } else {
      newSelectedFlags = [...selectedFlags, flag]
    }

    setSelectedFlags(newSelectedFlags)
    handleSaveFlags?.(newSelectedFlags || [])
  }

  return (
    <>
      {isEditMode &&
        !!flags.length &&
        flags.map((el, index) => (
          <div key={index}>
            <FormControlLabel
              label={
                <Box display="flex" gap="15px">
                  <Box className={styles.flagIcon}>
                    <img src={`/assets/icons/redflags/${el.title}.svg`} alt={el.title} />
                  </Box>
                  {el.title}
                </Box>
              }
              control={
                <Checkbox checked={selectedFlags.some(val => val._id === el._id)} onChange={() => handleFlag(el)} />
              }
            />
          </div>
        ))}

      {!isEditMode &&
        !!selectedFlags.length &&
        selectedFlags.map((el, index) => (
          <Box key={index} className={styles.flagIcon}>
            <img src={`/assets/icons/redflags/${el.title}.svg`} alt={el.title} />
          </Box>
        ))}
    </>
  )
}
