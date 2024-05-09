import { observer } from 'mobx-react'
import { FC, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/button'
import { CircleSpinner } from '@components/shared/circle-spinner'
import { Modal } from '@components/shared/modal'
import { TagsSelect } from '@components/shared/selects/tags-select'
import { TagItem } from '@components/shared/tag-item'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

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
  const { classes: styles, cx } = useStyles()

  const { openModal, setOpenModal, productId, handleUpdateRow } = props

  const [viewModel] = useState(() => new EditProductTagModel(productId))

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.container}>
        <p className={styles.title}>{t(TranslationKey['Edit product tags'])}</p>

        {viewModel.requestTagsByIdStatus === loadingStatus.IS_LOADING ? (
          <div className={cx(styles.tagsList, styles.noTagsWrapper)}>
            <CircleSpinner size={50} />
          </div>
        ) : (
          <div className={cx(styles.tagsList, { [styles.noTagsWrapper]: !viewModel.selectedTags?.length })}>
            {viewModel.selectedTags?.length ? (
              viewModel.selectedTags?.map(tag => (
                <TagItem key={tag._id} option={tag.title} onClickRemove={() => viewModel.handleClickTag(tag)} />
              ))
            ) : (
              <p className={styles.noTagsText}>{t(TranslationKey['No data'])}</p>
            )}
          </div>
        )}

        <TagsSelect
          isloadingTags={viewModel.requestStatus === loadingStatus.IS_LOADING}
          tags={viewModel.tags}
          selectedTags={viewModel.selectedTags}
          getTagsAll={viewModel.getTagsAll}
          loadMoreDataHadler={viewModel.loadMoreDataHadler}
          handleResetTags={viewModel.handleResetTags}
          onClickTag={viewModel.handleClickTag}
          onClickSubmitSearch={viewModel.onClickSubmitSearch}
          onClickCreateTag={viewModel.handleCreateTag}
        />

        <div className={styles.buttonsWrapper}>
          <Button
            styleType={ButtonStyle.SUCCESS}
            onClick={async () => {
              await viewModel.handleBindTagsToProduct(handleUpdateRow)
              setOpenModal(false)
            }}
          >
            {t(TranslationKey.Save)}
          </Button>
          <Button styleType={ButtonStyle.CASUAL} onClick={() => setOpenModal(false)}>
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </Modal>
  )
})
