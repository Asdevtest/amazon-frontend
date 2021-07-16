import {makeStyles} from '@material-ui/core'

export const useClassNames = makeStyles(theme => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: '10px',
    marginTop: '5px',
    minWidth: '400px',
    gap: '20px',
  },

  img: {
    width: '80px',
    height: '80px',
    marginRight: '4px',
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    maxWidth: '370px',
    maxHeight: '150px',
    textOverflow: 'ellipsis',
    // whiteSpace: 'nowrap',
    overflow: 'hidden',
    overflowY: 'scroll',
  },
  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
  inputWrapper: {
    border: '1px solid rgba(143, 152, 165, 1)',
    borderRadius: '4px',
    width: '40px',
    height: '20px',
  },
  input: {
    fontSize: '14px',
    textAlign: 'center',
  },
  countWrapper: {
    display: 'flex',
  },
  chipWrapper: {
    display: 'flex',
  },
  mainWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
  },
  attributeWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}))
