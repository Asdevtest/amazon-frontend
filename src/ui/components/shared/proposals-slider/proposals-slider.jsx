import { cx } from '@emotion/css'
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

import { useClassNames } from './proposals-slider.style'

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
  classNamesWrapper,
}) => {
  const { classes: classNames } = useClassNames()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedProposals, setSelectedProposals] = useState([])
  const [currentProposal, setCurrentProposal] = useState(selectedProposals?.[0])
  const [isTransitioning, setIsTransitioning] = useState(false)

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
    let transitionTimeout

    if (isTransitioning) {
      transitionTimeout = setTimeout(() => {
        setIsTransitioning(false)
        setCurrentProposal(selectedProposals?.[currentIndex])
      }, transitionDuration)
    }

    return () => {
      clearTimeout(transitionTimeout)
    }
  }, [isTransitioning])

  const isDisableArrow = selectedProposals?.length <= 1

  return (
    <div className={cx(classNames.wrapper, classNamesWrapper)}>
      <div className={cx(classNames.mainWrapper, isTransitioning ? classNames.transitioning : classNames.active)}>
        <div className={classNames.header}>
          <div className={classNames.arrowsWrapper}>
            <button disabled={isDisableArrow}>
              <ArrowLeftIcon
                className={cx(classNames.arrowIcon, { [classNames.arrowIconDisable]: isDisableArrow })}
                onClick={handlePrev}
              />
            </button>

            <p className={classNames.proposalTitle}>{`${title} ${currentIndex + 1}`}</p>

            <button disabled={isDisableArrow}>
              <ArrowRightIcon
                className={cx(classNames.arrowIcon, { [classNames.arrowIconDisable]: isDisableArrow })}
                onClick={handleNext}
              />
            </button>
          </div>
        </div>

        <div className={classNames.performerWrapper}>
          <p className={classNames.title}>{t(TranslationKey.Performer)}</p>
          <UserLink
            name={currentProposal?.sub?.name || currentProposal?.createdBy?.name}
            userId={currentProposal?.sub?._id || currentProposal?.createdBy?._id}
            customClassNames={classNames.customPerformerLink}
          />
        </div>

        {currentProposal?.comment && isComment ? (
          <p className={classNames.comment}>{currentProposal?.comment}</p>
        ) : null}

        <div className={classNames.actionsWrapper}>
          <div className={classNames.statusWrapper}>
            <div
              className={classNames.circle}
              style={{ background: RequestProposalStatusColor(currentProposal?.status) }}
            />
            <p className={classNames.title}>{RequestProposalStatusTranslate(currentProposal?.status)}</p>
          </div>

          <div className={classNames.buttons}>
            {onClickDeleteBtn ? (
              <Button
                danger
                tooltipInfoContent={isFirst && t(TranslationKey['Cancel current proposal'])}
                disabled={disabledCancelBtnStatuses.includes(currentProposal?.status)}
                className={classNames.button}
                onClick={() => onClickDeleteBtn(currentProposal)}
              >
                {t(TranslationKey.Cancel)}
              </Button>
            ) : null}

            {onClickResultBtn ? (
              <Button
                disabled={!showResultStatuses.includes(currentProposal?.status)}
                className={classNames.button}
                onClick={() => onClickResultBtn(item, currentProposal?._id)}
              >
                {t(TranslationKey.Result)}
              </Button>
            ) : null}

            {onClickEditBtn ? (
              <Button
                tooltipInfoContent={isFirst && t(TranslationKey['Change the current proposal'])}
                disabled={!noDisabledEditBtnStatuses.includes(currentProposal?.status)}
                className={classNames.button}
                onClick={() => onClickEditBtn(item, currentProposal)}
              >
                {t(TranslationKey.Edit)}
              </Button>
            ) : null}

            {onClickOpenBtn ? (
              <Button
                tooltipInfoContent={isFirst && t(TranslationKey['Open an request for the selected proposal'])}
                className={classNames.button}
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
