import { IoSearchOutline } from 'react-icons/io5'
import { MdFormatAlignLeft } from 'react-icons/md'

import { IconButton, InputAdornment, MenuItem, Select, Toolbar } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { Input } from '@components/shared/input'

import { t } from '@utils/translations'

import { useStyles } from './table-toolbar.style'

export const TableToolbar = ({ rowsPerPage, handlerRowsPerPage }) => {
  const { classes: styles } = useStyles()

  return (
    <Toolbar className={styles.root}>
      <Input
        className={styles.search}
        placeholder={t(TranslationKey.Search)}
        startAdornment={
          <InputAdornment className={styles.searchAdornment} position="start">
            <IconButton className={styles.iconButton}>
              <IoSearchOutline size={16} className={styles.icon} />
            </IconButton>
          </InputAdornment>
        }
      />

      <div className={styles.filter}>
        <CustomButton icon={<MdFormatAlignLeft />}>{t(TranslationKey.Filter)}</CustomButton>
      </div>

      <p className={styles.selectTitle}>{t(TranslationKey['Rows per page'])}</p>
      <Select input={<Input className={styles.selectRoot} />} value={rowsPerPage} onChange={handlerRowsPerPage}>
        <MenuItem value={5}>5</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={15}>15</MenuItem>
        <MenuItem value={25}>25</MenuItem>
        <MenuItem value={50}>50</MenuItem>
        <MenuItem value={100}>100</MenuItem>
      </Select>
    </Toolbar>
  )
}
