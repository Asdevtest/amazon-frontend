/* eslint-disable @typescript-eslint/ban-ts-comment */
import { FC, useEffect, useState } from 'react'

import { Box, Checkbox, FormControlLabel } from '@mui/material'

import { ProductModel } from '@models/product-model'

import { useRedFlagStyles } from '@components/shared/redFlags/red-flags.style'

import { getAmazonImageUrl } from '@utils/get-amazon-image-url'

import { IRedFlag } from '@typings/shared/red-flag'

interface RedFlagsProps {
  isEditMode?: boolean
  activeFlags?: IRedFlag[]
  handleSaveFlags?: (flags: IRedFlag[]) => void
}

export const RedFlags: FC<RedFlagsProps> = props => {
  const { activeFlags = [], isEditMode, handleSaveFlags } = props
  const { classes: styles } = useRedFlagStyles()

  const [selectedFlags, setSelectedFlags] = useState<IRedFlag[]>(activeFlags)
  const [flags, setFlags] = useState<IRedFlag[]>([])

  useEffect(() => {
    if (isEditMode) {
      // @ts-ignore
      ProductModel.getProductRedFlags().then(value => setFlags(value))
    }
  }, [])

  useEffect(() => {
    setSelectedFlags(activeFlags)
  }, [activeFlags])

  const handleFlag = (flag: IRedFlag) => {
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
        flags.map(flag => (
          <div key={flag._id}>
            <FormControlLabel
              label={
                <Box display="flex" gap="15px">
                  <Box className={styles.flagIcon}>
                    <img src={getAmazonImageUrl(flag.iconImage)} alt={flag.title} />
                  </Box>
                  {flag.title}
                </Box>
              }
              control={
                <Checkbox checked={selectedFlags.some(val => val._id === flag._id)} onChange={() => handleFlag(flag)} />
              }
            />
          </div>
        ))}

      {!isEditMode &&
        !!selectedFlags.length &&
        selectedFlags.map(flag => (
          <Box key={flag._id} className={styles.flagIcon}>
            <img src={getAmazonImageUrl(flag.iconImage)} alt={flag.title} />
          </Box>
        ))}
    </>
  )
}
