import { toJS } from 'mobx'
import { observer } from 'mobx-react'
import { useState } from 'react'

import Checkbox from '@mui/material/Checkbox'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'
import { TabPanel } from '@components/shared/tab-panel'

import { addIdDataConverter } from '@utils/data-grid-data-converters'
import { t } from '@utils/translations'

import { useClassNames } from './select-storkeeper-and-tariff-form.style'

import { warehouseTariffsColumns } from './select-storkeeper-and-tariff-form-columns'
import { TotalStorkeeperAndWeightBasedTariffFormColumns } from './total-storkeeper-and-weight-based-tariff-form-columns'
import { WeightBasedTariffFormColumns } from './weight-based-tariff-form-columns'

const tariffTypesLabels = ['Weight-based logistics tariffs', 'Tariffs of warehouse services']

export const SelectStorekeeperAndTariffForm = observer(
  ({
    showCheckbox,
    storekeepers,
    curStorekeeperId,
    curTariffId,
    onSubmit,
    inNotifications,
    total,
    currentVariationTariffId,
    currentDestinationId,
    RemoveDestinationRestriction,
  }) => {
    const { classes: classNames } = useClassNames()

    const [tabIndex, setTabIndex] = useState(0)
    const [nameSearchValue, setNameSearchValue] = useState('')
    const [curStorekeeper, setCurStorekeeper] = useState(
      curStorekeeperId
        ? storekeepers.find(el => el._id === curStorekeeperId)
        : storekeepers.slice().sort((a, b) => a.name?.localeCompare(b?.name))[0],
    )
    const [variationTariffId, setVariationTariffId] = useState(currentVariationTariffId)
    const [destinationId, setDestinationId] = useState(currentDestinationId)
    const [isRemovedDestinationRestriction, setIsRemovedDestinationRestriction] = useState(false)
    const [isSelectedDestinationNotValid, setIsSelectedDestinationNotValid] = useState(false)

    const filterByNameSearch = data => {
      if (nameSearchValue) {
        return toJS(data).filter(el => el.name.toLowerCase().includes(nameSearchValue.toLowerCase()))
      } else {
        return toJS(data)
      }
    }

    const setVariationTariff = (variationId, destinationId, isNotValidDestination) => {
      if (variationTariffId === variationId) {
        setVariationTariffId(null)
        setDestinationId(null)
        setIsSelectedDestinationNotValid(null)
      } else {
        setVariationTariffId(variationId)
        setDestinationId(destinationId)
        setIsSelectedDestinationNotValid(isNotValidDestination)
      }
    }

    const onClickSelectTariff = tariffId =>
      onSubmit(curStorekeeper._id, tariffId, variationTariffId, destinationId, isSelectedDestinationNotValid)

    const getRowClassName = params => curTariffId === params.row._id && classNames.attentionRow

    return (
      <div className={classNames.root}>
        <div className={classNames.boxesFiltersWrapper}>
          <CustomSwitcher
            switchMode={'small'}
            condition={curStorekeeper}
            switcherSettings={storekeepers
              .slice()
              .sort((a, b) => a.name?.localeCompare(b?.name))
              .map(value => ({
                label: () => value?.name,
                value: value?._id,
              }))}
            customCondition={value => value === curStorekeeper?._id}
            changeConditionHandler={value => setCurStorekeeper(storekeepers.find(el => el._id === value))}
          />
        </div>

        <div className={classNames.searchWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey.search)}
            onChange={e => setNameSearchValue(e.target.value)}
          />

          {RemoveDestinationRestriction && (
            <div className={classNames.checkboxWrapper}>
              <Checkbox
                checked={isRemovedDestinationRestriction}
                onChange={() => setIsRemovedDestinationRestriction(!isRemovedDestinationRestriction)}
              />
              <span className={classNames.resetBtn}>{t(TranslationKey['Remove destination restriction'])}</span>
            </div>
          )}
        </div>

        <div className={classNames.tabsWrapper}>
          <CustomSwitcher
            switchMode={'medium'}
            condition={tabIndex}
            switcherSettings={tariffTypesLabels.map((label, index) => ({
              label: () => t(label),
              value: index,
            }))}
            changeConditionHandler={setTabIndex}
          />
        </div>

        <TabPanel value={tabIndex} index={0}>
          <div className={classNames.tableWrapper}>
            <CustomDataGrid
              getRowClassName={getRowClassName}
              rows={
                curStorekeeper?.tariffLogistics?.length
                  ? filterByNameSearch(
                      addIdDataConverter(curStorekeeper.tariffLogistics)
                        .filter(item => item.tariffType === 20)
                        .sort((a, b) => {
                          const aHasMatch = a?.destinationVariations?.some(obj => obj?._id === currentVariationTariffId)
                          const bHasMatch = b?.destinationVariations?.some(obj => obj?._id === currentVariationTariffId)

                          if (aHasMatch && !bHasMatch) {
                            return -1
                          } else if (!aHasMatch && bHasMatch) {
                            return 1
                          } else {
                            return 0
                          }
                        }),
                    )
                  : []
              }
              columns={
                total
                  ? TotalStorkeeperAndWeightBasedTariffFormColumns()
                  : WeightBasedTariffFormColumns(
                      showCheckbox,
                      variationTariffId,
                      currentDestinationId,
                      onClickSelectTariff,
                      setVariationTariff,
                      isRemovedDestinationRestriction,
                    )
              }
              getRowHeight={() => 'auto'}
            />
          </div>
          {!inNotifications && (
            <div className={classNames.clearBtnWrapper}>
              <Button
                disableElevation
                color="primary"
                variant={'outlined'}
                className={classNames.resetBtn}
                onClick={() => {
                  setVariationTariffId(null)
                  onSubmit(null, null, null, null, null, true)
                }}
              >
                {t(TranslationKey.reset)}
              </Button>
            </div>
          )}
        </TabPanel>
        <TabPanel value={tabIndex} index={1}>
          <div className={classNames.tableWrapper}>
            <CustomDataGrid
              rows={
                curStorekeeper?.tariffWarehouses?.length
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
