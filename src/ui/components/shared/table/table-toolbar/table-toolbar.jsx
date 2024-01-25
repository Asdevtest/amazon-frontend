import { FormatAlignLeft, Search } from '@material-ui/icons'
import { Button, IconButton, InputAdornment, MenuItem, Select, Toolbar, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Input } from '@components/shared/input'

import { t } from '@utils/translations'

import { useStyles } from './table-toolbar.style'

export const TableToolbar = ({ rowsPerPage, handlerRowsPerPage }) => {
  const { classes: styles } = useStyles()

  return (
    <Toolbar className={styles.root}>
      <Input
        className={styles.search}
        placeholder={t(TranslationKey.search) + '...'}
        startAdornment={
          <InputAdornment className={styles.searchAdornment} position="start">
            <IconButton className={styles.iconButton}>
              <Search className={styles.icon} />
            </IconButton>
          </InputAdornment>
        }
      />

      <div className={styles.filter}>
        <Button classes={{ iconSizeMedium: styles.icon }} startIcon={<FormatAlignLeft />}>
          <Typography className={styles.filterTitle}>{t(TranslationKey.Filter)}</Typography>
        </Button>
      </div>

      <Typography className={styles.selectTitle}>{t(TranslationKey['Rows per page'])}</Typography>
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
