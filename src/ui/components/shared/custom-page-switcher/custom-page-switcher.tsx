import { cx } from '@emotion/css'
import { observer } from 'mobx-react'
import { FC } from 'react'

import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'

import { TranslationKey } from '@constants/translations/translation-key'

import { Input } from '@components/shared/input'

import { t } from '@utils/translations'

import { PaginationModel } from '../../../../typings/pagination-model'
import { Field } from '../field'

import { useClassNames } from './custom-page-switcher.styles'

interface CustomPageSwitcherProps {
  paginationModel: PaginationModel
  rowCount: number
  pageSizeOptions: Array<number>
  onChangePaginationModelChange: (model: PaginationModel) => void
}

export const CustomPageSwitcher: FC<CustomPageSwitcherProps> = observer(props => {
  const { classes: classNames } = useClassNames()

  const { pageSizeOptions, rowCount, paginationModel, onChangePaginationModelChange } = props

  const humanFriendlyPageCount = paginationModel.page + 1
  const morePagesAvailable = rowCount > humanFriendlyPageCount * paginationModel.pageSize
  const isFistPage = paginationModel.page === 0

  const changeCurrentPage = (page: number): void => {
    onChangePaginationModelChange({ ...paginationModel, page: paginationModel.page + page })
  }

  return (
    <div className={classNames.root}>
      <Field
        label={t(TranslationKey['On page'])}
        labelClasses={classNames.fieldLabel}
        containerClasses={classNames.fieldContainer}
        inputComponent={
          <Select
            variant="filled"
            value={paginationModel.pageSize}
            classes={{ select: classNames.selectStyles }}
            input={<Input classes={{ root: classNames.rootInput }} />}
            onChange={value => onChangePaginationModelChange({ page: 0, pageSize: Number(value.target.value) })}
          >
            {pageSizeOptions.map((pageOption: number, pageOptionIndex: number) => (
              <MenuItem key={pageOptionIndex} value={pageOption}>
                <Typography className={classNames.switcherText}>{pageOption}</Typography>
              </MenuItem>
            ))}
          </Select>
        }
      />

      <div className={classNames.switcherControlWrapper}>
        <Typography className={classNames.switcherText}>
          {`${paginationModel.page ? paginationModel.page * paginationModel.pageSize + 1 : 1}–${
            morePagesAvailable ? humanFriendlyPageCount * paginationModel.pageSize : rowCount
          } ${t(TranslationKey.of)} ${rowCount}`}
        </Typography>

        <NavigateBeforeIcon
          className={cx(classNames.navigation, { [classNames.disabledNavigation]: isFistPage })}
          onClick={() => {
            if (!isFistPage) changeCurrentPage(-1)
          }}
        />

        <NavigateNextIcon
          className={cx(classNames.navigation, { [classNames.disabledNavigation]: !morePagesAvailable })}
          onClick={() => {
            if (morePagesAvailable) changeCurrentPage(1)
          }}
        />
      </div>
    </div>
  )
})
