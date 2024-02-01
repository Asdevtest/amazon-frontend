import { observer } from 'mobx-react'
import { useState } from 'react'

import { loadingStatuses } from '@constants/statuses/loading-statuses'
import { TranslationKey } from '@constants/translations/translation-key'

import { TextForm } from '@components/forms/text-form'
import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'
import { t } from '@utils/translations'

import { useStyles } from './tab-freelance.style'

import { fieldNameObject } from '../../admin-settings.constants'

import { AdminSettingsFreelanceModel } from './tab-freelance.model'

export const TabFreelance = observer(props => {
  const { formFields, isFormFieldsChanged, onSubmit, onChangeField } = props

  const [viewModel] = useState(() => new AdminSettingsFreelanceModel())

  const { classes: styles } = useStyles()

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

          <Button disabled={disabledSubmit} className={styles.button} onClick={onSubmit}>
            {t(TranslationKey.Save)}
          </Button>
        </div>

        <div className={styles.tableContainer}>
          <p className={styles.tableTitle}>{t(TranslationKey.Specialties)}</p>

          {/* uncomment everything if you need delete specs functionality and remove block "<div style={{ height: 40 }} />" */}
          <div className={styles.tableWrapper}>
            <CustomDataGrid
              // checkboxSelection
              disableColumnMenu
              disableColumnResize
              disableRowSelectionOnClick
              localeText={getLocalizationByLanguageTag()}
              sortingMode="client"
              paginationMode="client"
              rows={viewModel.specs}
              columnHeaderHeight={50}
              getRowHeight={() => 'auto'}
              getRowId={row => row._id}
              columns={viewModel.columnsModel}
              // rowSelectionModel={viewModel.rowSelectionModel}
              loading={viewModel.requestStatus === loadingStatuses.IS_LOADING}
              slots={{}}
              sx={{
                '& .MuiDataGrid-columnHeaderTitleContainer': styles.columnHeaderTitleContainer,
                '& .MuiDataGrid-columnHeaderDraggableContainer': styles.columnHeaderTitleContainer,
              }}
              // onRowSelectionModelChange={viewModel.onSelectionModel}
            />

            <div style={{ height: 40 }} />
            {/* <div className={styles.buttonWrapper}>
              <Button
                danger
                disabled={!viewModel.rowSelectionModel.length}
                className={styles.button}
                onClick={e => {
                  e.stopPropagation()
                  viewModel.onRemoveSpecs()
                }}
              >
                {t(TranslationKey['Delete selected'])}
              </Button>
            </div> */}
          </div>
        </div>
      </div>

      {viewModel.showAddOrEditTextModal ? (
        <Modal openModal={viewModel.showAddOrEditTextModal} setOpenModal={viewModel.onClickToggleAddOrEditTextModal}>
          <TextForm
            title={t(TranslationKey['New specialty'])}
            onClose={viewModel.onClickToggleAddOrEditTextModal}
            onSubmit={viewModel.onCreateSpec}
          />
        </Modal>
      ) : null}
    </>
  )
})
