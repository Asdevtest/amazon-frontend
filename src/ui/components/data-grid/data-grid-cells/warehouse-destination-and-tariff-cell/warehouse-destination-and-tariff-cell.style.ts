import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  destinationAndTariffWrapper: {
    padding: '10px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  storekeeperBtn: {
    width: 180,
    padding: '0 15px',
    fontSize: 12,
    lineHeight: '16px',
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
}))
