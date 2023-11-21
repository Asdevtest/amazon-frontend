import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    width: '100%',
    display: 'flex',
    padding: 0,
    // marginBottom: '30px',
  },

  mainWrapper: {
    display: 'flex',

    padding: '0 110px 66px 30px',
    width: '100%',

    gap: 60,
  },

  conditionsFieldWrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  accordion: {
    width: '100%',
    borderRadius: '4px',
    boxShadow: `0px 2px 8px 2px ${theme.palette.boxShadow.general}`,
    // backgroundColor: 'red',
  },

  title: {
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '21px',
    color: theme.palette.text.general,

    paddingLeft: 14,
  },

  filesWrapper: {
    display: 'flex',
    height: '100%',
    minWidth: 358,
    flexDirection: 'column',
  },

  details: {
    padding: 0,
  },

  files: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',
    color: theme.palette.text.general,
  },

  conditionsLabel: {
    fontWeight: 600,
    fontSize: '18px',
    lineHeight: '140%',

    color: theme.palette.text.general,
  },
  conditionsSubLabel: {
    fontWeight: 400,
    fontSize: 16,
    lineHeight: '22px',

    color: theme.palette.text.general,
  },
  filesLabel: {
    marginBottom: 10,
  },
  conditionsPhotosWraper: {
    marginTop: 15,
    marginBottom: 30,
  },

  textEditor: {
    maxHeight: '350px !important',
    maxWidth: 1150,
  },
}))
