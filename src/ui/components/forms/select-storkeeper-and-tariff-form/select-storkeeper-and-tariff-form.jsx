import {cx} from '@emotion/css'
import {
  Box,
  Tabs,
  /* Tab, */
} from '@mui/material'
import {DataGrid} from '@mui/x-data-grid'

import React, {useState} from 'react'

import {toJS} from 'mobx'
import {observer} from 'mobx-react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {ITab} from '@components/i-tab/i-tab'
import {SearchInput} from '@components/search-input'

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
    {value === index && <Box paddingTop={3}>{children}</Box>}
  </div>
)

export const SelectStorekeeperAndTariffForm = observer(
  ({storekeepers, curStorekeeperId, curTariffId, onSubmit, inNotifications}) => {
    const {classes: classNames} = useClassNames()

    const [tabIndex, setTabIndex] = React.useState(0)

    const [nameSearchValue, setNameSearchValue] = useState('')

    const filterByNameSearch = data => {
      if (nameSearchValue) {
        return toJS(data).filter(el => el.name.toLowerCase().includes(nameSearchValue.toLowerCase()))
      } else {
        return toJS(data)
      }
    }

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
                className={cx(
                  classNames.button,
                  {
                    [classNames.selectedBoxesBtn]: curStorekeeper?._id === storekeeper._id,
                  },
                  {
                    [classNames.selectedStorekeeperBtn]: curStorekeeperId === storekeeper._id,
                  },
                )}
                variant="text"
                onClick={() => setCurStorekeeper(storekeeper)}
              >
                {storekeeper.name}
              </Button>
            ))}
        </div>

        <SearchInput
          inputClasses={classNames.searchInput}
          value={nameSearchValue}
          placeholder={t(TranslationKey.search)}
          onChange={e => setNameSearchValue(e.target.value)}
        />

        <Tabs
          variant={'fullWidth'}
          classes={{
            root: classNames.row,
            indicator: classNames.indicator,
          }}
          value={tabIndex}
          onChange={(e, index) => setTabIndex(index)}
        >
          <ITab label={t(TranslationKey['Logistics tariffs'])} />
          <ITab label={t(TranslationKey['Tariffs of warehouse services'])} />
        </Tabs>
        <TabPanel value={tabIndex} index={0}>
          <div className={classNames.tableWrapper}>
            <DataGrid
              hideFooter
              // sx={{
              //   border: 0,
              //   boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
              //   backgroundColor: theme.palette.background.main,
              // }}
              getRowClassName={getRowClassName}
              rows={
                curStorekeeper.tariffLogistics?.length
                  ? filterByNameSearch(addIdDataConverter(curStorekeeper.tariffLogistics))
                  : []
              }
              columns={logisticsTariffsColumns({onClickSelectTariff})}
              getRowHeight={() => 'auto'}
            />
          </div>
          {!inNotifications ? (
            <div className={classNames.clearBtnWrapper}>
              <Button
                disableElevation
                color="primary"
                variant={'outlined'}
                className={classNames.resetBtn}
                onClick={() => onSubmit('', '')}
              >
                {t(TranslationKey.reset)}
              </Button>
            </div>
          ) : null}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <div className={classNames.tableWrapper}>
            <DataGrid
              hideFooter
              // sx={{
              //   border: 0,
              //   boxShadow: '0px 2px 10px 2px rgba(190, 190, 190, 0.15)',
              //   backgroundColor: theme.palette.background.main,
              // }}
              rows={
                curStorekeeper.tariffWarehouses?.length
                  ? filterByNameSearch(addIdDataConverter(curStorekeeper.tariffWarehouses))
                  : []
              }
              columns={warehouseTariffsColumns()}
              rowHeight={100}
            />
          </div>
        </TabPanel>
      </div>
    )
  },
)
