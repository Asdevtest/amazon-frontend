import { observer } from 'mobx-react'
import { FC } from 'react'
import { MdNavigateBefore, MdNavigateNext } from 'react-icons/md'

import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'

import { TranslationKey } from '@constants/translations/translation-key'

import { Input } from '@components/shared/input'

import { t } from '@utils/translations'

import { IPaginationModel } from '@typings/shared/data-grid'

import { useStyles } from './custom-page-switcher.style'

import { Field } from '../field'

interface CustomPageSwitcherProps {
  paginationModel: IPaginationModel
  rowCount: number
  pageSizeOptions: Array<number>
  onPaginationModelChange: (model: IPaginationModel) => void
}

export const CustomPageSwitcher: FC<CustomPageSwitcherProps> = observer(props => {
  const { classes: styles, cx } = useStyles()

  const { pageSizeOptions, rowCount, paginationModel, onPaginationModelChange } = props

  const humanFriendlyPageCount = paginationModel.page + 1
  const morePagesAvailable = rowCount > humanFriendlyPageCount * paginationModel.pageSize
  const isFistPage = paginationModel.page === 0

  const changeCurrentPage = (page: number): void => {
    onPaginationModelChange({ ...paginationModel, page: paginationModel.page + page })
  }

  return (
    <div className={styles.root}>
      <Field
        label={t(TranslationKey['On page'])}
        labelClasses={styles.fieldLabel}
        containerClasses={styles.fieldContainer}
        inputComponent={
          <Select
            variant="filled"
            value={paginationModel.pageSize}
            classes={{ select: styles.selectStyles }}
            input={<Input classes={{ root: styles.rootInput }} />}
            onChange={value => onPaginationModelChange({ page: 0, pageSize: Number(value.target.value) })}
          >
            {pageSizeOptions.map((pageOption: number, pageOptionIndex: number) => (
              <MenuItem key={pageOptionIndex} value={pageOption}>
                <p className={styles.switcherText}>{pageOption}</p>
              </MenuItem>
            ))}
          </Select>
        }
      />

      <div className={styles.switcherControlWrapper}>
        <p className={styles.switcherText}>
          {`${paginationModel.page ? paginationModel.page * paginationModel.pageSize + 1 : 1}–${
            morePagesAvailable ? humanFriendlyPageCount * paginationModel.pageSize : rowCount
          } ${t(TranslationKey.of)} ${rowCount}`}
        </p>

        <MdNavigateBefore
          size={20}
          className={cx(styles.navigation, { [styles.disabledNavigation]: isFistPage })}
          onClick={() => {
            if (!isFistPage) changeCurrentPage(-1)
          }}
        />

        <MdNavigateNext
          size={20}
          className={cx(styles.navigation, { [styles.disabledNavigation]: !morePagesAvailable })}
          onClick={() => {
            if (morePagesAvailable) changeCurrentPage(1)
          }}
        />
      </div>
    </div>
  )
})
