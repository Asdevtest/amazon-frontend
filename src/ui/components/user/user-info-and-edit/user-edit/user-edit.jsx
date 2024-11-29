import { observer } from 'mobx-react'
import { useMemo } from 'react'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdminUserEditContent } from '@components/contents/admin-user-edit-content'
import { VerticalChoicesModal } from '@components/modals/vertical-choices-modal'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './user-edit.style'

import { UserEditModel } from './user-edit.model'

export const UserEdit = observer(({ user }) => {
  const { classes: styles } = useStyles()
  const history = useHistory()
  const viewModel = useMemo(() => new UserEditModel({ history, user }), [])

  return (
    <div className={styles.mainWrapper}>
      <AdminUserEditContent
        specs={viewModel.specs}
        editUserFormFields={viewModel.userData}
        buttonLabel={t(TranslationKey.Save)}
        onSubmit={viewModel.finalStepSubmitEditUserForm}
        onClickCancelBtn={viewModel.onClickCancelBtn}
        onUpdateData={viewModel.getUserData}
      />

      <Modal
        openModal={viewModel.showVerticalChoicesModal}
        setOpenModal={() => viewModel.onTriggerOpenModal('showVerticalChoicesModal')}
      >
        <VerticalChoicesModal
          title="Data saved successfully"
          firstButtonText="Back to Users"
          secondButtonText="Continue working with the user"
          onClickFirstButton={viewModel.goToUsers}
          onClickSecondButton={viewModel.onClickBottomBtn}
        />
      </Modal>
    </div>
  )
})
