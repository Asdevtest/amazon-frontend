import { observer } from 'mobx-react'
import React, { useEffect, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { AdminUserEditContent } from '@components/contents/admin-user-edit-content'
import { ConfirmationModal } from '@components/modals/confirmation-modal'
import { TwoVerticalChoicesModal } from '@components/modals/two-vertical-choices-modal'

import { t } from '@utils/translations'

import { useClassNames } from './user-edit.style'

import { UserEditModel } from './user-edit.model'

export const UserEdit = observer(({ user }) => {
  const { classes: classNames } = useClassNames()
  const history = useHistory()
  const model = useRef(new UserEditModel({ history, user }))

  useEffect(() => {
    model.current.loadData()
  }, [])

  const {
    // wrongPassword,
    showTwoVerticalChoicesModal,
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
    onClickBottomBtn,
  } = model.current

  return (
    <div className={classNames.mainWrapper}>
      {singlePermissions ? (
        <AdminUserEditContent
          // wrongPassword={wrongPassword}
          checkValidationNameOrEmail={checkValidationNameOrEmail}
          changeFields={changeFields}
          singlePermissions={singlePermissions}
          groupPermissions={groupPermissions}
          editUserFormFields={userData}
          buttonLabel={t(TranslationKey.Save)}
          onSubmit={submitEditUserForm}
          onClickCancelBtn={onClickCancelBtn}
        />
      ) : null}

      <ConfirmationModal
        isWarning={confirmModalSettings.isWarning}
        openModal={showConfirmModal}
        setOpenModal={() => onTriggerOpenModal('showConfirmModal')}
        title={t(TranslationKey.Attention)}
        message={confirmModalSettings.message}
        successBtnText={t(TranslationKey.Yes)}
        cancelBtnText={t(TranslationKey.No)}
        onClickSuccessBtn={confirmModalSettings.onClickSuccess}
        onClickCancelBtn={() => onTriggerOpenModal('showConfirmModal')}
      />

      <TwoVerticalChoicesModal
        openModal={showTwoVerticalChoicesModal}
        setOpenModal={() => onTriggerOpenModal('showTwoVerticalChoicesModal')}
        title={t(TranslationKey['Data saved successfully'])}
        topBtnText={t(TranslationKey['Back to Users'])}
        bottomBtnText={t(TranslationKey['Continue working with the user'])}
        onClickTopBtn={() => goToUsers()}
        onClickBottomBtn={onClickBottomBtn}
      />
    </div>
  )
})
