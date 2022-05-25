import {twitterTabsStylesHook} from '@mui-treasury/styles/tabs'
import {DataGrid} from '@mui/x-data-grid'

import React, {useState} from 'react'

import {Typography, Box, Tabs, Tab} from '@material-ui/core'
import clsx from 'clsx'
import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'

import {addIdDataConverter} from '@utils/data-grid-data-converters'
import {t} from '@utils/translations'

import {logisticsTariffsColumns, warehouseTariffsColumns} from './select-storkeeper-and-tariff-form-columns'
import {useClassNames} from './select-storkeeper-and-tariff-form.style'

const TabPanel = ({children, value, index, ...other}) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
)

export const SelectStorekeeperAndTariffForm = observer(({storekeepers, curStorekeeperId, curTariffId, onSubmit}) => {
  const classNames = useClassNames()

  const [tabIndex, setTabIndex] = React.useState(0)
  const tabItemStyles = twitterTabsStylesHook.useTabItem()

  const [curStorekeeper, setCurStorekeeper] = useState(
    curStorekeeperId
      ? storekeepers.find(el => el._id === curStorekeeperId)
      : storekeepers.slice().sort((a, b) => a.name.localeCompare(b.name))[0],
  )

  const onClickSelectTariff = tariffId => {
    onSubmit(curStorekeeper._id, tariffId)
  }

  const getRowClassName = params => curTariffId === params.getValue(params.id, '_id') && classNames.attentionRow

  return (
    <div className={classNames.root}>
      <div className={classNames.boxesFiltersWrapper}>
        {storekeepers
          .slice()
          .sort((a, b) => a.name.localeCompare(b.name))
          .map(storekeeper => (
            <Button
              key={storekeeper._id}
              disabled={curStorekeeper?._id === storekeeper._id}
              className={clsx(
                classNames.button,
                {
                  [classNames.selectedBoxesBtn]: curStorekeeper?._id === storekeeper._id,
                },
                {
                  [classNames.selectedStorekeeperBtn]: curStorekeeperId === storekeeper._id,
                },
              )}
              variant="text"
              color="primary"
              onClick={() => setCurStorekeeper(storekeeper)}
            >
              {storekeeper.name}
            </Button>
          ))}
      </div>

      <Tabs
        variant={'fullWidth'}
        classes={{
          root: classNames.row,
          indicator: classNames.indicator,
        }}
        value={tabIndex}
        onChange={(e, index) => setTabIndex(index)}
      >
        <Tab classes={tabItemStyles} label={t(TranslationKey['Logistics tariffs'])} />
        <Tab classes={tabItemStyles} label={t(TranslationKey['Tariffs of warehouse services'])} />
      </Tabs>
      <TabPanel value={tabIndex} index={0}>
        <div className={classNames.tableWrapper}>
          <DataGrid
            hideFooter
            getRowClassName={getRowClassName}
            rows={
              curStorekeeper.tariffLogistics?.length ? toJS(addIdDataConverter(curStorekeeper.tariffLogistics)) : []
            }
            columns={logisticsTariffsColumns({onClickSelectTariff})}
            rowHeight={100}
          />
        </div>
        <div className={classNames.clearBtnWrapper}>
          <Button disableElevation color="primary" variant={'outlined'} onClick={() => onSubmit('', '')}>
            {t(TranslationKey.reset)}
          </Button>
        </div>
      </TabPanel>
      <TabPanel value={tabIndex} index={1}>
        <div className={classNames.tableWrapper}>
          <DataGrid
            hideFooter
            rows={
              curStorekeeper.tariffWarehouses?.length ? toJS(addIdDataConverter(curStorekeeper.tariffWarehouses)) : []
            }
            columns={warehouseTariffsColumns()}
            rowHeight={100}
          />
        </div>
      </TabPanel>
    </div>
  )
})
