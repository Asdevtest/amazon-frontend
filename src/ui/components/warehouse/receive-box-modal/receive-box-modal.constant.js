import { Typography } from '@mui/material'

import { TranslationKey } from '@constants/translations/translation-key'

import { t } from '@utils/translations'

export const WAREHOUSE_RECEIVE_HEAD_CELLS = styles => [
  { title: <Typography className={styles.headerCell}>{t(TranslationKey.Box)}</Typography> },
  { title: <Typography className={styles.headerCell}>{t(TranslationKey['Boxes in group'])}</Typography> },
  // {title: <Typography className={styles.headerCell}>{t(TranslationKey.Quantity)}</Typography>},

  { title: <Typography className={styles.headerCell}>{t(TranslationKey.Total)}</Typography> },
  {
    title: (
      <Typography className={styles.headerCell}>{`${t(TranslationKey.Sizes)}, ${t(TranslationKey.cm)}`}</Typography>
    ),
  },
  { title: <Typography className={styles.headerCell}>{t(TranslationKey['Weight, kg'])}</Typography> },
  { title: <Typography className={styles.headerCell}>{t(TranslationKey['Volume weight, kg'])}</Typography> },
  { title: <Typography className={styles.headerCell}>{t(TranslationKey['Final weight, kg'])}</Typography> },
]
