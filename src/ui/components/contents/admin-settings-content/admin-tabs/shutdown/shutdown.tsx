import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'
import { PiAlarmDuotone } from 'react-icons/pi'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomCheckbox } from '@components/shared/custom-checkbox'
import { CustomDivider } from '@components/shared/custom-divider'
import { CustomInputNumber } from '@components/shared/custom-input-number'
import { CustomSelect } from '@components/shared/custom-select'
import { CustomSwitch } from '@components/shared/custom-switch'
import { CustomTextarea } from '@components/shared/custom-textarea'

import { t } from '@utils/translations'

import { ITechPause } from '@typings/models/administrators/tech-pause'

import { useStyles } from './shutdown.style'

import { getSelectConfig } from './shutdown.config'
import { ShutdownModel } from './shutdown.model'

interface ShutdownProps {
  techPause: ITechPause
}

export const Shutdown: FC<ShutdownProps> = observer(({ techPause }) => {
  const { classes: styles, cx } = useStyles()
  const viewModel = useMemo(() => new ShutdownModel(techPause), [])

  const selectAfter = (
    <CustomSelect
      value={viewModel.timePart}
      options={getSelectConfig()}
      className={styles.select}
      onChange={viewModel.onChangeTimePart}
    />
  )

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
          <CustomCheckbox checked={viewModel.shutdownDelayChecked} onChange={viewModel.onChangeShutdownDelay}>
            {t(TranslationKey['Shutdown delay'])}
          </CustomCheckbox>

          <div className={styles.center}>
            {viewModel.shutdownDelayChecked ? (
              <CustomInputNumber
                precision={0}
                maxLength={3}
                addonAfter={selectAfter}
                value={viewModel.timePartValue}
                wrapperClassName={styles.input}
                onChange={viewModel.onChangeTimePartValue}
              />
            ) : (
              <PiAlarmDuotone className={styles.iconAlarm} />
            )}
          </div>
        </div>

        <CustomDivider type="vertical" className={styles.divider} />

        <div className={cx(styles.rightContainer, styles.flexColumnContainer)}>
          <p className={styles.title}>{t(TranslationKey['Notice to users'])}</p>

          <CustomTextarea
            allowClear
            rows={5}
            disabled={!viewModel.shutdownDelayChecked}
            value={viewModel.noticeMessage}
            onChange={viewModel.onChangeNoticeMessage}
          />

          <div className={cx(styles.flexRowContainer, styles.flexEnd)}>
            <CustomButton type="primary" disabled={viewModel.disabledSendButton} onClick={viewModel.onToggleServer}>
              {t(TranslationKey.Send)}
            </CustomButton>
          </div>
        </div>
      </div>
    </div>
  )
})
