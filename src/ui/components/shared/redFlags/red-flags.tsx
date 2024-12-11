import { Checkbox, Empty } from 'antd'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IRedFlag } from '@typings/shared/red-flag'

import { useStyles } from './red-flags.style'

import { CustomCheckbox } from '../custom-checkbox'
import { CustomImage } from '../custom-image'
import { CustomInput } from '../custom-input'
import { Text } from '../text'

import { RedFlagsModel } from './red-flags.model'

interface RedFlagsProps {
  flags?: IRedFlag[]
  withTitle?: boolean
  withSearch?: boolean
  editMode?: boolean
  isCell?: boolean
  onChange?: (checkedValues: string[]) => void
}

export const RedFlags: FC<RedFlagsProps> = observer(props => {
  const { flags, withTitle, withSearch = false, editMode, isCell, onChange } = props

  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new RedFlagsModel(flags, isCell), [])

  const option = (flag: IRedFlag) => (
    <div className={styles.option}>
      <CustomImage preview={false} height={18} width={18} src={flag.iconImage} />
      <Text rows={1} copyable={false} text={flag.title} />
    </div>
  )

  return (
    <div className={styles.root}>
      {withTitle ? <p className={styles.title}>{t(TranslationKey['Red flags'])}</p> : null}
      {withSearch ? (
        <CustomInput fullWidth placeholder={t(TranslationKey.Search)} onChange={viewModel.onChangeSearchValue} />
      ) : null}

      <Checkbox.Group
        className={cx(styles.checkboxes, { [styles.empty]: !viewModel.filteredFlags.length })}
        onChange={onChange}
      >
        {viewModel.filteredFlags.length ? (
          viewModel.filteredFlags.map(flag =>
            editMode ? (
              <CustomCheckbox key={flag._id} value={flag._id}>
                {option(flag)}
              </CustomCheckbox>
            ) : (
              option(flag)
            ),
          )
        ) : !isCell ? (
          <Empty />
        ) : null}
      </Checkbox.Group>
    </div>
  )
})
