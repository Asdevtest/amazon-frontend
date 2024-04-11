import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Modal } from '@components/shared/modal'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { t } from '@utils/translations'

import { ITagList } from '@typings/models/generals/tag-list'

import { useStyles } from './edit-product-tag.style'

import { EditProductTagModel } from './edit-product-tag.model'

export const EditProductTag = observer(({ openModal, setOpenModal, selectedTags }) => {
  const { classes: styles } = useStyles()

  const [viewModel] = useState(() => new EditProductTagModel('', selectedTags))

  return (
    <Modal missClickModalOn openModal={openModal} setOpenModal={setOpenModal}>
      <div className={styles.container}>
        <WithSearchSelect
          // @ts-ignore
          notCloseOneClick
          grayBorder
          blackSelectedItem
          darkIcon
          chosenItemNoHover
          checkbox
          selectedData={selectedProducts}
          CustomButton={(componentProps: any) => <SelectProductButton {...componentProps} />}
          data={viewModel?.allTags}
          width={300}
          customSubMainWrapper={styles.searchSelectCustomSubMainWrapper}
          customSearchInput={styles.searchSelectCustomSearchInput}
          customItemsWrapper={styles.searchSelectCustomItemsWrapper}
          selectedItemName={t(TranslationKey['Product tags'])}
          onScrollItemList={loadMorePermissionsDataHadler}
          onClickSubmitSearch={onClickSubmitSearch}
          onClickSelect={viewModel?.setSeletedTag}
        />
      </div>
    </Modal>
  )
})
