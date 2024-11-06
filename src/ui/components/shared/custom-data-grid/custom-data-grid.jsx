import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io'
import { MdOutlineFilterAlt } from 'react-icons/md'

import { DataGridPremium } from '@mui/x-data-grid-premium'

import { SettingsModel } from '@models/settings-model'

import { DataGridCustomColumnMenuComponent } from '@components/data-grid/data-grid-custom-components/data-grid-custom-column-component'
import { DataGridCustomToolbar } from '@components/data-grid/data-grid-custom-components/data-grid-custom-toolbar'

import { getLocalizationByLanguageTag } from '@utils/data-grid-localization'

import { SeparatorIcon } from '../svg-icons'

export const CustomDataGrid = ({ ...restProps }) => (
  <div className="tableWrapper">
    <DataGridPremium
      key={SettingsModel.languageTag}
      pagination
      hideFooter
      useResizeContainer
      disableVirtualization
      sortingMode="server"
      paginationMode="server"
      getRowId={({ _id }) => _id}
      pageSizeOptions={[15, 25, 50, 100]}
      localeText={getLocalizationByLanguageTag()}
      slots={{
        toolbar: DataGridCustomToolbar,
        columnMenuIcon: MdOutlineFilterAlt,
        columnMenu: DataGridCustomColumnMenuComponent,
        columnResizeIcon: SeparatorIcon,
        detailPanelExpandIcon: IoIosArrowDown,
        detailPanelCollapseIcon: IoIosArrowUp,
      }}
      {...restProps}
    />
  </div>
)
