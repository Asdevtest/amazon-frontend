import { observer } from 'mobx-react'
import { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdminUserEditContent } from '@components/contents/admin-user-edit-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { VerticalChoicesModal } from '@components/modals/vertical-choices-modal'
import { Modal } from '@components/shared/modal'

import { t } from '@utils/translations'

import { useStyles } from './user-edit.style'

import { UserEditModel } from './user-edit.model'

export const UserEdit = observer(({ user }) => {
  const { classes: styles } = useStyles()
  const history = useHistory()
  const model = useRef(new UserEditModel({ history, user }))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    // wrongPassword,
    showVerticalChoicesModal,
    checkValidationNameOrEmail,
    changeFields,
    groupPermissions,
    confirmModalSettings,
    showConfirmModal,
    singlePermissions,
    onTriggerOpenModal,
    onClickCancelBtn,
    submitEditUserForm,
    goToUsers,
    userData,
    specs,
    onClickBottomBtn,
    getUserData,
  } = model.current

  return (
    <div className={styles.mainWrapper}>
      {singlePermissions ? (
        <AdminUserEditContent
          changeFields={changeFields}
          specs={specs}
          singlePermissions={singlePermissions}
          groupPermissions={groupPermissions}
          editUserFormFields={userData}
          buttonLabel={t(TranslationKey.Save)}
          onSubmit={submitEditUserForm}
          onClickCancelBtn={onClickCancelBtn}
          onUpdateData={getUserData}
        />
      ) : null}

      {showConfirmModal ? (
        <ConfirmationModal
          // @ts-ignore
          isWarning={confirmModalSettings?.isWarning}
          openModal={showConfirmModal}
          setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
          title={t(TranslationKey.Attention)}
          message={confirmModalSettings.message}
          successBtnText={t(TranslationKey.Yes)}
          cancelBtnText={t(TranslationKey.No)}
          onClickSuccessBtn={confirmModalSettings.onClickSuccess}
          onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
        />
      ) : null}

      <Modal openModal={showVerticalChoicesModal} setOpenModal={() => onTriggerOpenModal('showVerticalChoicesModal')}>
        <VerticalChoicesModal
          title="Data saved successfully"
          firstButtonText="Back to Users"
          secondButtonText="Continue working with the user"
          onClickFirstButton={goToUsers}
          onClickSecondButton={onClickBottomBtn}
        />
      </Modal>
    </div>
  )
})
