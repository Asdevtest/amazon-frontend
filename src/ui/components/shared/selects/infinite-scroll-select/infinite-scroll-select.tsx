import { BaseOptionType } from 'antd/es/select'
import { observer } from 'mobx-react'
import { ComponentType, createElement, useMemo } from 'react'

import { ICallback } from '@models/infinite-scroll-model/infinite-scroll.model'

import { CustomSelect } from '@components/shared/selects/custom-select'
import { CustomSelectProps } from '@components/shared/selects/custom-select/custom-select'

import { GenerateOptionType, InfiniteScrollSelectModel } from './infinite-scroll-select.model'

interface InfiniteScrollSelectProps<T> extends CustomSelectProps {
  method: ICallback
  optionNode: ComponentType<{ data: BaseOptionType }>
  optionValue: keyof T
  optionLabel: keyof T
  generateOptions?: GenerateOptionType<T>
}

export const InfiniteScrollSelect = observer(<T,>(props: InfiniteScrollSelectProps<T>) => {
  const { method, optionNode, optionLabel, optionValue, generateOptions, ...restProps } = props

  const viewModel = useMemo(() => new InfiniteScrollSelectModel<T>({ method, optionLabel, optionValue }), [])

  return (
    <CustomSelect
      {...restProps}
      showSearch
      loading={viewModel.loading}
      filterOption={false}
      defaultActiveFirstOption={false}
      options={viewModel.items}
      optionRender={({ data }) => createElement(optionNode, { key: data._id, data })}
      onDropdownVisibleChange={viewModel.onDropdownVisibleChange}
      onSearch={viewModel.onSearchSubmit}
      onPopupScroll={viewModel.loadMoreData}
    />
  )
})
