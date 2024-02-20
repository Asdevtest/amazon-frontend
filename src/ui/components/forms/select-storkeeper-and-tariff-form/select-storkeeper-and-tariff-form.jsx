import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'

import Checkbox from '@mui/material/Checkbox'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { CustomDataGrid } from '@components/shared/custom-data-grid'
import { CustomSwitcher } from '@components/shared/custom-switcher'
import { SearchInput } from '@components/shared/search-input'
import { TabPanel } from '@components/shared/tab-panel'

import { t } from '@utils/translations'

import { ButtonVariant } from '@typings/types/button.type'

import { useStyles } from './select-storkeeper-and-tariff-form.style'

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
    const { classes: styles } = useStyles()

    const [tabIndex, setTabIndex] = useState(0)
    const [nameSearchValue, setNameSearchValue] = useState('')
    const [curStorekeeper, setCurStorekeeper] = useState(undefined)
    const [variationTariffId, setVariationTariffId] = useState(currentVariationTariffId)
    const [destinationId, setDestinationId] = useState(currentDestinationId)
    const [isRemovedDestinationRestriction, setIsRemovedDestinationRestriction] = useState(false)
    const [isSelectedDestinationNotValid, setIsSelectedDestinationNotValid] = useState(false)
    const [currentData, setCurrentData] = useState([])

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
      onSubmit(
        curStorekeeper._id,
        tariffId,
        variationTariffId,
        destinationId,
        isSelectedDestinationNotValid,
        Boolean(currentDestinationId),
      )

    const getRowClassName = params => curTariffId === params.row._id && styles.attentionRow

    const getCurStorekeeperData = () =>
      curStorekeeperId
        ? storekeepers.find(el => el._id === curStorekeeperId)
        : storekeepers.slice().sort((a, b) => a.name?.localeCompare(b?.name))[0]

    const getCurrentData = () => {
      if (nameSearchValue) {
        if (tabIndex === 0) {
          return curStorekeeper?.tariffLogistics.filter(
            tariff =>
              tariff?.name?.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
              tariff.destinationVariations.some(variation =>
                variation.destination.name.toLowerCase().includes(nameSearchValue.toLowerCase()),
              ),
          )
        } else {
          return curStorekeeper?.tariffWarehouses.filter(tariff =>
            tariff?.name?.toLowerCase().includes(nameSearchValue.toLowerCase()),
          )
        }
      }
    }

    const getCurrentDataForTabs = value => {
      if (value === 0) {
        return (curStorekeeper?.tariffLogistics || [])
          .filter(item => item?.tariffType === 20)
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
          })
      } else {
        return curStorekeeper?.tariffWarehouses || []
      }
    }

    useEffect(() => {
      if (curStorekeeper) {
        setCurrentData(getCurrentDataForTabs(tabIndex))
      }
    }, [curStorekeeper])

    useEffect(() => {
      setCurStorekeeper(getCurStorekeeperData())
    }, [curStorekeeperId])

    useEffect(() => {
      if (nameSearchValue) {
        setCurrentData(getCurrentData())
      } else {
        setCurrentData(getCurrentDataForTabs(tabIndex))
      }
    }, [nameSearchValue])

    return (
      <div className={styles.root}>
        <CustomSwitcher
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

        <div className={styles.searchWrapper}>
          <SearchInput
            inputClasses={styles.searchInput}
            value={nameSearchValue}
            placeholder={t(TranslationKey.search)}
            onChange={e => setNameSearchValue(e.target.value)}
          />

          {RemoveDestinationRestriction && (
            <div className={styles.checkboxWrapper}>
              <Checkbox
                checked={isRemovedDestinationRestriction}
                onChange={() => setIsRemovedDestinationRestriction(!isRemovedDestinationRestriction)}
              />
              <span className={styles.resetBtn}>{t(TranslationKey['Remove destination restriction'])}</span>
            </div>
          )}
        </div>

        <CustomSwitcher
          fullWidth
          switchMode={'medium'}
          condition={tabIndex}
          switcherSettings={tariffTypesLabels.map((label, index) => ({
            label: () => t(label),
            value: index,
          }))}
          changeConditionHandler={value => {
            setCurrentData(getCurrentDataForTabs(value))
            setTabIndex(value)
          }}
        />

        <TabPanel value={tabIndex} index={0} className={styles.tabPanel}>
          <div className={styles.tableWrapper}>
            <CustomDataGrid
              getRowClassName={getRowClassName}
              rows={currentData || []}
              sortingMode="client"
              paginationMode="client"
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
              getRowId={row => row?._id}
              getRowHeight={() => 'auto'}
            />
          </div>
          {!inNotifications && (
            <div className={styles.clearBtnWrapper}>
              <Button
                variant={ButtonVariant.OUTLINED}
                className={styles.resetBtn}
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
        <TabPanel value={tabIndex} index={1} className={styles.tabPanel}>
          <div className={styles.tableWrapper}>
            <CustomDataGrid
              rows={currentData || []}
              getRowId={row => row?._id}
              sortingMode="client"
              paginationMode="client"
              columns={warehouseTariffsColumns()}
              rowHeight={100}
            />
          </div>
        </TabPanel>
      </div>
    )
  },
)
