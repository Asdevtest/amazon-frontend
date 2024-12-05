import { Spin } from 'antd'
import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { tableViewMode } from '@constants/table/table-view-modes'
import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInputSearch } from '@components/shared/custom-input-search'
import { DynamicVirtualList } from '@components/shared/dynamic-virtual-list'
import { FreelanceTypeTaskSelect } from '@components/shared/selects/freelance-type-task-select'
import { ViewCardsSelect } from '@components/shared/selects/view-cards-select'

import { t } from '@utils/translations'

import { IAnnoucement } from '@typings/models/announcements/annoucement'
import { HistoryType } from '@typings/types/history'

import { useStyles } from './services-view.style'

import { ServiceCard } from './service-card'
import { ServicesViewModel } from './services-view.model'

interface ServicesViewProps {
  history: HistoryType
  isClient: boolean
}

export const ServicesView: FC<ServicesViewProps> = observer(({ history, isClient }) => {
  const { classes: styles } = useStyles()
  const viewModel = useMemo(() => new ServicesViewModel(history, isClient), [])

  const listMode = viewModel.viewMode === tableViewMode.LIST
  const listClassName = listMode ? styles.announcementLists : styles.announcementCards

  return (
    <div className="viewWrapper">
      <div className={styles.flexRow}>
        <div className={styles.flexRow}>
          <ViewCardsSelect viewMode={viewModel.viewMode} onChangeViewMode={viewModel.onChangeViewMode} />

          <FreelanceTypeTaskSelect
            specs={viewModel.specs}
            selectedSpec={viewModel.specOption}
            onChangeSpec={viewModel.onChangeSpec}
          />
        </div>

        <CustomInputSearch
          enterButton
          allowClear
          size="large"
          placeholder="Search by Title, Description"
          onSearch={viewModel.onSearchSubmit}
        />

        {!isClient ? (
          <div className={styles.flexRow}>
            <CustomButton size="large" onClick={viewModel.onToggleArchive}>
              {t(TranslationKey[viewModel.archive ? 'To the actual' : 'Open archive'])}
            </CustomButton>

            <CustomButton size="large" type="primary" onClick={viewModel.onClickCreateService}>
              {t(TranslationKey['Create a service'])}
            </CustomButton>
          </div>
        ) : null}
      </div>

      <DynamicVirtualList<IAnnoucement>
        listClassName={listClassName}
        data={viewModel.announcements}
        itemContent={({ item }) => (
          <ServiceCard isClient={isClient} service={item} listMode={listMode} onClickButton={viewModel.onClickCard} />
        )}
        onScrollEnd={viewModel.loadMoreData}
      />

      <Spin spinning={viewModel.loading} size="large" className={styles.loading} />
    </div>
  )
})
