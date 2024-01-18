import { observer } from 'mobx-react'
import { useEffect, useState } from 'react'
import { withStyles } from 'tss-react/mui'

import { Paper, Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field'
import { Input } from '@components/shared/input'
import { OnOffSelector } from '@components/shared/selectors/on-off-selector'

import { t } from '@utils/translations'

import { styles } from './admin-technical-view.style'

import { AdminTechnicalViewModel } from './admin-technical-view.model'

export const AdminTechnicalViewRaw = props => {
  const [viewModel] = useState(
    () =>
      new AdminTechnicalViewModel({
        history: props.history,
      }),
  )
  const { classes: styles } = props

  useEffect(() => {
    viewModel.loadData()
  }, [])

  return (
    <>
      <div>
        <div className={styles.mainWrapper}>
          <div className={styles.btnsWrapper}>
            <Button className={styles.backBtn} onClick={viewModel.onBackBtn}>
              {t(TranslationKey.Back)}
            </Button>
          </div>

          <Field
            oneLine
            labelClasses={styles.fieldLabel}
            label={t(TranslationKey['Access for users'])}
            inputComponent={
              <div className={styles.selectorMainWrapper}>
                <div className={styles.selectorWrapper}>
                  <OnOffSelector value={viewModel.serverWorkOn} onClick={viewModel.onTriggerTechnicalWorks} />
                </div>

                <Typography className={styles.noticeAttention}>
                  {t(TranslationKey['Notify users before disconnecting']) + '!'}
                </Typography>
              </div>
            }
          />
          <div className={styles.noticesWrapper}>
            <Paper className={styles.noticesPaper}>
              <Field
                labelClasses={styles.fieldLabel}
                label={t(TranslationKey['Notice of technical work'])}
                inputComponent={
                  <div className={styles.technicalWorkNoticeWrapper}>
                    <Typography className={styles.technicalWorkNoticeAttention}>
                      {t(TranslationKey.Attention).toUpperCase() + '!'}
                    </Typography>

                    <Typography className={styles.technicalWorkNoticeText}>
                      {t(
                        TranslationKey[
                          'We recommend that you save any unsaved changes and finish the work.\n When the technical work begins, all unsaved changes will be lost.\n\nWe apologize for the inconvenience!'
                        ],
                      )}
                    </Typography>

                    <Button disabled>{t(TranslationKey['Send a notice'])}</Button>
                  </div>
                }
              />
            </Paper>

            <Paper className={styles.noticesPaper}>
              <Field
                labelClasses={styles.fieldLabel}
                label={t(TranslationKey['Notice to users'])}
                inputComponent={
                  <div className={styles.usersNoticeWrapper}>
                    <Input
                      multiline
                      minRows={6}
                      maxRows={6}
                      placeholder={t(TranslationKey['Enter notification text'])}
                      className={styles.usersNoticeInput}
                    />

                    <Button disabled>{t(TranslationKey.Send)}</Button>
                  </div>
                }
              />
            </Paper>
          </div>
        </div>
      </div>
    </>
  )
}

export const AdminTechnicalView = withStyles(observer(AdminTechnicalViewRaw), styles)
