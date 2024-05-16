import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  launches: {
    padding: '10px 0',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '5px 10px',
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
