import { observer } from 'mobx-react'
import { FC, useMemo } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

import { useStyles } from './management-tab-view.style'

import { ManagementTabViewModel } from './management-tab-view.model'
import { MemberSelect } from './member-select'

export const ManagementTabView: FC = observer(() => {
  const { classes: styles } = useStyles()

  const viewModel = useMemo(() => new ManagementTabViewModel(), [])

  return (
    <div className={styles.mainWrapper}>
      <p className={styles.titleMembers}>{t(TranslationKey.AllMembers)}</p>

      <div className={styles.selectsWrapper}>
        <MemberSelect
          isEmptyMember
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
          isEmptyMember
          title={t(TranslationKey.Supervisor)}
          value={viewModel.supervisor._id}
          disabled={viewModel.isEditableSupervisor}
          options={viewModel.supervisors}
          isDisabled={viewModel.isDisabledSupervisor}
          onChange={viewModel.onChangeSupervisor}
          onSave={viewModel.onUpdateMember}
        />

        <MemberSelect
          isEmptyMember
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
  )
})
