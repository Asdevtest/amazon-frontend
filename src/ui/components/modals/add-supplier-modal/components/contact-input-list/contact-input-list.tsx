import { Form } from 'antd'
import { FormListProps, Rule } from 'antd/es/form'
import { FC, memo } from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

import { TranslationKey } from '@constants/translations/translation-key'

import { CustomButton } from '@components/shared/custom-button'
import { CustomInput } from '@components/shared/custom-input'

import { t } from '@utils/translations'

import { useStyles as useSharedStyles } from '../../shared.style'
import { useStyles } from './contact-input-list.style'

import { ContactListHeader } from '../contact-list-header'

interface ContactInputListProps {
  required?: boolean
  listTitle: keyof typeof TranslationKey
  listName: FormListProps['name']
  formItemRules: () => Rule[]
  inputPlaceholder?: keyof typeof TranslationKey
}

export const ContactInputList: FC<ContactInputListProps> = memo(props => {
  const { required = true, listTitle, listName, inputPlaceholder, formItemRules } = props

  const { classes: styles } = useStyles()
  const { classes: sharedStyles } = useSharedStyles()

  return (
    <Form.List name={listName}>
      {(phonesFields, methods) => (
        <div className={styles.listWrapper}>
          <ContactListHeader listTitle={listTitle} required={required} onClickButton={methods.add} />

          {phonesFields.map((phoneField, index) => (
            <Form.Item
              key={phoneField.key}
              name={[phoneField.name]}
              className={sharedStyles.field}
              rules={formItemRules?.()}
            >
              <CustomInput
                required
                size="large"
                placeholder={inputPlaceholder}
                wrapperClassName={sharedStyles.input}
                suffix={index > 0 ? <CustomButton type="text" size="small" icon={<FaMinus size={10} />} /> : null}
              />
            </Form.Item>
          ))}
        </div>
      )}
    </Form.List>
  )
})
