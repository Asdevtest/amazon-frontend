import { Select, Tag } from 'antd'
import type { SelectProps } from 'antd'
import { BaseOptionType } from 'antd/es/select'
import { observer } from 'mobx-react'
import { ChangeEvent, FC, Fragment, useMemo, useState } from 'react'
import { FaPlus } from 'react-icons/fa'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditTagForm } from '@components/forms/add-or-edit-tag-form'
import { Button } from '@components/shared/button'
import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomTag } from '@components/shared/custom-tag'
import { Modal } from '@components/shared/modal'
import { TagsSelect } from '@components/shared/selects/tags-select'
import { TagList } from '@components/shared/tag-list'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'
import { ITag } from '@typings/shared/tag'

import { useStyles } from './edit-product-tags-modal.style'

import { EditProductTagModel } from './edit-product-tags-modal.model'
import { IHandleUpdateRow } from './edit-product-tags.type'

interface EditProductTagsProps {
  openModal: boolean
  productId: string
  setOpenModal: (openModal: boolean) => void
  handleUpdateRow: IHandleUpdateRow
}

export const EditProductTags: FC<EditProductTagsProps> = observer(props => {
  const { classes: styles } = useStyles()

  const { openModal, productId, setOpenModal, handleUpdateRow } = props

  const viewModel = useMemo(() => new EditProductTagModel(productId), [])

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.container}>
        <p className={styles.title}>{t(TranslationKey['Edit product tags'])}</p>

        <CustomSelect
          loading={viewModel.requestTagsByIdStatus === loadingStatus.IS_LOADING}
          placeholder="Product tags"
          mode="multiple"
          fieldNames={{ label: 'title', value: '_id' }}
          value={viewModel.selectedTags}
          options={viewModel.tags}
          style={{ width: '100%' }}
          labelRender={tag => {
            console.log('tag', tag)
          }}
          onChange={(props, value) => console.log('onChange', props, value)}
          onSelect={(value, option) => console.log('onSelect', value, option)}
          onDeselect={(value, option) => console.log('onDeselect', value, option)}
        />

        {/* <TagList
          isLoading={viewModel.requestTagsByIdStatus === loadingStatus.IS_LOADING}
          selectedTags={viewModel.selectedTags}
          handleClickTag={}
        /> */}

        {/* <TagsSelect
          isloadingTags={viewModel.requestStatus === loadingStatus.IS_LOADING}
          tags={viewModel.tags}
          selectedTags={viewModel.selectedTags}
          getTagsAll={viewModel.getTagsAll}
          loadMoreDataHadler={viewModel.loadMoreDataHadler}
          handleResetTags={viewModel.handleResetTags}
          onClickTag={viewModel.handleClickTag}
          onClickSubmitSearch={viewModel.onClickSubmitSearch}
          onClickCreateTag={viewModel.handleCreateTag}
        /> */}

        <div className={styles.footerModal}>
          <CustomButton type="primary" onClick={viewModel.onClickToggleAddOrEditModal}>
            {t(TranslationKey['Add Tag'])}
          </CustomButton>

          <div className={styles.buttonsWrapper}>
            <CustomButton
              type="primary"
              onClick={async () => {
                await viewModel.handleBindTagsToProduct(handleUpdateRow)
                setOpenModal(false)
              }}
            >
              {t(TranslationKey.Save)}
            </CustomButton>
            <CustomButton type="text" onClick={() => setOpenModal(false)}>
              {t(TranslationKey.Close)}
            </CustomButton>
          </div>
        </div>
      </div>

      <Modal openModal={viewModel.showAddOrEditTagModal} setOpenModal={viewModel.onClickToggleAddOrEditModal}>
        <AddOrEditTagForm
          tags={viewModel.tags || []}
          onCloseModal={viewModel.onClickToggleAddOrEditModal}
          onCreateSubmit={viewModel.handleCreateTag}
        />
      </Modal>
    </Modal>
  )
})
