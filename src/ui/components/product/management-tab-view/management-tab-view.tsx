import { FC, useEffect, useState } from 'react'

import { observer } from 'mobx-react'
import { useHistory } from 'react-router-dom'

import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { t } from '@utils/translations'

import { ManagementTabViewModel } from './management-tab-view.model'
import { useClassNames } from './management-tab-view.style'
import { MemberSelect } from './member-select'

export const ManagementTabView: FC = observer(() => {
  const { classes: classNames } = useClassNames()

  const history = useHistory()
  const [viewModel] = useState(() => new ManagementTabViewModel({ history }))

  useEffect(() => {
    viewModel.onComponentDidMount()
  }, [])

  return (
    <>
      {SettingsModel.languageTag && (
        <div className={classNames.mainWrapper}>
          <p className={classNames.titleMembers}>{t(TranslationKey.AllMembers)}</p>

          <div className={classNames.selectsWrapper}>
            <MemberSelect
              title={t(TranslationKey.Client)}
              value={viewModel.client._id}
              disabled={!viewModel.isEditableClient}
              options={viewModel.clients}
              isDisabled={viewModel.isDisabledClient}
              onChange={viewModel.onChangeClient}
              onSave={viewModel.onUpdateMember}
            />

            <MemberSelect
              title={t(TranslationKey.Buyer)}
              value={viewModel.buyer._id}
              disabled={!viewModel.isEditableBuyer}
              options={viewModel.buyers}
              isDisabled={viewModel.isDisabledBuyer}
              onChange={viewModel.onChangeBuyer}
              onSave={viewModel.onUpdateMember}
            />

            <MemberSelect
              title={t(TranslationKey.Supervisor)}
              value={viewModel.supervisor._id}
              disabled={viewModel.isEditableSupervisor}
              options={viewModel.supervisors}
              isDisabled={viewModel.isDisabledSupervisor}
              onChange={viewModel.onChangeSupervisor}
              onSave={viewModel.onUpdateMember}
            />

            <MemberSelect
              title={t(TranslationKey.Researcher)}
              value={viewModel.researcher._id}
              disabled={!viewModel.isEditableResearcher}
              options={viewModel.researchers}
              isDisabled={viewModel.isDisabledResearcher}
              onChange={viewModel.onChangeResearcher}
              onSave={viewModel.onUpdateMember}
            />
          </div>
        </div>
      )}
    </>
  )
})
