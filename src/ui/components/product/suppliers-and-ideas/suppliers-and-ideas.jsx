import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

import { Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { MAX_DEFAULT_INPUT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { IdeaViewAndEditCard } from '@components/cards/idea-view-and-edit-card'
import { LinkRequestForm } from '@components/forms/link-request-form'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { CommentsModal } from '@components/modals/comments-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MainRequestResultModal } from '@components/modals/main-request-result-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { SelectShopsModal } from '@components/modals/select-shops-modal'
import { SelectionSupplierModal } from '@components/modals/selection-supplier-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { Button } from '@components/shared/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'

import { checkIsBuyer, checkIsClient } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'
import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './suppliers-and-ideas.style'

import { SuppliersAndIdeasModel } from './suppliers-and-ideas.model'

export const SuppliersAndIdeas = observer(props => {
  const { productId, product, isModalView, currentIdeaId, isCreate, closeModalHandler, updateData } = props
  const { classes: styles } = useStyles()

  const { search } = useLocation()
  const queries = new URLSearchParams(search)
  const selectedIdeaId = queries.get('ideaId')
  const ideaRef = useRef(null)

  const model = useRef(
    new SuppliersAndIdeasModel({
      productId,
      product,
      isModalView,
      currentIdeaId,
      isCreate,
      closeModalHandler,
      updateData,
    }),
  )

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    requestStatus,
    curUser,
    curIdea,
    inEdit,
    inCreate,
    ideasData,
    progressValue,
    showProgress,
    showConfirmModal,
    confirmModalSettings,
    currentProduct,
    productToOrder,
    currentProposal,
    showRequestDesignerResultModal,
    showMainRequestResultModal,
    showRequestBloggerResultModal,
    showLinkRequestModal,
    requestsForProduct,
    showOrderModal,
    platformSettings,
    destinations,
    storekeepers,
    showSetBarcodeModal,
    selectedProduct,
    currentRequest,
    showSelectionSupplierModal,
    currentData,
    languageTag,
    showCommentsModal,
    showSelectShopsModal,
    shopsData,
    setRejectStatusHandler,
    onClickToOrder,
    onClickSaveBarcode,
    onDoubleClickBarcode,
    onClickCreateRequestButton,
    onClickBindButton,
    onClickUnbindButton,
    onClickLinkRequestButton,
    onClickResultButton,
    onClickRejectButton,
    onClickReoperButton,
    onClickAcceptButton,
    onTriggerOpenModal,
    onClickCloseIdea,
    onCreateIdea,
    onClickCancelBtn,
    onClickSaveBtn,
    onSetCurIdea,
    onEditIdea,
    onClickCreateProduct,
    onClickOpenNewTab,
    onClickOpenProduct,
    onClickRequestId,
    onClickSaveSupplierBtn,
    onConfirmSubmitOrderProductModal,
    onSubmitCalculateSeekSupplier,
    onRemoveSupplier,
    onSaveProductData,
  } = model.current

  useEffect(() => {
    if (selectedIdeaId) {
      ideaRef?.current?.scrollIntoView({ behavior: 'smooth' })
    }
  }, [selectedIdeaId, ideasData])

  const showAddProductIdeaButton =
    (checkIsClient(UserRoleCodeMap[curUser.role]) || checkIsBuyer(UserRoleCodeMap[curUser.role])) &&
    !inCreate &&
    !inEdit &&
    !isModalView &&
    currentProduct.status >= 200

  return (
    <div className={styles.mainWrapper}>
      {showAddProductIdeaButton && (
        <div className={styles.btnsWrapper}>
          <Button
            styleType={ButtonStyle.SUCCESS}
            disabled={!!product.parentProductId}
            tooltipInfoContent={product.parentProductId ? t(TranslationKey['This product has a parent product']) : ''}
            onClick={onCreateIdea}
          >
            {t(TranslationKey['Add a product idea'])}
          </Button>
        </div>
      )}

      {inCreate && (
        <IdeaViewAndEditCard
          inCreate
          languageTag={languageTag}
          isModalView={isModalView}
          curUser={curUser}
          idea={curIdea}
          inEdit={inEdit}
          currentProduct={currentProduct}
          onCreateProduct={onClickCreateProduct}
          onClickSaveBtn={onClickSaveBtn}
          onClickCancelBtn={onClickCancelBtn}
          onClickCreateRequestButton={onClickCreateRequestButton}
          onClickLinkRequestButton={onClickLinkRequestButton}
          onClickAcceptButton={onClickAcceptButton}
          onClickCloseIdea={onClickCloseIdea}
          onClickRejectButton={onClickRejectButton}
          onClickReoperButton={onClickReoperButton}
          onClickResultButton={onClickResultButton}
          onSetCurIdea={onSetCurIdea}
          onEditIdea={onEditIdea}
          onClickOpenNewTab={onClickOpenNewTab}
          onClickOpenProduct={onClickOpenProduct}
          onClickToOrder={onClickToOrder}
          onClickRequestId={onClickRequestId}
          onClickUnbindButton={onClickUnbindButton}
          onClickSaveSupplierBtn={onClickSaveSupplierBtn}
          onRemoveSupplier={onRemoveSupplier}
        />
      )}

      {((isModalView && !isCreate) || !inCreate) && (
        <>
          {requestStatus === loadingStatus.IS_LOADING ? (
            <CircularProgressWithLabel />
          ) : curIdea ? (
            <IdeaViewAndEditCard
              isModalView
              languageTag={languageTag}
              curUser={curUser}
              inEdit={inEdit}
              idea={curIdea}
              currentProduct={currentProduct}
              onCreateProduct={onClickCreateProduct}
              onClickSaveBtn={onClickSaveBtn}
              onClickCancelBtn={onClickCancelBtn}
              onClickCreateRequestButton={onClickCreateRequestButton}
              onClickLinkRequestButton={onClickLinkRequestButton}
              onClickAcceptButton={onClickAcceptButton}
              onClickCloseIdea={onClickCloseIdea}
              onClickRejectButton={onClickRejectButton}
              onClickReoperButton={onClickReoperButton}
              onClickResultButton={onClickResultButton}
              onSetCurIdea={onSetCurIdea}
              onEditIdea={onEditIdea}
              onClickOpenNewTab={onClickOpenNewTab}
              onClickOpenProduct={onClickOpenProduct}
              onClickToOrder={onClickToOrder}
              onClickRequestId={onClickRequestId}
              onClickUnbindButton={onClickUnbindButton}
              onClickSaveSupplierBtn={onClickSaveSupplierBtn}
              onRemoveSupplier={onRemoveSupplier}
            />
          ) : (
            <div className={styles.emptyTableWrapper}>
              <img src="/assets/icons/empty-table.svg" />
              <Typography variant="h5" className={styles.emptyTableText}>
                {t(TranslationKey['No ideas yet'])}
              </Typography>
            </div>
          )}
        </>
      )}

      {!isModalView && !isCreate && (
        <>
          {requestStatus === loadingStatus.IS_LOADING ? (
            <CircularProgressWithLabel />
          ) : currentData?.length ? (
            currentData.map(idea => (
              <div key={idea._id} ref={idea._id === selectedIdeaId ? ideaRef : null}>
                <IdeaViewAndEditCard
                  curUser={curUser}
                  inEdit={inEdit}
                  idea={idea}
                  languageTag={languageTag}
                  currentProduct={currentProduct}
                  selectedIdea={selectedIdeaId}
                  onCreateProduct={onClickCreateProduct}
                  onClickSaveBtn={onClickSaveBtn}
                  onClickCancelBtn={onClickCancelBtn}
                  onClickCreateRequestButton={onClickCreateRequestButton}
                  onClickLinkRequestButton={onClickLinkRequestButton}
                  onClickAcceptButton={onClickAcceptButton}
                  onClickCloseIdea={onClickCloseIdea}
                  onClickRejectButton={onClickRejectButton}
                  onClickReoperButton={onClickReoperButton}
                  onClickResultButton={onClickResultButton}
                  onSetCurIdea={onSetCurIdea}
                  onEditIdea={onEditIdea}
                  onClickOpenProduct={onClickOpenProduct}
                  onClickToOrder={onClickToOrder}
                  onClickRequestId={onClickRequestId}
                  onClickUnbindButton={onClickUnbindButton}
                  onClickSaveSupplierBtn={onClickSaveSupplierBtn}
                  onRemoveSupplier={onRemoveSupplier}
                />
              </div>
            ))
          ) : (
            <div className={styles.emptyTableWrapper}>
              <img src="/assets/icons/empty-table.svg" />
              <Typography variant="h5" className={styles.emptyTableText}>
                {t(TranslationKey['No ideas yet'])}
              </Typography>
            </div>
          )}
        </>
      )}

      {showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={confirmModalSettings?.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings.confirmMessage}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={confirmModalSettings.onClickConfirm}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      <Modal
        openModal={showRequestDesignerResultModal}
        setOpenModal={() => onTriggerOpenModal('showRequestDesignerResultModal')}
      >
        <RequestDesignerResultClientForm
          onlyRead
          userInfo={curUser}
          request={{ request: currentRequest }}
          proposal={currentProposal}
          setOpenModal={() => onTriggerOpenModal('showRequestDesignerResultModal')}
        />
      </Modal>

      {showMainRequestResultModal ? (
        <MainRequestResultModal
          readOnly
          customProposal={currentProposal}
          userInfo={curUser}
          openModal={showMainRequestResultModal}
          onOpenModal={() => onTriggerOpenModal('showMainRequestResultModal')}
        />
      ) : null}

      {showRequestBloggerResultModal ? (
        <RequestResultModal
          // @ts-ignore
          proposal={currentProposal}
          openModal={showRequestBloggerResultModal}
          setOpenModal={() => onTriggerOpenModal('showRequestBloggerResultModal')}
        />
      ) : null}

      <Modal openModal={showLinkRequestModal} setOpenModal={() => onTriggerOpenModal('showLinkRequestModal')}>
        <LinkRequestForm
          idea={curIdea}
          onClose={() => onTriggerOpenModal('showLinkRequestModal')}
          onUpdateData={updateData}
        />
      </Modal>

      <Modal missClickModalOn openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
        <OrderProductModal
          platformSettings={platformSettings}
          destinations={destinations}
          storekeepers={storekeepers}
          selectedProductsData={[productToOrder]}
          onTriggerOpenModal={onTriggerOpenModal}
          onDoubleClickBarcode={onDoubleClickBarcode}
          onSubmit={onConfirmSubmitOrderProductModal}
        />
      </Modal>

      <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
        <SetBarcodeModal
          barCode={selectedProduct?.barCode}
          onClickSaveBarcode={onClickSaveBarcode}
          onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
        />
      </Modal>

      <Modal
        openModal={showSelectionSupplierModal}
        setOpenModal={() => onTriggerOpenModal('showSelectionSupplierModal')}
      >
        <SelectionSupplierModal
          product={currentProduct}
          title={t(TranslationKey['Send product card for supplier search'])}
          onSubmitSeekSupplier={onSubmitCalculateSeekSupplier}
          onCloseModal={() => onTriggerOpenModal('showSelectionSupplierModal')}
        />
      </Modal>

      {showCommentsModal ? (
        <CommentsModal
          required
          readOnly={false}
          maxLength={MAX_DEFAULT_INPUT_VALUE}
          title={t(TranslationKey['Reason for rejection'])}
          openModal={showCommentsModal}
          onOpenModal={() => onTriggerOpenModal('showCommentsModal')}
          onChangeField={setRejectStatusHandler}
        />
      ) : null}

      <Modal openModal={showSelectShopsModal} setOpenModal={() => onTriggerOpenModal('showSelectShopsModal')}>
        <SelectShopsModal
          // @ts-ignore
          isNotDisabled
          title={t(TranslationKey['Link a store to a product'])}
          shops={shopsData}
          onClickSuccessBtn={onSaveProductData}
          onClickCancelBtn={() => onTriggerOpenModal('showSelectShopsModal')}
        />
      </Modal>

      {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
    </div>
  )
})
