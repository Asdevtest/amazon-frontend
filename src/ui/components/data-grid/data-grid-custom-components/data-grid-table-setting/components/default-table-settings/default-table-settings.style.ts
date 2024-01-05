import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  parameterTitle: {
    fontSize: '16px',
    fontWeight: 400,
  },

  parametersWrapper: {
    flex: 1,

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',

    overflow: 'auto',

    padding: '10px 14px',

    border: '1px solid var(--Gray-100, #F2F4F7)',
    boxShadow: '0px 2.18px 4.36px 0px rgba(97, 97, 97, 0.18), 0px 1.09px 2.18px 0px rgba(97, 97, 97, 0.18)',
  },
}))
