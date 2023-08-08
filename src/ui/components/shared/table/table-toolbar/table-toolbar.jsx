import { FormatAlignLeft, Search } from '@material-ui/icons'
import { Button, IconButton, InputAdornment, MenuItem, Select, Toolbar, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Input } from '@components/shared/input'

import { t } from '@utils/translations'

import { useClassNames } from './table-toolbar.style'

export const TableToolbar = ({ rowsPerPage, handlerRowsPerPage }) => {
  const { classes: classNames } = useClassNames()

  return (
    <Toolbar className={classNames.root}>
      <Input
        className={classNames.search}
        placeholder={t(TranslationKey.search) + '...'}
        startAdornment={
          <InputAdornment className={classNames.searchAdornment} position="start">
            <IconButton className={classNames.iconButton}>
              <Search className={classNames.icon} />
            </IconButton>
          </InputAdornment>
        }
      />

      <div className={classNames.filter}>
        <Button classes={{ iconSizeMedium: classNames.icon }} startIcon={<FormatAlignLeft />}>
          <Typography className={classNames.filterTitle}>{t(TranslationKey.Filter)}</Typography>
        </Button>
      </div>

      <Typography className={classNames.selectTitle}>{t(TranslationKey['Rows per page'])}</Typography>
      <Select input={<Input className={classNames.selectRoot} />} value={rowsPerPage} onChange={handlerRowsPerPage}>
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
