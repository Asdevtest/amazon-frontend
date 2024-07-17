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

import { AuthViewModel } from '../../model/model'
import { Banner } from '../Banner/Banner'

import classes from './AuthView.module.scss'

interface AuthViewProps {
  auth: boolean
}

const AuthView: FC<AuthViewProps> = observer(({ auth }) => {
  const navigate = useNavigate()
  const [viewModel] = useState(() => new AuthViewModel({ navigate, auth }))
  const title = auth ? t(TranslationKey['Sign in']) : t(TranslationKey.Registration)

  return (
    <div className={classes.root}>
      <Banner />

      <div className={classes.rightPanel}>
        <div className={classes.formWrapper}>
          <div className={classes.flexContainer}>
            <p className={classes.title}>{title}</p>

            <div className={classes.flexContainer}>
              <CustomButton type="link" className={classes.themeSelector} onClick={viewModel.onChangeTheme}>
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

        <div className={classes.versionContainer}>
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
