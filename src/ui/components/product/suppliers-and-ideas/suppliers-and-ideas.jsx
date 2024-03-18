import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { MAX_DEFAULT_INPUT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { IdeaViewAndEditCard } from '@components/cards/idea-view-and-edit-card'
import { BindIdeaToRequestForm } from '@components/forms/bind-idea-to-request-form'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { CommentsModal } from '@components/modals/comments-modal'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { MainRequestResultModal } from '@components/modals/main-request-result-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { SelectionSupplierModal } from '@components/modals/selection-supplier-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'

import { checkIsBuyer, checkIsClient } from '@utils/checks'
import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

import { useStyles } from './suppliers-and-ideas.style'

import { SuppliersAndIdeasModel } from './suppliers-and-ideas.model'

export const SuppliersAndIdeas = observer(props => {
  const { productId, product, isModalView, currentIdeaId, isCreate, closeModalHandler, updateData } = props
  const { classes: styles } = useStyles()

  const { search } = useLocation()
  const queries = new URLSearchParams(search)
  const selectedIdeaId = queries.get('ideaId')
  const ideaRef = useRef(null)

  const history = useHistory()
  const model = useRef(
    new SuppliersAndIdeasModel({
      history,
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
    showSuccessModal,
    confirmModalSettings,
    currentProduct,
    productToOrder,
    currentProposal,
    showRequestDesignerResultModal,
    showMainRequestResultModal,
    showRequestBloggerResultModal,
    showBindingModal,
    requestsForProduct,
    successModalSettings,
    showOrderModal,
    platformSettings,
    destinations,
    storekeepers,
    showSetBarcodeModal,
    selectedProduct,
    alertShieldSettings,
    currentRequest,
    showSelectionSupplierModal,
    currentData,
    languageTag,
    showCommentsModal,
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
    onClickSaveIcon,
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
            variant="contained"
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
          curIdea={curIdea}
          currentProduct={currentProduct}
          onClickSaveBtn={onClickSaveBtn}
          onClickCancelBtn={onClickCancelBtn}
          onSetCurIdea={onSetCurIdea}
          onClickOpenProduct={onClickOpenProduct}
          onClickSaveSupplierBtn={onClickSaveSupplierBtn}
          onRemoveSupplier={onRemoveSupplier}
        />
      )}

      {isModalView && !isCreate && (
        <>
          {requestStatus === loadingStatuses.IS_LOADING ? (
            <CircularProgressWithLabel />
          ) : curIdea ? (
            <IdeaViewAndEditCard
              isModalView
              languageTag={languageTag}
              curUser={curUser}
              curIdea={curIdea}
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
              onClickSaveIcon={onClickSaveIcon}
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
          {requestStatus === loadingStatuses.IS_LOADING ? (
            <CircularProgressWithLabel />
          ) : currentData?.length ? (
            currentData.map(idea => (
              <div key={idea._id} ref={idea._id === selectedIdeaId ? ideaRef : null}>
                <IdeaViewAndEditCard
                  curUser={curUser}
                  curIdea={curIdea}
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
                  onClickSaveIcon={onClickSaveIcon}
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

      {showSuccessModal ? (
        <SuccessInfoModal
          // @ts-ignore
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={successModalSettings.modalTitle}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={successModalSettings.onClickSuccessBtn}
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
          request={currentRequest}
          proposal={currentProposal}
          openModal={showRequestBloggerResultModal}
          setOpenModal={() => onTriggerOpenModal('showRequestBloggerResultModal')}
        />
      ) : null}

      <Modal openModal={showBindingModal} setOpenModal={() => onTriggerOpenModal('showBindingModal')}>
        <BindIdeaToRequestForm requests={requestsForProduct} onClickBindButton={onClickBindButton} />
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

      {alertShieldSettings.alertShieldMessage && (
        <AlertShield
          showAcceptMessage={alertShieldSettings?.showAlertShield}
          acceptMessage={alertShieldSettings?.alertShieldMessage}
        />
      )}

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

      {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
    </div>
  )
})
