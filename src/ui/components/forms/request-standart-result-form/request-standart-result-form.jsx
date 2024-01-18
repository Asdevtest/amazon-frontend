import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { PhotoAndFilesSlider } from '@components/shared/photo-and-files-slider'

import { t } from '@utils/translations'

import { useStyles } from './request-standart-result-form.style'

export const RequestStandartResultForm = ({ /* request, */ setOpenModal, proposal }) => {
  const { classes: styles, cx } = useStyles()

  return (
    <div className={styles.root}>
      <p className={styles.headerText}>{t(TranslationKey.Result)}</p>

      <p className={styles.resultText}>{proposal?.details?.result}</p>

      <div className={styles.resultWrapper}>
        <PhotoAndFilesSlider
          smallSlider
          files={proposal?.proposal?.media?.map(el => ('fileLink' in el ? el?.fileLink : el))}
        />

        {/* <div className={styles.resultRightSide}>
          <div className={styles.timeToCheckBlockWrapper}>
            <Typography className={styles.timeToCheckBlockLabelText}>
              {t(TranslationKey['Time to check'])}
            </Typography>
            <div className={styles.timeToCheckBlockValueWrapper}>
              <Typography className={styles.timeToCheckBlockValueText}>{`24 ${t(TranslationKey.hour)} 00 ${t(
                TranslationKey.minute,
              )}`}</Typography>
            </div>
          </div>
        </div> */}
      </div>
      <div className={styles.btnsWrapper}>
        <Button variant="text" className={cx(styles.button, styles.cancelButton)} onClick={setOpenModal}>
          {t(TranslationKey.Cancel)}
        </Button>
      </div>
      {/* <div className={styles.footerWrapper}>
        {chatRequestAndRequestProposal &&
        (chatRequestAndRequestProposal.requestProposal?.proposal?.status ===
          RequestProposalStatus.OFFER_CONDITIONS_ACCEPTED ||
          chatRequestAndRequestProposal.requestProposal?.proposal?.status === RequestProposalStatus.READY_TO_VERIFY) &&
        curUserId &&
        message.data.needApproveBy?.includes(curUserId) ? (
          <div className={styles.btnsWrapper}>
            {chatRequestAndRequestProposal.requestProposal?.proposal?.status !== RequestProposalStatus.TO_CORRECT && (
              <Button
                variant="contained"
                color="primary"
                btnWrapperStyle={styles.actionBtnWrapperStyle}
                className={cx(styles.actionButton, styles.editButton)}
                onClick={() => handlers.onClickProposalResultToCorrect(proposal._id)}
              >
                {t(TranslationKey['Send in for rework'])}
              </Button>
            )}
            <Button
              variant="contained"
              color="primary"
              btnWrapperStyle={cx(styles.actionBtnWrapperStyle, styles.actionBtnWrapperStyleNotFirst)}
              className={cx(styles.actionButton, styles.successBtn)}
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
