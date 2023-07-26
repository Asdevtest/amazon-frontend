/* eslint-disable react/jsx-indent */
import { cx } from '@emotion/css'
import React from 'react'
import Linkify from 'react-linkify-always-blank'

import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesCarousel } from '@components/shared/photo-and-files-carousel'

import { t } from '@utils/translations'

import { useClassNames } from './request-standart-result-form.style'

export const RequestStandartResultForm = ({ /* request, */ setOpenModal, proposal }) => {
  const { classes: classNames } = useClassNames()

  return (
    <div className={classNames.root}>
      <div className={classNames.headerAndTimeWrapper}>
        <div className={classNames.headerWrapper}>
          <Typography className={classNames.headerText}>{t(TranslationKey.Result)}</Typography>
        </div>
      </div>
      <div className={classNames.mainInfoWrapper}>
        {/* <div className={classNames.titleWrapper}>
        <p className={classNames.titleText}>{message.data.request.title}</p>
      </div> */}
        <div className={classNames.descriptionWrapper}>
          <Linkify>
            <Typography className={classNames.descriptionText}>{}</Typography>
          </Linkify>
        </div>
      </div>
      <div className={classNames.resultTextWrapper}>
        <Linkify>
          <Typography className={classNames.resultText}>{proposal?.details?.result}</Typography>
        </Linkify>
      </div>
      <div className={classNames.resultWrapper}>
        <PhotoAndFilesCarousel
          notToShowEmpty
          small
          files={proposal?.proposal?.media?.map(el => (typeof el === 'object' ? el?.fileLink : el))}
          width="100%"
          withoutPhotos={undefined}
          whithoutFiles={undefined}
          imagesForLoad={undefined}
          isEditable={undefined}
          withoutMakeMainImage={undefined}
          onChangeImagesForLoad={undefined}
        />

        {/* <div className={classNames.resultRightSide}>
          <div className={classNames.timeToCheckBlockWrapper}>
            <Typography className={classNames.timeToCheckBlockLabelText}>
              {t(TranslationKey['Time to check'])}
            </Typography>
            <div className={classNames.timeToCheckBlockValueWrapper}>
              <Typography className={classNames.timeToCheckBlockValueText}>{`24 ${t(TranslationKey.hour)} 00 ${t(
                TranslationKey.minute,
              )}`}</Typography>
            </div>
          </div>
        </div> */}
      </div>
      <div className={classNames.btnsWrapper}>
        <Button variant="text" className={cx(classNames.button, classNames.cancelButton)} onClick={setOpenModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
      {/* <div className={classNames.footerWrapper}>
        {chatRequestAndRequestProposal &&
        (chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
          RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.READY_TO_VERIFY) &&
        curUserId &&
        message.data.needApproveBy?.includes(curUserId) ? (
          <div className={classNames.btnsWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT && (
              <Button
                variant="contained"
                color="primary"
                btnWrapperStyle={classNames.actionBtnWrapperStyle}
                className={cx(classNames.actionButton, classNames.editButton)}
                onClick={() => handlers.onClickProposalResultToCorrect(proposal._id)}
              >
                {t(TranslationKey['Send in for rework'])}
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              btnWrapperStyle={cx(classNames.actionBtnWrapperStyle, classNames.actionBtnWrapperStyleNotFirst)}
              className={cx(classNames.actionButton, classNames.successBtn)}
              onClick={() => handlers.onClickProposalResultAccept(proposal._id)}
            >
              {t(TranslationKey.Receive)}
            </Button>
          </div>
        ) : undefined}
      </div> */}
    </div>
  )
}
