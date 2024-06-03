import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  wrapper: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '10px',
  },

  launchesWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },

  text: {
    padding: '5px 10px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 12,
    lineHeight: '12px',
    fontWeight: 600,
    borderRadius: '22px',
  },
}))
