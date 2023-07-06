/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react'
import { observer } from 'mobx-react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { SettingsModel } from '@models/settings-model'

import { MemberSelect } from './member-select'
import { useManagement } from './use-management.hook'

import { useClassNames } from './management.style'

export const Management: FC = observer(() => {
  const { classes: classNames } = useClassNames()

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
    isEditableClient,
    isEditableBuyer,
    isEditableSupervisor,
    isEditableResearcher,
    onChangeClient,
    onChangeBuyer,
    onChangeSupervisor,
    onChangeResearcher,
    onUpdateMember,
  } = useManagement()

  return (
    <>
      {SettingsModel.languageTag && (
        <div className={classNames.mainWrapper}>
          <p className={classNames.titleMembers}>{t(TranslationKey.AllMembers)}</p>

          <div className={classNames.selectsWrapper}>
            <MemberSelect
              title={t(TranslationKey.Client)}
              value={client._id}
              disabled={!isEditableClient}
              options={clients}
              isDisabled={isDisabledClient}
              onChange={onChangeClient}
              onSave={onUpdateMember}
            />

            <MemberSelect
              title={t(TranslationKey.Buyer)}
              value={buyer._id}
              disabled={!isEditableBuyer}
              options={buyers}
              isDisabled={isDisabledBuyer}
              onChange={onChangeBuyer}
              onSave={onUpdateMember}
            />

            <MemberSelect
              title={t(TranslationKey.Supervisor)}
              value={supervisor._id}
              disabled={isEditableSupervisor}
              options={supervisors}
              isDisabled={isDisabledSupervisor}
              onChange={onChangeSupervisor}
              onSave={onUpdateMember}
            />

            <MemberSelect
              title={t(TranslationKey.Researcher)}
              value={researcher._id}
              disabled={!isEditableResearcher}
              options={researchers}
              isDisabled={isDisabledResearcher}
              onChange={onChangeResearcher}
              onSave={onUpdateMember}
            />
          </div>
        </div>
      )}
    </>
  )
})
