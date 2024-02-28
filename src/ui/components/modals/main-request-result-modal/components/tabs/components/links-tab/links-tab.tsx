import { ChangeEvent, FC, memo, useState } from 'react'

import { MAX_DEFAULT_INPUT_VALUE } from '@constants/text'
import { TranslationKey } from '@constants/translations/translation-key'

import { IFields, SetFields } from '@components/modals/main-request-result-modal/main-request-result-modal.type'
import { CopyValue } from '@components/shared/copy-value'
import { Input } from '@components/shared/input'
import { BasketIcon, CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './links-tab.style'

interface LinksTabProps {
  isClient: boolean
  fields: IFields
  setFields: SetFields
  readOnly?: boolean
}

export const LinksTab: FC<LinksTabProps> = memo(props => {
  const { isClient, fields, setFields, readOnly } = props

  const { classes: styles, cx } = useStyles()

  const [newLinkValue, setNewLinkValue] = useState('')

  const handleAddLink = () => {
    if (newLinkValue && !isClient) {
      setFields(prevFields => ({
        ...prevFields,
        publicationLinks: [...(prevFields?.publicationLinks || []), newLinkValue],
      }))
      setNewLinkValue('')
    }
  }

  const handleChangeLink = (linkIndex: number, value: string) => {
    if (!isClient) {
      setFields(prevFields => ({
        ...prevFields,
        publicationLinks: prevFields?.publicationLinks?.map((link, index) => (index === linkIndex ? value : link)),
      }))
    }
  }

  const handleRemoveLink = (linkIndex: number) => {
    if (!isClient) {
      setFields(prevFields => ({
        ...prevFields,
        publicationLinks: prevFields?.publicationLinks?.filter((_, index) => index !== linkIndex),
      }))
    }
  }

  const disabledAddLinkButton = newLinkValue.trim().length === 0

  return (
    <div className={styles.wrapper}>
      <div className={cx(styles.links, { [styles.clientLinks]: isClient })}>
        {fields?.publicationLinks?.map((link, index) => (
          <div key={index} className={styles.linkContainer}>
            {!isClient && !readOnly ? (
              <Input
                readOnly={isClient}
                value={link}
                maxLength={MAX_DEFAULT_INPUT_VALUE}
                classes={{
                  root: cx(styles.inputRoot, { [styles.notFocuced]: isClient, [styles.error]: link.length === 0 }),
                  input: styles.input,
                }}
                onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeLink(index, e.target.value)}
              />
            ) : (
              <a
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                className={cx(styles.inputRoot, styles.input, styles.link)}
              >
                {link}
              </a>
            )}

            <CopyValue text={link} />

            {!isClient && !readOnly ? (
              <button className={styles.button} onClick={() => handleRemoveLink(index)}>
                <BasketIcon className={styles.iconBasket} />
              </button>
            ) : null}
          </div>
        ))}
      </div>

      {!isClient && !readOnly ? (
        <div className={styles.addLinkContainer}>
          <Input
            value={newLinkValue}
            placeholder={`${t(TranslationKey['Enter link'])}...`}
            classes={{ root: cx(styles.inputRoot, styles.addInput), input: styles.input }}
            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewLinkValue(e.target.value)}
          />

          <button disabled={disabledAddLinkButton} className={styles.button} onClick={handleAddLink}>
            <CustomPlusIcon className={styles.iconPlus} />
            {t(TranslationKey['Add link'])}
          </button>
        </div>
      ) : null}
    </div>
  )
})
