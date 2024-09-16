import { BaseOptionType } from 'antd/es/select'
import { FC, UIEvent, memo, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { Launches as LaunchesEnum } from '@typings/enums/launches'
import { IProduct } from '@typings/models/products/product'

import { useStyles } from './header.style'

import { getDefaultAsinOption } from '../../report-modal.config'
import { ILaunchOption, IRequestWithLaunch } from '../../report-modal.type'

import { AsinOption } from './asin-option'
import { Requests } from './requests'

interface HeaderProps {
  asinOptions: BaseOptionType[]
  editMode: boolean
  launchOptions: ILaunchOption[]
  selectLaunchValue: LaunchesEnum | null
  requests: IRequestWithLaunch[]
  onRemoveRequest: (id?: string) => void
  onSelectLaunch: (value: LaunchesEnum) => void
  onSelectProduct: (value: string, option: BaseOptionType) => void
  onDropdownVisibleChange: (value: boolean) => void
  onSearchAsinSelect: (value: string) => void
  onPopupScroll: (e: UIEvent<HTMLElement>) => void
  subView?: boolean
  product?: IProduct
}

export const Header: FC<HeaderProps> = memo(props => {
  const {
    asinOptions,
    editMode,
    launchOptions,
    selectLaunchValue,
    requests,
    onRemoveRequest,
    onSelectLaunch,
    onSelectProduct,
    onDropdownVisibleChange,
    onSearchAsinSelect,
    onPopupScroll,
    subView,
    product,
  } = props

  const { classes: styles, cx } = useStyles()

  const modalTitle = useMemo(
    () => `${editMode ? t(TranslationKey.Edit) : t(TranslationKey.New)} ${t(TranslationKey['report by the product'])}`,
    [editMode],
  )
  const defaultAsinOption = useMemo(() => getDefaultAsinOption(product), [product])
  const disabledLaunchesSelect = useMemo(() => launchOptions.length === 0 || !product, [product, launchOptions.length])
  const disabledAsinsSelect = useMemo(() => !subView || editMode, [subView, editMode])

  return (
    <div className={styles.header}>
      <div className={cx(styles.flexRowContainer, styles.column)}>
        <p className={styles.title}>{modalTitle}</p>

        <div className={styles.flexRowContainer}>
          <CustomSelect
            showSearch
            filterOption={false}
            disabled={disabledAsinsSelect}
            defaultActiveFirstOption={false}
            placeholder="Select ASIN"
            value={defaultAsinOption}
            options={asinOptions}
            optionRender={({ data }) => <AsinOption data={data} />}
            onDropdownVisibleChange={onDropdownVisibleChange}
            onSearch={onSearchAsinSelect}
            onPopupScroll={onPopupScroll}
            onChange={onSelectProduct}
          />

          <CustomSelect
            showSearch
            disabled={disabledLaunchesSelect}
            placeholder="Select launch type"
            options={launchOptions}
            value={selectLaunchValue}
            onChange={onSelectLaunch}
          />
        </div>
      </div>

      <Requests requests={requests} onRemoveRequest={onRemoveRequest} />
    </div>
  )
})
