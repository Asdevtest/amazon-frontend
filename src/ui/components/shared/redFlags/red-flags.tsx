import { Box, Checkbox, FormControlLabel } from '@mui/material'

import React, { FC, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { ProductModel } from '@models/product-model'

import { useRedFlagStyles } from '@components/shared/redFlags/red-flags.style'

import { t } from '@utils/translations'
import { SaveIcon } from '../svg-icons'

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
  const [isSaved, setIsSaved] = useState(true)

  useEffect(() => {
    if (isEditMode) {
      ProductModel.getProductRedFlags().then(value => setFlags(value))
    }
  }, [])

  const handleFlag = (flag: Flag) => {
    if (selectedFlags.some(val => val._id === flag._id)) {
      setSelectedFlags(prevState => prevState.filter(el => el._id !== flag._id))
    } else {
      setSelectedFlags(prevState => [...prevState, flag])
    }
    setIsSaved(false)
  }

  const handleSave = () => {
    setIsSaved(true)
    handleSaveFlags?.(selectedFlags || [])
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
      {isEditMode && !isSaved && (
        <button className={styles.saveBtn} onClick={handleSave}>
          {t(TranslationKey.Save)}
          <SaveIcon className={styles.themeIcon} />
        </button>
      )}

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
