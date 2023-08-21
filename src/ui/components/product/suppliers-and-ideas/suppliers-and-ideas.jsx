/* eslint-disable no-unused-vars */
import { observer } from 'mobx-react'
import React, { useEffect, useRef } from 'react'
import { useHistory, useLocation } from 'react-router-dom'

import { Typography } from '@mui/material'

import { UserRoleCodeMap } from '@constants/keys/user-roles'
import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { IdeaViewAndEditCard } from '@components/cards/idea-view-and-edit-card'
import { BindIdeaToRequestForm } from '@components/forms/bind-idea-to-request-form'
import { RequestDesignerResultClientForm } from '@components/forms/request-designer-result-client-form'
import { RequestStandartResultForm } from '@components/forms/request-standart-result-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { OrderProductModal } from '@components/modals/order-product-modal'
import { RequestResultModal } from '@components/modals/request-result-modal'
import { SetBarcodeModal } from '@components/modals/set-barcode-modal'
import { SuccessInfoModal } from '@components/modals/success-info-modal'
import { AlertShield } from '@components/shared/alert-shield'
import { Button } from '@components/shared/buttons/button'
import { CircularProgressWithLabel } from '@components/shared/circular-progress-with-label'
import { Modal } from '@components/shared/modal'

import { checkIsBuyer, checkIsClient } from '@utils/checks'
import { t } from '@utils/translations'

import { useClassNames } from './suppliers-and-ideas.style'

import { AddOrEditSupplierModalContent } from '../add-or-edit-supplier-modal-content/add-or-edit-supplier-modal-content'

import { SuppliersAndIdeasModel } from './suppliers-and-ideas.model'

