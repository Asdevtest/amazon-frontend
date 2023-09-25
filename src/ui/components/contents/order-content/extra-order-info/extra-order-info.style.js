import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  orderContainer: {
    width: '537px',
  },

  label: {
    fontSize: '12px',
    fontWeight: 400,
    lineHeight: '20px',
    color: 'rgba(143, 152, 165, 1)',
  },
  text: {
    color: theme.palette.text.general,
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
  },

  subTitle: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
    textAlign: 'center',
  },

  photoCarousel: {
    height: '150px',
    display: 'flex',
    alignItems: 'center',
  },

  subTitleWrapper: {
    display: 'flex',
    justifyContent: 'center',

    width: '100%',
    minHeight: 50,
  },
  photosWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },

  photoWrapper: {
    width: '40%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },

  input: {
    height: '140px',
    border: '1px solid #e0e0e0',
    borderRadius: '4px',
  },

  commentsWrapper: {
    marginTop: '30px',
  },

  commentsTitle: {
    color: theme.palette.text.general,
    fontSize: '16px',
    fontWeight: '400',
    lineHeight: '19px',
    marginBottom: '20px',
  },

  textField: {
    marginBottom: '40px',
  },
}))
