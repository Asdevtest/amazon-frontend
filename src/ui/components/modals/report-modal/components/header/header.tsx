import { Select } from 'antd'
import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { Launches as LaunchesEnum } from '@typings/enums/launches'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './header.style'

import { getAsinOptions } from '../../report-modal.config'
import { ILaunchOption, IRequestWithLaunch } from '../../report-modal.type'

import { AsinOption } from './asin-option'
import { Requests } from './requests'

interface HeaderProps {
  product: IProduct
  editMode: boolean
  launchOptions: ILaunchOption[]
  selectLaunchValue: LaunchesEnum | null
  requests: IRequestWithLaunch[]
  onRemoveRequest: (id: string) => void
  onSelectLaunch: (value: LaunchesEnum) => void
}

export const Header: FC<HeaderProps> = memo(props => {
  const { product, editMode, launchOptions, selectLaunchValue, requests, onRemoveRequest, onSelectLaunch } = props

  const { classes: styles, cx } = useStyles()

  const modalTitle = `${editMode ? t(TranslationKey.Edit) : t(TranslationKey.New)} ${t(
    TranslationKey['report by the product'],
  )}`
  const launchTypePlaceholder = `＋ ${t(TranslationKey['Select launch type'])}`
  const asinOptions = getAsinOptions(product)

  return (
    <div className={styles.header}>
      <div className={cx(styles.flexRowContainer, styles.column)}>
        <p className={styles.title}>{modalTitle}</p>

        <div className={styles.flexRowContainer}>
          <Select
            showSearch
            placeholder={t(TranslationKey['Select ASIN'])}
            className={styles.select}
            defaultValue={[product.asin]}
            options={asinOptions}
            optionRender={({ data }) => <AsinOption data={data} />}
          />

          <Select
            showSearch
            disabled={launchOptions.length === 0}
            placeholder={launchTypePlaceholder}
            options={launchOptions}
            className={styles.select}
            value={selectLaunchValue}
            onChange={onSelectLaunch}
          />
        </div>
      </div>

      <Requests requests={requests} onRemoveRequest={onRemoveRequest} />
    </div>
  )
})
