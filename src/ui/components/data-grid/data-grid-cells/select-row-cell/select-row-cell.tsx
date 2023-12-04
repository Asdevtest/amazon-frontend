import React, { FC } from 'react'

import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { ParentProductIcon, VariationProductIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './select-row-cell.style'

import { OpenInNewTabCell } from '../data-grid-cells'

interface SelectRowCellProps {
  checkboxComponent: JSX.Element
  showVariationButton: boolean
  isParentProduct: boolean
  onClickShareIcon: () => void
  onClickVariationButton: () => void
}

export const SelectRowCell: FC<SelectRowCellProps> = React.memo(props => {
  const { classes: styles } = useStyles()
  const { checkboxComponent, showVariationButton, isParentProduct, onClickShareIcon, onClickVariationButton } = props

  return (
    <div className={styles.selectRowCellWrapper}>
      {checkboxComponent}

      <div className={styles.buttonsWrapper}>
        <OpenInNewTabCell onClickOpenInNewTab={onClickShareIcon} />

        {showVariationButton && (
          <Tooltip
            arrow
            title={t(TranslationKey['Product variations'])}
            placement="top"
            classes={{ tooltip: styles.tooltip, arrow: styles.arrow }}
          >
            <div className={styles.iconWrapper} onClick={onClickVariationButton}>
              {isParentProduct ? (
                <ParentProductIcon className={styles.shareLinkIcon} />
              ) : (
                <VariationProductIcon className={styles.shareLinkIcon} />
              )}
            </div>
          </Tooltip>
        )}
      </div>
    </div>
  )
})
