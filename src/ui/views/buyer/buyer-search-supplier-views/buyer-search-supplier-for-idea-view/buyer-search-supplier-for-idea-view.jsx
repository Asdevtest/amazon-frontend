import FilterAltOutlinedIcon from '@mui/icons-material/FilterAltOutlined'

import React, {Component} from 'react'

import {observer} from 'mobx-react'
import {withStyles} from 'tss-react/mui'

import {loadingStatuses} from '@constants/statuses/loading-statuses'
import {TranslationKey} from '@constants/translations/translation-key'

import {DataGridCustomToolbar} from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'
import {MainContent} from '@components/layout/main-content'
import {WarningInfoModal} from '@components/modals/warning-info-modal'
import {Button} from '@components/shared/buttons/button'
import {MemoDataGrid} from '@components/shared/memo-data-grid'

import {getLocalizationByLanguageTag} from '@utils/data-grid-localization'
import {t} from '@utils/translations'

import {BuyerSearchSupplierForIdeaModel} from './buyer-search-supplier-for-idea-view.model'
import {styles} from './buyer-search-supplier-for-idea-view.style'

@observer
export class BuyerSearchSupplierForIdeaViewRaw extends Component {
  viewModel = new BuyerSearchSupplierForIdeaModel({history: this.props.history})

  componentDidMount() {
    this.viewModel.loadData()
  }

  render() {
    const {
      getCurrentData,
      selectedRowIds,
      columnsModel,
      requestStatus,
      showInfoModal,
      onSelectionModel,
      onTriggerOpenModal,
      onPickupSomeItems,
      setDataGridState,
    } = this.viewModel
    const {classes: classNames} = this.props

    return (
      <React.Fragment>
        <MainContent>
          <div className={classNames.btnsWrapper}>
            <Button
              color="primary"
              variant="contained"
              disabled={selectedRowIds.length === 0}
              onClick={onPickupSomeItems}
            >
              {t(TranslationKey['Take on the work of the selected'])}
            </Button>
          </div>
          <div className={classNames.datagridWrapper}>
            <MemoDataGrid
              checkboxSelection
              pagination
              useResizeContainer
              classes={{
                root: classNames.root,
                footerContainer: classNames.footerContainer,
                footerCell: classNames.footerCell,
                toolbarContainer: classNames.toolbarContainer,
              }}
              components={{
                Toolbar: DataGridCustomToolbar,
                ColumnMenuIcon: FilterAltOutlinedIcon,
              }}
              localeText={getLocalizationByLanguageTag()}
              rowsPerPageOptions={[15, 25, 50, 100]}
              rows={getCurrentData()}
              rowHeight={100}
              columns={columnsModel}
              loading={requestStatus === loadingStatuses.isLoading}
              onSelectionModelChange={newSelection => onSelectionModel(newSelection)}
              onStateChange={setDataGridState}
            />
          </div>
        </MainContent>

        <WarningInfoModal
          openModal={showInfoModal}
          setOpenModal={() => onTriggerOpenModal('showInfoModal')}
          title={t(TranslationKey['Taken to Work'])}
          btnText={t(TranslationKey.Ok)}
          onClickBtn={() => {
            onTriggerOpenModal('showInfoModal')
          }}
        />
      </React.Fragment>
    )
  }
}

export const BuyerSearchSupplierForIdeaView = withStyles(BuyerSearchSupplierForIdeaViewRaw, styles)
