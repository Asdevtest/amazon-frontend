import { BaseOptionType } from 'antd/es/select'
import { FC, UIEvent, memo, useCallback, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomSelect } from '@components/shared/custom-select'

import { t } from '@utils/translations'

import { Launches as LaunchesEnum } from '@typings/enums/launches'
import { IProduct } from '@typings/models/products/product'
import { LaunchType } from '@typings/types/launch'

import { IPermissionsData } from '@hooks/use-products-permissions'

import { useStyles } from './header.style'

import { ILaunchOption, IRequestWithLaunch } from '../../report-modal.type'

import { AsinOption } from './asin-option'
import { getAsinOptions, getDefaultAsinOption } from './header.config'
import { Requests } from './requests'

interface HeaderProps {
  products: IPermissionsData[]
  editMode: boolean
  launchOptions: ILaunchOption[]
  selectLaunchValue: LaunchesEnum | null
  requests: IRequestWithLaunch[]
  onRemoveRequest: (value: LaunchType) => void
  onSelectLaunch: (value: LaunchesEnum) => void
  onSelectProduct: (value: string, option: BaseOptionType) => void
  onOpenAsinSelect: () => void
  onSearchAsinSelect: (value: string) => void
  onScrollAsinSelect: () => void
  subView?: boolean
  product?: IProduct
}

export const Header: FC<HeaderProps> = memo(props => {
  const {
    products,
    editMode,
    launchOptions,
    selectLaunchValue,
    requests,
    onRemoveRequest,
    onSelectLaunch,
    onSelectProduct,
    onOpenAsinSelect,
    onSearchAsinSelect,
    onScrollAsinSelect,
    subView,
    product,
  } = props

  const { classes: styles, cx } = useStyles()

  const handlePopupScroll = useCallback(
    (e: UIEvent<HTMLElement>) => {
      const element = e.target as HTMLElement
      const scrollTop = element?.scrollTop
      const containerHeight = element?.clientHeight
      const contentHeight = element?.scrollHeight

      if (contentHeight - (scrollTop + containerHeight) < 90) {
        onScrollAsinSelect()
      }
    },
    [onScrollAsinSelect],
  )

  const modalTitle = useMemo(
    () => `${editMode ? t(TranslationKey.Edit) : t(TranslationKey.New)} ${t(TranslationKey['report by the product'])}`,
    [editMode],
  )
  const asinOptions = useMemo(() => getAsinOptions(products), [products])
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
            onDropdownVisibleChange={onOpenAsinSelect}
            onSearch={onSearchAsinSelect}
            onPopupScroll={handlePopupScroll}
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
