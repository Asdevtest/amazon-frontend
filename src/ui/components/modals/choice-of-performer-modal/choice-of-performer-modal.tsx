/* eslint-disable @typescript-eslint/ban-ts-comment */

/* eslint-disable no-unused-vars */
import {Typography, Box} from '@mui/material'

import React, {FC, useEffect, useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {ServiceExchangeCard} from '@components/cards/service-exchange-card'
import {SearchInput} from '@components/search-input'

import {t} from '@utils/translations'

import {useClassNames} from './choice-of-performer-modal.style'

interface AnnouncementsProps {
  createdAt: string
  createdBy: {
    name: string
    _id: string
  }
  description: string
  linksToMediaFiles: Array<string>
  requests: {
    createdBy: {
      name: string
      _id: string
    }
    humanFriendlyId: number
    price: number
    status: string
    timeoutAt: string
    title: string
    updatedAt: string
    _id: string
  }
  title: string
  type: string
  updatedAt: string
  _id: string
}

export interface ChoiceOfPerformerModalProps {
  announcements: Array<AnnouncementsProps>
  onClickThumbnail: () => void
  onClickChooseBtn: (announcement: AnnouncementsProps) => void
  onClickResetPerformerBtn: () => void
  onClickCloseBtn: () => void
}

export const ChoiceOfPerformerModal: FC<ChoiceOfPerformerModalProps> = props => {
  const {announcements, onClickThumbnail, onClickChooseBtn, onClickResetPerformerBtn, onClickCloseBtn} = props
  const {classes: classNames} = useClassNames()

  const [dataToRender, setDataToRender] = useState(announcements)

  const [nameSearchValue, setNameSearchValue] = useState('')

  const chooseAndClose = (announcement: AnnouncementsProps) => {
    onClickChooseBtn(announcement)
    onClickCloseBtn()
  }
  useEffect(() => {
    setDataToRender(announcements)
  }, [announcements])

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

        {/* @ts-ignore */}
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
            // @ts-ignore
            <ServiceExchangeCard
              key={serviceKey}
              choose
              service={service}
              onClickThumbnail={onClickThumbnail}
              onClickButton={chooseAndClose}
            />
          ))}
        </Box>
      </div>
    </div>
  )
}
