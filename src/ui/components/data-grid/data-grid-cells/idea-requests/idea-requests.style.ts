import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  ideaRequestsWrapper: {
    display: 'flex',
    gap: 20,
    alignItems: 'center',
    padding: '16px 0',
    height: '100%',
    width: '990px',
    overflowY: 'auto',
  },

  ideaRequestsControls: {
    display: 'flex',
    gap: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    padding: '0px 5px',

    button: {
      height: 30,
      display: 'flex',
      gap: 5,
      minWidth: '170px !important',

      svg: {
        width: 12,
      },
    },
  },
}))
