import { LanguageSelect } from '@widgets/language-select'
import { Popconfirm } from 'antd'
import { observer } from 'mobx-react'
import { FC, useState } from 'react'
import { IoMoonSharp, IoSunnySharp } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'

import { appVersion } from '@constants/app-version'
import { TranslationKey } from '@constants/translations/translation-key'

import { SettingsModel } from '@models/settings-model'

import { AuthForm } from '@components/forms/auth-form'
import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { UiTheme } from '@typings/enums/ui-theme'

import { useStyles } from './auth-view.style'

import { AuthViewModel } from '../../model/auth-view.model'
import { Banner } from '../banner/banner'

interface AuthViewProps {
  auth: boolean
}

const AuthView: FC<AuthViewProps> = observer(({ auth }) => {
  const { classes: styles } = useStyles()
  const navigate = useNavigate()
  const [viewModel] = useState(() => new AuthViewModel({ navigate, auth }))
  const title = auth ? t(TranslationKey['Sign in']) : t(TranslationKey.Registration)

  return (
    <div className={styles.root}>
      <Banner />

      <div className={styles.rightPanel}>
        <div className={styles.formWrapper}>
          <div className={styles.flexContainer}>
            <p className={styles.title}>{title}</p>

            <div className={styles.flexContainer}>
              <CustomButton type="link" className={styles.themeSelector} onClick={viewModel.onChangeTheme}>
                {SettingsModel.uiTheme === UiTheme.light ? <IoMoonSharp size={18} /> : <IoSunnySharp size={18} />}
              </CustomButton>

              <LanguageSelect />
            </div>
          </div>

          <AuthForm
            auth={auth}
            loading={viewModel.loading}
            onSubmit={viewModel.onSubmitForm}
            onRedirect={viewModel.onRedirect}
          />
        </div>

        <div className={styles.versionContainer}>
          <Popconfirm
            placement="topRight"
            title={t(TranslationKey.Attention)}
            description={t(TranslationKey['Temporary session data will be reset'])}
            okText={t(TranslationKey.Yes)}
            cancelText={t(TranslationKey.No)}
            onConfirm={viewModel.onClickVersion}
          >
            <CustomButton disabled={!auth} type="link">
              {appVersion}
            </CustomButton>
          </Popconfirm>
        </div>
      </div>
    </div>
  )
})

export default AuthView
