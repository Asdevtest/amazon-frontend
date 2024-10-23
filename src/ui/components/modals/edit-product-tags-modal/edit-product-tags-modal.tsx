import isEqual from 'lodash.isequal'
import { observer } from 'mobx-react'
import { FC, MouseEvent, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { AddOrEditTagForm } from '@components/forms/add-or-edit-tag-form'
import { CustomButton } from '@components/shared/custom-button'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomTag } from '@components/shared/custom-tag'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'
import { ITag } from '@typings/shared/tag'

import { useDebounce } from '@hooks/use-debounce'

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

  viewModel.setDebounceSearchValue = useDebounce(viewModel.searchValue)

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.container}>
        <p className={styles.title}>{t(TranslationKey['Edit product tags'])}</p>

        <CustomSelect
          allowClear
          filterOption={false}
          searchValue={viewModel.searchValue}
          loading={viewModel.requestTagsByIdStatus === loadingStatus.IS_LOADING}
          placeholder="Product tags"
          mode="multiple"
          fieldNames={{ label: 'title', value: '_id' }}
          value={viewModel.selectedTags?.map(tag => ({ value: tag._id }))}
          options={viewModel.tags}
          className={styles.selectTags}
          maxCount={20}
          tagRender={tagRenderProps => {
            const { value, onClose } = tagRenderProps
            const onPreventMouseDown = (event: MouseEvent<HTMLSpanElement>) => {
              event.preventDefault()
              event.stopPropagation()
            }

            const currentTag = viewModel.selectedTags.find(tag => tag._id === value)

            return (
              <CustomTag
                closable
                className={styles.customTag}
                title={currentTag?.title}
                color={currentTag?.color}
                tooltipText={currentTag?.title}
                onMouseDown={onPreventMouseDown}
                onClose={onClose}
              />
            )
          }}
          popupClassName={styles.popup}
          onSelect={(value, option) => viewModel.handleSelectTag(option as ITag)}
          onDeselect={value => viewModel.handleDeleteTag(value)}
          onPopupScroll={viewModel.loadMoreDataHadler}
          onSearch={viewModel.onSearch}
          onClear={viewModel.handleClearTags}
        />

        <div className={styles.footerModal}>
          <CustomButton type="primary" onClick={viewModel.onClickToggleAddOrEditModal}>
            {t(TranslationKey['Add Tag'])}
          </CustomButton>

          <div className={styles.buttonsWrapper}>
            <CustomButton
              type="primary"
              disabled={isEqual(viewModel.selectedTags, viewModel.selectedTagsBase)}
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
