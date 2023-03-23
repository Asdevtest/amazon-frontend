/* eslint-disable no-unused-vars */
import {Typography, Box} from '@mui/material'

import React, {useEffect, useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {ServiceExchangeCard} from '@components/cards/service-exchange-card'
import {SearchInput} from '@components/search-input'

import {t} from '@utils/translations'

import {useClassNames} from './choice-of-performer-modal.style'

export const ChoiceOfPerformerModal = ({
  announcements,
  onClickThumbnail,
  onClickChooseBtn,
  onClickResetPerformerBtn,
}) => {
  const {classes: classNames} = useClassNames()

  const [dataToRender, setDataToRender] = useState(announcements)

  const [nameSearchValue, setNameSearchValue] = useState('')

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

        <div className={classNames.searchInputWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey['Search by Performer, Title, Description'])}
            onChange={e => setNameSearchValue(e.target.value)}
          />
        </div>

        <Button danger className={classNames.backBtn} onClick={() => onClickResetPerformerBtn('')}>
          {t(TranslationKey['Reset performer'])}
        </Button>
      </div>
      <div className={classNames.cardsWrapper}>
        <Box
          container
          classes={{root: classNames.dashboardCardWrapper}}
          display="grid"
          gridTemplateColumns={'repeat(auto-fill, minmax(calc(100% / 4), 1fr))'}
          gridGap="10px"
        >
          {dataToRender.map((service, serviceKey) => (
            <ServiceExchangeCard
              key={serviceKey}
              choose
              service={service}
              onClickThumbnail={onClickThumbnail}
              onClickButton={onClickChooseBtn}
            />
          ))}
        </Box>
      </div>
    </div>
  )
}
