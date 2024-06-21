import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  parameterTitle: {
    fontSize: '16px',
    fontWeight: 400,
  },

  parametersWrapper: {
    flex: 1,
    borderRadius: '12px',

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    gap: '15px',

    overflowY: 'auto',
    overflowX: 'hidden',

    padding: '10px 14px',

    boxShadow: '0px 2.18px 4.36px 0px rgba(97, 97, 97, 0.18), 0px 1.09px 2.18px 0px rgba(97, 97, 97, 0.18)',
  },
}))
