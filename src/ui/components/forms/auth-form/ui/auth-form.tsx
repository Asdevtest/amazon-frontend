import { Form, Input } from 'antd'
import { FC, memo, useCallback, useEffect } from 'react'
import { MdOutlineEmail } from 'react-icons/md'
import { RiLockPasswordLine, RiUser3Line } from 'react-icons/ri'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'

import { FieldData } from '@views/auth/model/types/field'

import { t } from '@utils/translations'

import { useStyles } from './auth-form.style'

import {
  MAX_INPUT_LENGTH,
  confirmValidationRules,
  getEmailValidationRules,
  getPasswordValidationRules,
  nameValidationRules,
  newPasswordValidationRules,
} from '../model/config/rules'

interface AuthFormFormProps {
  onSubmit: (values: FieldData) => void
  onRedirect: () => void
  auth?: boolean
  editUser?: boolean
  loading?: boolean
  data?: FieldData
}

export const AuthForm: FC<AuthFormFormProps> = memo(props => {
  const { onSubmit, onRedirect, auth, editUser, loading, data } = props

  const { classes: styles, cx } = useStyles()
  const [form] = Form.useForm()

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        name: data?.name || '',
        email: data?.email || '',
      })
    }
  }, [])

  const onFinish = useCallback(
    (values: FieldData) => {
      onSubmit(values)
      // form.resetFields()
    },
    [onSubmit],
  )

  const buttonText = editUser ? t(TranslationKey.Save) : auth ? t(TranslationKey.Login) : t(TranslationKey.Register)
  const redirectText = editUser
    ? t(TranslationKey.Close)
    : auth
    ? t(TranslationKey['Create account'])
    : t(TranslationKey['Already have account?'])
  const passwordValidationRules = getPasswordValidationRules(auth, editUser)
  const emailValidationRules = getEmailValidationRules(auth)
  const showConfirmPasswordField = !auth && !editUser

  return (
    <Form name="registration" size="large" form={form} rootClassName={styles.form} onFinish={onFinish}>
      {!auth ? (
        <Form.Item hasFeedback name="name" validateTrigger="onBlur" rules={nameValidationRules}>
          <Input maxLength={MAX_INPUT_LENGTH} placeholder={t(TranslationKey.Name)} prefix={<RiUser3Line />} />
        </Form.Item>
      ) : null}

      <Form.Item<FieldData> hasFeedback validateTrigger="onBlur" name="email" rules={emailValidationRules}>
        <Input
          maxLength={MAX_INPUT_LENGTH}
          disabled={editUser}
          placeholder={t(TranslationKey.Email)}
          autoComplete={!auth ? 'username' : 'on'}
          prefix={<MdOutlineEmail />}
        />
      </Form.Item>

      {editUser ? (
        <Form.Item<FieldData>
          hasFeedback
          name="oldPassword"
          validateTrigger={['onBlur', 'onChange']}
          rules={passwordValidationRules}
        >
          <Input.Password
            maxLength={MAX_INPUT_LENGTH}
            type="password"
            placeholder={t(TranslationKey['Old password'])}
            autoComplete="off"
            prefix={<RiLockPasswordLine />}
          />
        </Form.Item>
      ) : null}

      <Form.Item<FieldData>
        hasFeedback
        name="password"
        validateTrigger={['onBlur', 'onChange']}
        dependencies={['oldPassword']}
        rules={editUser ? newPasswordValidationRules : passwordValidationRules}
      >
        <Input.Password
          maxLength={MAX_INPUT_LENGTH}
          type="password"
          placeholder={t(TranslationKey[editUser ? 'New password' : 'Password'])}
          autoComplete={!auth ? 'new-password' : 'on'}
          prefix={<RiLockPasswordLine />}
        />
      </Form.Item>

      {showConfirmPasswordField ? (
        <Form.Item
          hasFeedback
          name="confirm"
          dependencies={['password']}
          validateTrigger={['onBlur', 'onChange']}
          rules={confirmValidationRules}
        >
          <Input.Password
            maxLength={MAX_INPUT_LENGTH}
            placeholder={t(TranslationKey['Confirm password'])}
            prefix={<RiLockPasswordLine />}
          />
        </Form.Item>
      ) : null}

      <div className={cx(styles.buttons, { [styles.editUser]: editUser })}>
        <Form.Item shouldUpdate>
          <CustomButton type="primary" htmlType="submit" loading={loading} disabled={loading}>
            {buttonText}
          </CustomButton>
        </Form.Item>

        <CustomButton
          type={editUser ? 'default' : 'link'}
          className={editUser ? undefined : styles.link}
          onClick={onRedirect}
        >
          {redirectText}
        </CustomButton>
      </div>
    </Form>
  )
})