export const SuppliersAndIdeas = observer(
  ({ productId, product, isModalView, currentIdeaId, isCreate, closeModalHandler }) => {
    const { classes: classNames } = useClassNames()

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
      }),
    )

    useEffect(() => {
      model.current.loadData()
    }, [])

    const {
      supplierModalReadOnly,
      requestStatus,
      yuanToDollarRate,
      volumeWeightCoefficient,
      selectedSupplier,
      curUser,
      curIdea,
      inEdit,
      inCreate,
      ideasData,
      progressValue,
      showProgress,
      showConfirmModal,
      showSuccessModal,
      showAddOrEditSupplierModal,
      confirmModalSettings,
      paymentMethods,
      currentProduct,
      currentProposal,
      showRequestDesignerResultModal,
      showRequestStandartResultModal,
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
      supplierData,
      currentRequest,
      onClickToOrder,
      onClickSaveBarcode,
      onDoubleClickBarcode,
      onClickCreateRequestButton,
      onClickBindButton,
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
      onClickSupplierButtons,
      onClickOpenNewTab,
      onClickRequestId,

      onChangeSelectedSupplier,
      onTriggerAddOrEditSupplierModal,
      onClickSaveSupplierBtn,
      onConfirmSubmitOrderProductModal,
    } = model.current

    useEffect(() => {
      if (selectedIdeaId) {
        ideaRef?.current?.scrollIntoView({ behavior: 'smooth' })
      }
    }, [selectedIdeaId, ideasData])

    return (
      <div className={classNames.mainWrapper}>
        {(checkIsClient(UserRoleCodeMap[curUser.role]) || checkIsBuyer(UserRoleCodeMap[curUser.role])) &&
          !inCreate &&
          !inEdit &&
          !isModalView && (
            <div className={classNames.btnsWrapper}>
              <Button success variant="contained" onClick={onCreateIdea}>
                {t(TranslationKey['Add a product idea'])}
              </Button>
            </div>
          )}

        {inCreate && (
          <IdeaViewAndEditCard
            inCreate
            isModalView={isModalView}
            curUser={curUser}
            curIdea={curIdea}
            currentProduct={currentProduct}
            selectedSupplier={selectedSupplier}
            onClickSaveBtn={onClickSaveBtn}
            onClickCancelBtn={onClickCancelBtn}
            onSetCurIdea={onSetCurIdea}
            onClickSupplierBtns={onClickSupplierButtons}
            onClickSupplier={onChangeSelectedSupplier}
          />
        )}

        {isModalView && curIdea && (
          <>
            {requestStatus === loadingStatuses.isLoading ? (
              <CircularProgressWithLabel />
            ) : (
              <IdeaViewAndEditCard
                isModalView
                curUser={curUser}
                curIdea={curIdea}
                inEdit={inEdit}
                idea={curIdea}
                currentProduct={currentProduct}
                selectedSupplier={selectedSupplier}
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
                onClickSupplierBtns={onClickSupplierButtons}
                onClickSupplier={onChangeSelectedSupplier}
                onClickSaveIcon={onClickSaveIcon}
                onClickOpenNewTab={onClickOpenNewTab}
                onClickToOrder={onClickToOrder}
                onClickRequestId={onClickRequestId}
              />
            )}
          </>
        )}

        {!isModalView &&
          (requestStatus === loadingStatuses.isLoading ? (
            <CircularProgressWithLabel />
          ) : SettingsModel.languageTag && ideasData.length ? (
            ideasData.map(idea => (
              <div key={idea._id} ref={idea._id === selectedIdeaId ? ideaRef : null}>
                <IdeaViewAndEditCard
                  curUser={curUser}
                  curIdea={curIdea}
                  inEdit={inEdit}
                  idea={idea}
                  currentProduct={currentProduct}
                  selectedSupplier={selectedSupplier}
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
                  onClickSupplierBtns={onClickSupplierButtons}
                  onClickSupplier={onChangeSelectedSupplier}
                  onClickSaveIcon={onClickSaveIcon}
                  onClickToOrder={onClickToOrder}
                  onClickRequestId={onClickRequestId}
                />
              </div>
            ))
          ) : (
            <div className={classNames.emptyTableWrapper}>
              <img src="/assets/icons/empty-table.svg" />
              <Typography variant="h5" className={classNames.emptyTableText}>
                {t(TranslationKey['No ideas yet'])}
              </Typography>
            </div>
          ))}

        <Modal
          missClickModalOn={!supplierModalReadOnly}
          openModal={showAddOrEditSupplierModal}
          setOpenModal={onTriggerAddOrEditSupplierModal}
        >
          <AddOrEditSupplierModalContent
            paymentMethods={paymentMethods}
            onlyRead={supplierModalReadOnly}
            requestStatus={requestStatus}
            sourceYuanToDollarRate={yuanToDollarRate}
            volumeWeightCoefficient={volumeWeightCoefficient}
            title={t(TranslationKey['Adding and editing a supplier'])}
            supplier={supplierData || selectedSupplier}
            showProgress={showProgress}
            progressValue={progressValue}
            onClickSaveBtn={onClickSaveSupplierBtn}
            onTriggerShowModal={onTriggerAddOrEditSupplierModal}
          />
        </Modal>

        <ConfirmationModal
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

        <SuccessInfoModal
          openModal={showSuccessModal}
          setOpenModal={() => onTriggerOpenModal('showSuccessModal')}
          title={successModalSettings.modalTitle}
          successBtnText={t(TranslationKey.Ok)}
          onClickSuccessBtn={successModalSettings.onClickSuccessBtn}
        />

        {showRequestDesignerResultModal && (
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
        )}

        {showRequestStandartResultModal && (
          <Modal
            openModal={showRequestStandartResultModal}
            setOpenModal={() => onTriggerOpenModal('showRequestStandartResultModal')}
          >
            <RequestStandartResultForm
              request={{ request: currentRequest }}
              proposal={currentProposal}
              setOpenModal={() => onTriggerOpenModal('showRequestStandartResultModal')}
            />
          </Modal>
        )}

        {showRequestBloggerResultModal && (
          <RequestResultModal
            request={{ request: currentRequest }}
            proposal={currentProposal}
            openModal={showRequestBloggerResultModal}
            setOpenModal={() => onTriggerOpenModal('showRequestBloggerResultModal')}
          />
        )}

        {showBindingModal && (
          <Modal openModal={showBindingModal} setOpenModal={() => onTriggerOpenModal('showBindingModal')}>
            <BindIdeaToRequestForm requests={requestsForProduct} onClickBindButton={onClickBindButton} />
          </Modal>
        )}

        <Modal missClickModalOn openModal={showOrderModal} setOpenModal={() => onTriggerOpenModal('showOrderModal')}>
          <OrderProductModal
            platformSettings={platformSettings}
            destinations={destinations}
            storekeepers={storekeepers}
            selectedProductsData={[currentProduct]}
            onTriggerOpenModal={onTriggerOpenModal}
            onDoubleClickBarcode={onDoubleClickBarcode}
            onSubmit={onConfirmSubmitOrderProductModal}
          />
        </Modal>

        <Modal openModal={showSetBarcodeModal} setOpenModal={() => onTriggerOpenModal('showSetBarcodeModal')}>
          <SetBarcodeModal
            item={selectedProduct}
            onClickSaveBarcode={onClickSaveBarcode}
            onCloseModal={() => onTriggerOpenModal('showSetBarcodeModal')}
          />
        </Modal>

        {alertShieldSettings.alertShieldMessage && (
          <AlertShield
            showAcceptMessage={alertShieldSettings?.showAlertShield}
            acceptMessage={alertShieldSettings?.alertShieldMessage}
          />
        )}

        {showProgress && <CircularProgressWithLabel value={progressValue} title={t(TranslationKey['Uploading...'])} />}
      </div>
    )
  },
)
