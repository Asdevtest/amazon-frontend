/* eslint-disable no-unused-vars */
import {cx} from '@emotion/css'
import {Container, Link, Typography, Box, Alert} from '@mui/material'

import React, {useState} from 'react'

import {TranslationKey} from '@constants/translations/translation-key'

import {Button} from '@components/buttons/button'
import {ServiceExchangeCard} from '@components/cards/service-exchange-card'
import {CircularProgressWithLabel} from '@components/circular-progress-with-label'
import {CopyValue} from '@components/copy-value/copy-value'
import {SearchInput} from '@components/search-input'
import {UploadFilesInput} from '@components/upload-files-input'

import {t} from '@utils/translations'

import {useClassNames} from './choice-of-performer-modal.style'

export const ChoiceOfPerformerModal = ({announcements, onClickThumbnail}) => {
  const {classes: classNames} = useClassNames()

  const [nameSearchValue, setNameSearchValue] = useState('')

  return (
    <div className={classNames.mainWrapper}>
      <div className={classNames.upWrapper}>
        <Typography variant="h5" className={classNames.title}>
          {t(TranslationKey['Choice of Performer'])}
        </Typography>

        <div className={classNames.searchInputWrapper}>
          <SearchInput
            inputClasses={classNames.searchInput}
            placeholder={t(TranslationKey.Search)}
            onChange={setNameSearchValue}
          />
        </div>
      </div>
      <div className={classNames.cardsWrapper}>
        <Box
          container
          classes={{root: classNames.dashboardCardWrapper}}
          display="grid"
          gridTemplateColumns={'repeat(auto-fill, minmax(calc(100% / 4), 1fr))'}
          gridGap="20px"
        >
          {announcements.map((service, serviceKey) => (
            <ServiceExchangeCard key={serviceKey} choose service={service} onClickThumbnail={onClickThumbnail} />
          ))}
        </Box>
      </div>
    </div>
  )
}
