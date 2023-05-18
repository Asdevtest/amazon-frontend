import { Typography } from '@mui/material'

import React, { useState } from 'react'

import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { Button } from '@components/shared/buttons/button'
import { Field } from '@components/shared/field/field'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useClassNames } from './add-competitor-modal.style'

export const AddCompetitorModal = observer(({ openModal, setOpenModal, currentCompetitors, onChangeField }) => {
  const { classes: classNames } = useClassNames()

  const [competitor, setCompetitor] = useState({ link: '', comments: '' })

  const onSubmit = () => {
    onChangeField({ target: { value: [...currentCompetitors, competitor] } }, 'listingSupplierCompetitors')
    setOpenModal()

    setCompetitor({ link: '', comments: '' })
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography paragraph variant="h5">
          {t(TranslationKey['Add a competitor'])}
        </Typography>

        <div className={classNames.fieldsWrapper}>
          <Field
            multiline
            minRows={4}
            maxRows={4}
            label={t(TranslationKey.Link)}
            className={classNames.linkField}
            value={competitor.link}
            onChange={e => setCompetitor({ ...competitor, link: e.target.value })}
          />

          <Field
            multiline
            label={t(TranslationKey.Comment)}
            minRows={4}
            maxRows={4}
            className={classNames.commentField}
            value={competitor.comments}
            onChange={e => setCompetitor({ ...competitor, comments: e.target.value })}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <Button
            success
            disableElevation
            disabled={competitor.link === '' || competitor.comments === ''}
            variant="contained"
            onClick={onSubmit}
          >
            {t(TranslationKey.Add)}
          </Button>

          <Button
            disableElevation
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenModal()
              setCompetitor({ link: '', comments: '' })
            }}
          >
            {t(TranslationKey.Cancel)}
          </Button>
        </div>
      </div>
    </Modal>
  )
})
