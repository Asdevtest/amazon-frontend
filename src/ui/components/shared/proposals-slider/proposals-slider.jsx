import { useEffect, useState } from 'react'

import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'

import {
  RequestProposalStatusColor,
  RequestProposalStatusTranslate,
  disabledCancelBtnStatuses,
  noDisabledEditBtnStatuses,
} from '@constants/requests/request-proposal-status'
import { showResultStatuses } from '@constants/requests/request-status'
import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { UserLink } from '@components/user/user-link'

import { t } from '@utils/translations'

import { ButtonType } from '@typings/types/button.type'

import { useStyles } from './proposals-slider.style'

export const ProposalsSlider = ({
  item,
  proposals,
  title,
  isFirst,
  isComment = false,
  onClickEditBtn,
  onClickDeleteBtn,
  onClickOpenBtn,
  onClickResultBtn,
  stylesWrapper,
}) => {
  const { classes: styles, cx } = useStyles()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProposals, setSelectedProposals] = useState([])
  const [currentProposal, setCurrentProposal] = useState(selectedProposals?.[0])
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [currentTitle, setCurrentTitle] = useState(`${currentIndex + 1} / ${proposals.length}`)

  useEffect(() => {
    if (proposals) {
      setSelectedProposals(proposals.map(proposal => proposal.proposal))
    } else {
      setSelectedProposals(item.proposals)
    }
  }, [item, proposals])

  useEffect(() => {
    if (selectedProposals?.length > 0) {
      setCurrentProposal(selectedProposals?.[currentIndex])
    }
  }, [selectedProposals])

  const handlePrev = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex(prevIndex => (prevIndex === 0 ? selectedProposals?.length - 1 : prevIndex - 1))
    }
  }

  const handleNext = () => {
    if (!isTransitioning) {
      setIsTransitioning(true)
      setCurrentIndex(prevIndex => (prevIndex === selectedProposals?.length - 1 ? 0 : prevIndex + 1))
    }
  }

  useEffect(() => {
    const transitionDuration = 300

    if (isTransitioning) {
      setTimeout(() => {
        setIsTransitioning(false)
        setCurrentProposal(selectedProposals?.[currentIndex])
        setCurrentTitle(`${currentIndex + 1} / ${proposals.length}`)
      }, transitionDuration)
    }
  }, [isTransitioning])

  const isDisableArrow = selectedProposals?.length <= 1
  const isDisableArrowLeft = currentIndex === 0
  const isDisableArrowRight = currentIndex === proposals.length - 1

  return (
    <div className={cx(styles.wrapper, stylesWrapper)}>
      <div className={cx(styles.mainWrapper, isTransitioning ? styles.transitioning : styles.active)}>
        <div className={styles.header}>
          <div className={styles.arrowsWrapper}>
            <button disabled={isDisableArrow || isDisableArrowLeft} onClick={handlePrev}>
              <ArrowLeftIcon
                className={cx(styles.arrowIcon, {
                  [styles.arrowIconDisable]: isDisableArrow || isDisableArrowLeft,
                })}
              />
            </button>

            <p className={styles.proposalTitle}>{`${title} ${currentIndex + 1}`}</p>

            <button disabled={isDisableArrow || isDisableArrowRight} onClick={handleNext}>
              <ArrowRightIcon
                className={cx(styles.arrowIcon, {
                  [styles.arrowIconDisable]: isDisableArrow || isDisableArrowRight,
                })}
              />
            </button>
          </div>
          <p className={cx(styles.title, styles.blueTitle)}>{currentTitle}</p>
        </div>

        <div className={styles.performerWrapper}>
          <p className={styles.title}>{t(TranslationKey.Performer)}</p>
          <UserLink
            name={currentProposal?.sub?.name || currentProposal?.createdBy?.name}
            userId={currentProposal?.sub?._id || currentProposal?.createdBy?._id}
            customstyles={styles.customPerformerLink}
          />
        </div>

        {currentProposal?.comment && isComment ? <p className={styles.comment}>{currentProposal?.comment}</p> : null}

        <div className={styles.actionsWrapper}>
          <div className={styles.statusWrapper}>
            <div
              className={styles.circle}
              style={{ background: RequestProposalStatusColor(currentProposal?.status) }}
            />
            <p className={styles.title}>{RequestProposalStatusTranslate(currentProposal?.status)}</p>
          </div>

          <div className={styles.buttons}>
            {onClickDeleteBtn ? (
              <Button
                styleType={ButtonType.DANGER}
                tooltipInfoContent={isFirst && t(TranslationKey['Cancel current proposal'])}
                disabled={disabledCancelBtnStatuses.includes(currentProposal?.status)}
                className={styles.button}
                onClick={() => onClickDeleteBtn(currentProposal)}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            ) : null}

            {onClickResultBtn ? (
              <Button
                disabled={!showResultStatuses.includes(currentProposal?.status)}
                className={styles.button}
                onClick={() => onClickResultBtn(item, currentProposal?._id)}
              >
                {t(TranslationKey.Result)}
              </Button>
            ) : null}

            {onClickEditBtn ? (
              <Button
                tooltipInfoContent={isFirst && t(TranslationKey['Change the current proposal'])}
                disabled={!noDisabledEditBtnStatuses.includes(currentProposal?.status)}
                className={styles.button}
                onClick={() => onClickEditBtn(item, currentProposal)}
              >
                {t(TranslationKey.Edit)}
              </Button>
            ) : null}

            {onClickOpenBtn ? (
              <Button
                tooltipInfoContent={isFirst && t(TranslationKey['Open an request for the selected proposal'])}
                className={styles.button}
                onClick={() => onClickOpenBtn(item)}
              >
                {t(TranslationKey['Open a request'])}
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
