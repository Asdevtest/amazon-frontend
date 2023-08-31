/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable no-unused-vars */
import React, { FC, useEffect, useState } from 'react'

import { Box, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { MasterUserItem } from '@components/shared/master-user-item'
import { SearchInput } from '@components/shared/search-input'
import { WithSearchSelect } from '@components/shared/selects/with-search-select'

import { t } from '@utils/translations'

import { IService, ShortUserType } from '@typings/master-user'

import { useClassNames } from './choice-of-performer-modal.style'

import { AnnouncementCard } from './announcement-card'

export interface ChoiceOfPerformerModalProps {
  announcements: Array<IService>
  masterUsersData: Array<ShortUserType>
  chosenExecutor: ShortUserType
  chosenAnnouncement: IService
  onClickThumbnail: () => void
  onClickSelectButton: (selectedService?: IService, chosenExecutor?: ShortUserType) => void
  onClickResetPerformerBtn: () => void
  onClickCloseBtn: () => void
}

export const ChoiceOfPerformerModal: FC<ChoiceOfPerformerModalProps> = props => {
  const {
    announcements,
    masterUsersData,
    chosenExecutor,
    chosenAnnouncement,
    onClickThumbnail,
    onClickSelectButton,
    onClickResetPerformerBtn,
    onClickCloseBtn,
  } = props
  const { classes: classNames } = useClassNames()

  const [dataToRender, setDataToRender] = useState(announcements)
  const [nameSearchValue, setNameSearchValue] = useState('')
  const [selectedExecutor, setSelectedExecutor] = useState<ShortUserType | undefined>(chosenExecutor)
  const [selectedService, setSelectedService] = useState<IService | undefined>(chosenAnnouncement)

  const selectCardHandler = (value: IService) => {
    setSelectedService(prev => (prev?._id === value?._id ? undefined : value))
  }

  useEffect(() => {
    if (selectedExecutor) {
      setDataToRender(announcements.filter(announcement => announcement.createdBy._id === selectedExecutor?._id))
    } else {
      setDataToRender(announcements)
    }
  }, [announcements, selectedExecutor])

  useEffect(() => {
    if (nameSearchValue) {
      setDataToRender(
        announcements.filter(
          performer =>
            performer.title.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
            performer.description.toLowerCase().includes(nameSearchValue.toLowerCase()) ||
            performer.createdBy.name.toLowerCase().includes(nameSearchValue.toLowerCase()),
        ),
      )
    } else {
      setDataToRender(announcements)
    }
  }, [nameSearchValue])

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.upWrapper}>
        <Typography variant="h5" className={classNames.title}>
          {t(TranslationKey['Choice of Performer'])}
        </Typography>

        <Field
          label={t(TranslationKey.Performer)}
          labelClasses={classNames.label}
          containerClasses={classNames.executorContainer}
          inputComponent={
            // @ts-ignore
            <WithSearchSelect
              darkIcon
              grayBorder
              masterUserSelect
              blackSelectedItem
              chosenItemNoHover
              width={372}
              data={masterUsersData}
              searchOnlyFields={['name']}
              customSubMainWrapper={classNames.customSubMainWrapper}
              customSearchInput={classNames.customSearchInput}
              selectedItemName={
                selectedExecutor ? (
                  <MasterUserItem
                    id={selectedExecutor?._id}
                    name={selectedExecutor?.name}
                    rating={selectedExecutor?.rating}
                  />
                ) : (
                  t(TranslationKey['Choose an executor'])
                )
              }
              onClickSelect={(el: ShortUserType) => {
                setSelectedExecutor(el)
                setSelectedService(undefined)
              }}
              onClickNotChosen={() => {
                setSelectedExecutor(undefined)
                setSelectedService(undefined)
              }}
            />
          }
        />

        <SearchInput
          inputClasses={classNames.searchInput}
          placeholder={t(TranslationKey['Search by Performer, Title, Description'])}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNameSearchValue(e.target.value)}
        />

        <Button
          danger
          onClick={() => {
            onClickResetPerformerBtn()
            onClickCloseBtn()
          }}
        >
          {t(TranslationKey['Reset performer'])}
        </Button>
      </div>
      <div className={classNames.cardsWrapper}>
        <Box
          component="div"
          className={classNames.dashboardCardWrapper}
          display="grid"
          gridTemplateColumns={'repeat(auto-fill, minmax(calc(100% / 4), 1fr))'}
        >
          {dataToRender.map((service, serviceKey) => (
            <AnnouncementCard
              key={serviceKey}
              announcementData={service}
              selectedCard={selectedService}
              onClickThumbnail={onClickThumbnail}
              onClickSelectCard={selectCardHandler}
            />
          ))}
        </Box>
      </div>

      <div className={classNames.footerWrapper}>
        <Button
          success
          disabled={!selectedService && !selectedExecutor}
          onClick={() => onClickSelectButton(selectedService, selectedExecutor)}
        >
          {t(TranslationKey.Select)}
        </Button>
        <Button variant="text" className={classNames.cancelButton} onClick={onClickCloseBtn}>
          {t(TranslationKey.Close)}
        </Button>
      </div>
    </div>
  )
}
