import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const WAREHOUSE_RECEIVE_HEAD_CELLS = styles => [
  { title: <p className={styles.headerCell}>{t(TranslationKey.Box)}</p> },
  { title: <p className={styles.headerCell}>{t(TranslationKey['Boxes in group'])}</p> },
  // {title: <p className={styles.headerCell}>{t(TranslationKey.Quantity)}</p>},

  { title: <p className={styles.headerCell}>{t(TranslationKey.Total)}</p> },
  {
    title: <p className={styles.headerCell}>{`${t(TranslationKey.Sizes)}, ${t(TranslationKey.cm)}`}</p>,
  },
  { title: <p className={styles.headerCell}>{t(TranslationKey['Weight, kg'])}</p> },
  { title: <p className={styles.headerCell}>{t(TranslationKey['Volume weight, kg'])}</p> },
  { title: <p className={styles.headerCell}>{t(TranslationKey['Final weight, kg'])}</p> },
]
