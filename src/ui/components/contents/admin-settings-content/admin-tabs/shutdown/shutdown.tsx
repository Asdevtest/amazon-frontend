import { observer } from 'mobx-react'
import { FC, useState } from 'react'
import { AiOutlinePoweroff } from 'react-icons/ai'
import { PiAlarmDuotone } from 'react-icons/pi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomDivider } from '@components/shared/custom-divider'
import { CustomSwitch } from '@components/shared/custom-switch'
import { CustomTextarea } from '@components/shared/custom-textarea'
import { CustomTimer } from '@components/shared/custom-timer'

import { t } from '@utils/translations'

import { useStyles } from './shutdown.style'

import { ShutdownModel } from './shutdown.model'

interface ShutdownProps {}

export const Shutdown: FC<ShutdownProps> = observer(() => {
  const { classes: styles, cx } = useStyles()

  const [viewModel] = useState(() => new ShutdownModel())

  return (
    <div className={cx(styles.wrapper, styles.flexColumnContainer)}>
      <div className={cx(styles.flexRowContainer, styles.spaceBetween)}>
        <p className={styles.title}>{t(TranslationKey['Access for users'])}</p>

        <div className={styles.flexRowContainer}>
          <p className={styles.notifyText}>{t(TranslationKey['Notify users before disconnecting']) + '!'}</p>
          <CustomSwitch
            disabled={viewModel.shutdownDelayChecked}
            value={viewModel.serverEnabled}
            checkedChildren={t(TranslationKey.On)}
            unCheckedChildren={t(TranslationKey.Off)}
            onChange={viewModel.onToggleServer}
          />
        </div>
      </div>

      <div className={cx(styles.flexRowContainer, styles.spaceBetween, styles.fixedHeight)}>
        <div className={cx(styles.leftContainer, styles.flexColumnContainer)}>
          <CustomCheckbox value={viewModel.shutdownDelayChecked} onChange={viewModel.onChangeShutdownDelay}>
            {t(TranslationKey['Shutdown delay'])}
          </CustomCheckbox>

          <div className={styles.center}>
            {viewModel.shutdownDelayChecked ? (
              <CustomTimer targetDate={new Date(new Date().getTime() + 10 * 60000)} startIcon={<AiOutlinePoweroff />} />
            ) : (
              <PiAlarmDuotone className={styles.iconAlarm} />
            )}
          </div>
        </div>

        <CustomDivider type="vertical" className={styles.divider} />

        <div className={cx(styles.rightContainer, styles.flexColumnContainer)}>
          <p className={styles.title}>{t(TranslationKey['Notice to users'])}</p>

          <CustomTextarea allowClear rows={5} />

          <div className={cx(styles.flexRowContainer, styles.spaceBetween)}>
            <CustomButton type="primary">{t(TranslationKey.Send)}</CustomButton>
            <CustomButton type="primary">{t(TranslationKey.Edit)}</CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
})
