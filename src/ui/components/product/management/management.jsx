import { useEffect, useState } from 'react'
import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { SettingsModel } from '@models/settings-model'

import { AdminManagementModel } from './management.model'
import { MemberSelect } from './member-select'
import { useManagement } from './use-management.hook'

import { useClassNames } from './management.style'

export const Management = observer(({ product }) => {
  const { classes: classNames } = useClassNames()

  const [viewModel] = useState(() => new AdminManagementModel({ history }))

  useEffect(() => {
    viewModel.loadData()
  }, [])

  const {
    client,
    clients,
    buyer,
    buyers,
    supervisor,
    supervisors,
    researcher,
    researchers,
    isDisabledClient,
    isDisabledBuyer,
    isDisabledSupervisor,
    isDisabledResearcher,
    isEditableMember,
    onChangeClient,
    onChangeBuyer,
    onChangeSupervisor,
    onChangeResearcher,
    onUpdateMember,
  } = useManagement(viewModel.members, product)

  return (
    <>
      {SettingsModel.languageTag && (
        <div className={classNames.mainWrapper}>
          <p className={classNames.titleMembers}>{t(TranslationKey.AllMembers)}</p>

          <div className={classNames.selectsWrapper}>
            <MemberSelect
              title={t(TranslationKey.Client)}
              value={client._id}
              disabled={!isEditableMember}
              options={clients}
              isDisabled={isDisabledClient}
              onChange={e => onChangeClient(e)}
              onSave={() => onUpdateMember()}
            />

            <MemberSelect
              title={t(TranslationKey.Buyer)}
              value={buyer._id}
              disabled={!isEditableMember}
              options={buyers}
              isDisabled={isDisabledBuyer}
              onChange={e => onChangeBuyer(e)}
              onSave={() => onUpdateMember()}
            />

            <MemberSelect
              title={t(TranslationKey.Supervisor)}
              value={supervisor._id}
              disabled={isDisabledSupervisor}
              options={supervisors}
              isDisabled={isDisabledSupervisor}
              onChange={e => onChangeSupervisor(e)}
              onSave={() => onUpdateMember()}
            />

            <MemberSelect
              title={t(TranslationKey.Researcher)}
              value={researcher._id}
              disabled={isEditableMember}
              options={researchers}
              isDisabled={isDisabledResearcher}
              onChange={e => onChangeResearcher(e)}
              onSave={() => onUpdateMember()}
            />
          </div>
        </div>
      )}
    </>
  )
})
