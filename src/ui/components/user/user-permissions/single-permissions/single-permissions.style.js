import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(() => ({
  mainWrapper: {
    display: 'flex',
    gap: '20px',
    width: '100%',
    marginTop: 10,
    flexDirection: 'column',
  },

  placeAddBtnWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
  },

  addPermissonsBtn: {
    width: '149px',
    height: '40px',
  },

  datagridWrapper: {
    height: '75vh',
    width: '100%',
  },
}))
