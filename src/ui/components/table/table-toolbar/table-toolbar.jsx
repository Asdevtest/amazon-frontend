import {Button, IconButton, InputAdornment, NativeSelect, Toolbar, Typography} from '@material-ui/core'
import {FormatAlignLeft, Search} from '@material-ui/icons'

import {texts} from '@constants/texts'

import {Input} from '@components/input'

import {getLocalizedTexts} from '@utils/get-localized-texts'

import {useClassNames} from './table-toolbar.style'

const textConsts = getLocalizedTexts(texts, 'en').tableToolbar

export const TableToolbar = ({rowsPerPage, handlerRowsPerPage}) => {
  const classNames = useClassNames()

  return (
    <Toolbar className={classNames.root}>
      <Input
        className={classNames.search}
        placeholder={textConsts.searchPlaceholder}
        startAdornment={
          <InputAdornment className={classNames.searchAdornment} position="start">
            <IconButton className={classNames.iconButton}>
              <Search className={classNames.icon} />
            </IconButton>
          </InputAdornment>
        }
      />

      <div className={classNames.filter}>
        <Button classes={{iconSizeMedium: classNames.icon}} startIcon={<FormatAlignLeft />}>
          <Typography className={classNames.filterTitle}>{textConsts.filter}</Typography>
        </Button>
      </div>

      <Typography className={classNames.selectTitle}>{textConsts.rowsPerPage}</Typography>
      <NativeSelect
        input={<Input className={classNames.selectRoot} />}
        value={rowsPerPage}
        onChange={handlerRowsPerPage}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={25}>25</option>
        <option value={50}>50</option>
        <option value={100}>100</option>
      </NativeSelect>
    </Toolbar>
  )
}
