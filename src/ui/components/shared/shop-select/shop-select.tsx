import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { CustomSelect } from '@components/shared/custom-select'

import { Text } from '../text'

import { ShopSelectModel } from './shop-select.model'

interface ShopSelectProps {
  onChange?: (id: string) => void
}

export const ShopSelect: FC<ShopSelectProps> = observer(({ onChange }) => {
  const viewModel = useMemo(() => new ShopSelectModel(), [])

  return (
    <CustomSelect
      showSearch
      label="Select a store"
      placeholder="Select"
      filterOption={false}
      defaultActiveFirstOption={false}
      options={viewModel.items}
      optionRender={({ label }) => <Text copyable={false} text={String(label)} rows={1} />}
      onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
      onSearch={viewModel.onSearchSubmit}
      onPopupScroll={viewModel.loadMoreData}
      onChange={onChange}
    />
  )
})
