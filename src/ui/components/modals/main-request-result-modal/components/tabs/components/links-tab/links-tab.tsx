import { ChangeEvent, FC, memo, useEffect, useState } from 'react'

import { TranslationKey } from '@constants/translations/translation-key'

import { CopyValue } from '@components/shared/copy-value'
import { Input } from '@components/shared/input'
import { CustomPlusIcon } from '@components/shared/svg-icons'

import { t } from '@utils/translations'

import { useStyles } from './links-tab.style'

interface LinksTabProps {
  links: string[]
}

export const LinksTab: FC<LinksTabProps> = memo(({ links }) => {
  const { classes: styles } = useStyles()

  const [publicationLinks, setPublicationLinks] = useState<string[]>([])
  const [linkValue, setLinkValue] = useState('')

  useEffect(() => {
    if (links.length > 0) {
      setPublicationLinks(links)
    }
  }, [links])

  const handleAddLink = () => {
    if (linkValue) {
      setPublicationLinks([...publicationLinks, linkValue])
      setLinkValue('')
    }
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.links}>
        {publicationLinks.map((link, index) => (
          <div key={index} className={styles.linkContainer}>
            <Input readOnly value={link} classes={{ root: styles.input }} />

            <CopyValue text={link} />
          </div>
        ))}
      </div>

      <div className={styles.addLinkContainer}>
        <button className={styles.button} onClick={handleAddLink}>
          <CustomPlusIcon className={styles.icon} />
          <span>{t(TranslationKey['Add link'])}</span>
        </button>

        <Input
          value={linkValue}
          placeholder={`${t(TranslationKey['Enter link'])}...`}
          classes={{ root: styles.input }}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setLinkValue(e.target.value)}
        />
      </div>
    </div>
  )
})
