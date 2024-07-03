import { Form, Input } from 'antd'
import { FC, memo, useCallback } from 'react'
import { MdOutlineEmail } from 'react-icons/md'
import { RiLockPasswordLine, RiUser3Line } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { t } from '@utils/translations'

import { useStyles } from './auth-form.style'

import { FieldType } from '../../../auth-view.type'
import {
  confirmValidationRules,
  getEmailValidationRules,
  getPasswordValidationRules,
  nameValidationRules,
} from '../model/config/rules'

interface AuthFormFormProps {
  onSubmit: (value: FieldType) => void
  onRedirect: () => void
  auth?: boolean
}

export const AuthForm: FC<AuthFormFormProps> = memo(props => {
  const { onSubmit, onRedirect, auth } = props

  const { classes: styles } = useStyles()
  const [form] = Form.useForm()

  const onFinish = useCallback(
    (value: FieldType) => {
      onSubmit(value)
      form.resetFields()
    },
    [onSubmit],
  )

  const redirectText = auth ? t(TranslationKey['Create account']) : t(TranslationKey['Already have account?'])
  const buttonText = auth ? t(TranslationKey.Login) : t(TranslationKey.Register)
  const passwordValidationRules = getPasswordValidationRules(auth)
  const emailValidationRules = getEmailValidationRules(auth)

  return (
    <Form autoComplete="off" name="registration" size="large" form={form} onFinish={onFinish}>
      {!auth ? (
        <Form.Item name="name" rules={nameValidationRules}>
          <Input maxLength={64} size="large" placeholder={t(TranslationKey.Name)} prefix={<RiUser3Line />} />
        </Form.Item>
      ) : null}

      <Form.Item<FieldType> name="email" rules={emailValidationRules}>
        <Input
          maxLength={64}
          size="large"
          placeholder={t(TranslationKey.Email)}
          autoComplete={!auth ? 'username' : 'on'}
          prefix={<MdOutlineEmail />}
        />
      </Form.Item>

      <Form.Item<FieldType> hasFeedback name="password" rules={passwordValidationRules}>
        <Input.Password
          maxLength={64}
          size="large"
          type="password"
          placeholder={t(TranslationKey.Password)}
          autoComplete={!auth ? 'new-password' : 'on'}
          prefix={<RiLockPasswordLine />}
        />
      </Form.Item>

      {!auth ? (
        <Form.Item hasFeedback name="confirm" dependencies={['password']} rules={confirmValidationRules}>
          <Input.Password
            maxLength={64}
            size="large"
            placeholder={t(TranslationKey['Confirm password'])}
            prefix={<RiLockPasswordLine />}
          />
        </Form.Item>
      ) : null}

      <div className={styles.buttons}>
        <Form.Item shouldUpdate>
          <CustomButton size="large" type="primary" htmlType="submit">
            {buttonText}
          </CustomButton>
        </Form.Item>

        <CustomButton type="link" className={styles.link} onClick={onRedirect}>
          {redirectText}
        </CustomButton>
      </div>
    </Form>
  )
})
