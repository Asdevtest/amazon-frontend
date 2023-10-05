import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { t } from '@utils/translations'

import { useClassNames } from './request-standart-result-form.style'

export const RequestStandartResultForm = ({ /* request, */ setOpenModal, proposal }) => {
  const { classes: classNames, cx } = useClassNames()

  return (
    <div className={classNames.root}>
      <p className={classNames.headerText}>{t(TranslationKey.Result)}</p>

      <p className={classNames.resultText}>{proposal?.details?.result}</p>

      <div className={classNames.resultWrapper}>
        <PhotoAndFilesSlider
          smallSlider
          files={proposal?.proposal?.media?.map(el => ('fileLink' in el ? el?.fileLink : el))}
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
