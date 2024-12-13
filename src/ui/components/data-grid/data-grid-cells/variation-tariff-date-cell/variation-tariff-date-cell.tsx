import { FC, memo } from 'react'

import { Tooltip } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { TooltipInfoIcon } from '@components/shared/svg-icons'

import { formatDateWithoutTime } from '@utils/date-time'
import { t } from '@utils/translations'

import { ITariffsWithCalculations } from '@typings/shared/variation-tariff'

import { useStyles } from './variation-tariff-date-cell.style'

import { cellConfig } from './variation-tariff-date-cell.config'

interface VariationTariffDateCellProps {
  tariff: ITariffsWithCalculations
}

export const VariationTariffDateCell: FC<VariationTariffDateCellProps> = memo(({ tariff }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {cellConfig.map(({ param, icon, tooltipText }) => (
        <div key={param} className={styles.dateParam}>
          <div className={styles.iconWrapper}>
            <Tooltip arrow title={formatDateWithoutTime(tariff?.[param as keyof ITariffsWithCalculations])}>
              <div>{icon}</div>
            </Tooltip>

            <Tooltip
              arrow
              title={t(TranslationKey[tooltipText as keyof typeof TranslationKey])}
              className={styles.tooltip}
            >
              <div>
                <TooltipInfoIcon />
              </div>
            </Tooltip>
          </div>
        </div>
      ))}
    </div>
  )
})
