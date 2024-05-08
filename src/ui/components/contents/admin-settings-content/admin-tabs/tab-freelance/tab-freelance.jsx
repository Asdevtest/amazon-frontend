import { observer } from 'mobx-react'
import { useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { TextForm } from '@components/forms/text-form'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { Button } from '@components/shared/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { loadingStatus } from '@typings/enums/loading-status'

import { useStyles } from './tab-freelance.style'

import { fieldNameObject } from '../../admin-settings.constants'

import { AdminSettingsFreelanceModel } from './tab-freelance.model'

export const TabFreelance = observer(props => {
  const { formFields, isFormFieldsChanged, onSubmit, onChangeField } = props

  const { classes: styles } = useStyles()
  const [viewModel] = useState(() => new AdminSettingsFreelanceModel())

  const disabledSubmit =
    !isFormFieldsChanged ||
    Number(formFields.requestPlatformMarginInPercent) === 0 ||
    Number(formFields.requestMinAmountPriceOfProposal) === 0 ||
    Number(formFields.requestSupervisorFeeInPercent) === 0 ||
    Number(formFields.requestTimeLimitInHourForCancelingProposalsByClient) === 0 ||
    Number(formFields.requestTimeLimitInHourForCheckingProposalBySuper) === 0

  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.textFields}>
          <Field
            labelClasses={styles.label}
            label={t(TranslationKey['Percentage of each proposal']) + ', %'}
            classes={{ root: styles.textField }}
            value={formFields.requestPlatformMarginInPercent}
            error={formFields.requestPlatformMarginInPercent === ''}
            onChange={e => onChangeField(fieldNameObject.requestPlatformMarginInPercent, e)}
          />
          <Field
            labelClasses={styles.label}
            label={t(TranslationKey['Time after which the offer will automatically be accepted, h'])}
            classes={{ root: styles.textField }}
            value={formFields.requestTimeLimitInHourForCancelingProposalsByClient}
            error={formFields.requestTimeLimitInHourForCancelingProposalsByClient === ''}
            onChange={e => onChangeField(fieldNameObject.requestTimeLimitInHourForCancelingProposalsByClient, e)}
          />
          <Field
            labelClasses={styles.label}
            label={t(TranslationKey['Minimum price per proposal to the order']) + ', $'}
            classes={{ root: styles.textField }}
            value={formFields.requestMinAmountPriceOfProposal}
            error={formFields.requestMinAmountPriceOfProposal === ''}
            onChange={e => onChangeField(fieldNameObject.requestMinAmountPriceOfProposal, e)}
          />
          <Field
            labelClasses={styles.label}
            label={t(TranslationKey['Percentage of each proposal for the supervisor']) + ', %'}
            classes={{ root: styles.textField }}
            value={formFields.requestSupervisorFeeInPercent}
            error={formFields.requestSupervisorFeeInPercent === ''}
            onChange={e => onChangeField(fieldNameObject.requestSupervisorFeeInPercent, e)}
          />
          <Field
            labelClasses={styles.label}
            label={t(TranslationKey['Time after which the supervisor will automatically be removed from the check, h'])}
            classes={{ root: styles.textField }}
            value={formFields.requestTimeLimitInHourForCheckingProposalBySuper}
            error={formFields.requestTimeLimitInHourForCheckingProposalBySuper === ''}
            onChange={e => onChangeField(fieldNameObject.requestTimeLimitInHourForCheckingProposalBySuper, e)}
          />

          <Button disabled={disabledSubmit} onClick={onSubmit}>
            {t(TranslationKey.Save)}
          </Button>
        </div>

        <div className={styles.tableContainer}>
          <p className={styles.tableTitle}>{t(TranslationKey.Specialties)}</p>

          <div className={styles.tableWrapper}>
            <CustomDataGrid
              disableColumnMenu
              disableColumnResize
              disableRowSelectionOnClick
              sortingMode="client"
              paginationMode="client"
              rows={viewModel.specs}
              columnHeaderHeight={50}
              getRowHeight={() => 'auto'}
              getRowId={row => row._id}
              columns={viewModel.columnsModel}
              loading={viewModel.requestStatus === loadingStatus.IS_LOADING}
              slots={{}}
              sx={{
                '& .MuiDataGrid-columnHeaderTitleContainer': styles.columnHeaderTitleContainer,
                '& .MuiDataGrid-columnHeaderDraggableContainer': styles.columnHeaderTitleContainer,
              }}
            />

            <div style={{ height: 40 }} />
          </div>
        </div>
      </div>

      <Modal openModal={viewModel.showAddOrEditTextModal} setOpenModal={viewModel.onClickToggleAddOrEditTextModal}>
        <TextForm
          title={t(TranslationKey['New specialty'])}
          onClose={viewModel.onClickToggleAddOrEditTextModal}
          onSubmit={viewModel.onCreateSpec}
        />
      </Modal>

      {viewModel.showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={viewModel.confirmModalSettings?.isWarning}
          openModal={viewModel.showConfirmModal}
          setOpenModal={viewModel.onClickToggleConfirmModal}
          title={t(TranslationKey.Attention)}
          message={viewModel.confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={viewModel.confirmModalSettings.onClickSuccess}
          onClickCancelBtn={viewModel.onClickToggleConfirmModal}
        />
      ) : null}
    </>
  )
})
