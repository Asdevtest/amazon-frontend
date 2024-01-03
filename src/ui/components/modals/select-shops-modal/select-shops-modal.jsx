import { memo, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { t } from '@utils/translations'

import { useStyles } from './select-shops-modal.style'

export const SelectShopsModal = memo(props => {
  const { onClickSuccessBtn, onClickCancelBtn, title, message, shops } = props

  const { classes: styles, cx } = useStyles()

  const [currentShopId, setCurrentShopId] = useState('')

  const sortingShops = shops?.sort((a, b) => a?.name?.localeCompare(b?.name))
  const selectedItem = shops?.find(shop => shop?._id === currentShopId)
  const selectedItemName = selectedItem?.name || t(TranslationKey['Select a store'])

  return (
    <div className={styles.wrapper}>
      <p className={styles.title}>{title}</p>

      <Field
        label={t(TranslationKey.Shops)}
        labelClasses={styles.fieldLabel}
        inputComponent={
          <WithSearchSelect
            grayBorder
            blackSelectedItem
            darkIcon
            chosenItemNoHover
            width={340}
            disabled={!shops.length}
            data={sortingShops}
            searchFields={['name']}
            selectedItemName={selectedItemName}
            onClickNotChosen={() => setCurrentShopId('')}
            onClickSelect={el => setCurrentShopId(el._id)}
          />
        }
      />

      <p className={styles.message}>{message}</p>

      <div className={styles.buttons}>
        <Button
          success
          disableElevation
          className={styles.button}
          variant="contained"
          onClick={() => onClickSuccessBtn(currentShopId)}
        >
          {t(TranslationKey.Yes)}
        </Button>

        <Button
          className={cx(styles.button, styles.cancelButton)}
          variant="text"
          color="primary"
          onClick={onClickCancelBtn}
        >
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
    </div>
  )
})
