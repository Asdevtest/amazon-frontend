import { FC, memo } from 'react'
import { CiCircleCheck } from 'react-icons/ci'

import { TranslationKey } from '@constants/translations/translation-key'

import { ActionButtonsCell } from '@components/data-grid/data-grid-cells'

import { t } from '@utils/translations'

import { ButtonStyle } from '@typings/enums/button-style'

interface ParsingAccessCellProps {
  isActive: boolean
  onAccess: () => void
}

export const ParsingAccessCell: FC<ParsingAccessCellProps> = memo(props => {
  const { isActive, onAccess } = props

  const style = {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    background: '#B3E7C7',
    color: '#0B903E',
    border: '1px solid #0B903E',
    borderRadius: '20px',
    fontSize: '14px',
    lineHeight: '19px',
    padding: '5px 10px',
  }

  if (isActive) {
    return (
      <p style={style}>
        <CiCircleCheck />
        {t(TranslationKey.issued)}
      </p>
    )
  }

  return (
    <ActionButtonsCell
      isFirstButton
      firstButtonElement={t(TranslationKey.Access)}
      firstButtonStyle={ButtonStyle.PRIMARY}
      onClickFirstButton={onAccess}
    />
  )
})
