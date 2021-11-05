import React, {useState} from 'react'

import {Typography} from '@material-ui/core'
import {observer} from 'mobx-react'

import {Button} from '@components/buttons/button'
import {SuccessButton} from '@components/buttons/success-button'
import {Field} from '@components/field/field'
import {Modal} from '@components/modal'

import {useClassNames} from './add-competitor-modal.style'

export const AddCompetitorModal = observer(({openModal, setOpenModal, currentCompetitors, onChangeField}) => {
  const classNames = useClassNames()

  const [competitor, setCompetitor] = useState({link: '', comments: ''})

  const onSubmit = () => {
    onChangeField({target: {value: [...currentCompetitors, competitor]}}, 'listingSupplierCompetitors')
    setOpenModal()

    setCompetitor({link: '', comments: ''})
  }

  return (
    <Modal openModal={openModal} setOpenModal={setOpenModal}>
      <div className={classNames.modalMessageWrapper}>
        <Typography paragraph variant="h5">
          {'Добавить конкурента'}
        </Typography>

        <div className={classNames.fieldsWrapper}>
          <Field
            multiline
            label={'Ссылка'}
            className={classNames.linkField}
            value={competitor.link}
            onChange={e => setCompetitor({...competitor, link: e.target.value})}
          />

          <Field
            multiline
            label={'Комментарий'}
            className={classNames.commentField}
            value={competitor.comments}
            onChange={e => setCompetitor({...competitor, comments: e.target.value})}
          />
        </div>

        <div className={classNames.buttonsWrapper}>
          <SuccessButton
            disableElevation
            disabled={competitor.link === '' || competitor.comments === ''}
            variant="contained"
            onClick={onSubmit}
          >
            {'Добавить'}
          </SuccessButton>

          <Button
            disableElevation
            className={classNames.button}
            color="primary"
            variant="contained"
            onClick={() => {
              setOpenModal()
              setCompetitor({link: '', comments: ''})
            }}
          >
            {'Отмена'}
          </Button>
        </div>
      </div>
    </Modal>
  )
})
