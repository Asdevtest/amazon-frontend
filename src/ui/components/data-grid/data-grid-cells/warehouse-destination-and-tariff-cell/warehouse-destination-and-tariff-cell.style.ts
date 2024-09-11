import { makeStyles } from 'tss-react/mui'

import { height } from '@mui/system'

export const useStyles = makeStyles()(() => ({
  destinationAndTariffWrapper: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  tafiffText: {
    width: '100%',
    maxWidth: 'max-content',
    overflow: 'hidden',
    wordBreak: 'break-all',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  tariffButton: {
    height: 30,
  },
}))
