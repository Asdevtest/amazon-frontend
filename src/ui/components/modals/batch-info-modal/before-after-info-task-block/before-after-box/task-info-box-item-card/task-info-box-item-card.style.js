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
    objectFit: 'contain',
    objectPosition: 'center',
  },

  title: {
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: '21px',
    marginRight: '10px',
    maxWidth: '370px',
    maxHeight: '150px',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginBottom: '20px',
  },
  barCodeField: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '21px',
    width: '200px',
    height: '50px',
    overflowX: 'scroll',
    whiteSpace: 'nowrap',
  },

  subTitle: {
    fontSize: '14px',
    color: theme.palette.text.secondary,
    marginRight: theme.spacing(1),
  },
  inputWrapper: {
    border: '1px solid rgba(143, 152, 165, 1)',
    borderRadius: '4px',
    maxWidth: '80px',
    height: '40px',
  },
  input: {
    fontSize: '20px',
    textAlign: 'center',
  },
  countWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  superCount: {
    marginLeft: '5px',
    fontSize: '22px',
    color: 'rgba(143, 152, 165, 1)',
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
  fieldsWrapper: {
    display: 'flex',
    gap: '10px',
  },

  moreBtn: {
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '18px',
    marginBottom: '10px',
  },
}))
