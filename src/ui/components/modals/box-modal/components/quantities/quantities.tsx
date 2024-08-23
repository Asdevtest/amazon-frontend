import { FC, memo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { IBox } from '@typings/models/boxes/box'

import { useStyles } from './quantities.style'

interface QuantitiesProps {
  formFields: IBox
}

export const Quantities: FC<QuantitiesProps> = memo(({ formFields }) => {
  const { classes: styles } = useStyles()

  return (
    <div className={styles.wrapper}>
      {formFields?.amount ? (
        <div className={styles.superBoxContainer}>
          <div className={styles.superBoxIconContainer}>
            <img src="/assets/icons/big-box.svg" className={styles.superBoxIcon} alt="super box" />
            <span className={styles.superBoxText}>SB</span>
          </div>
          <p className={styles.superBoxText}>{`✕ ${formFields?.amount}`}</p>
        </div>
      ) : null}

      <p className={styles.informationTitle}>
        {`${t(TranslationKey['Products in a box'])}: `}
        <span className={styles.blueColor}>{formFields?.items?.length}</span>
      </p>
    </div>
  )
})
