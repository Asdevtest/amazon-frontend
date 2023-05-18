import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  root: {
    backgroundColor: '#CCE2FF',
    padding: '15px 14px',
    borderRadius: '4px',
    '& p, h1, h2, h3, h4, h5, span': {
      margin: 0,
    },
  },
  headerWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarWrapper: {
    height: 57,
    width: 57,
    borderRadius: 57,
  },
  headerTextWrapper: {
    marginLeft: 15,
  },
  headerText: {
    color: theme.palette.text.second,
    fontSize: 18,
  },
  titleWrapper: {
    marginTop: 10,
  },
  titleText: {
    color: theme.palette.text.second,
    fontSize: 18,
  },
  descriptionWrapper: {
    marginTop: 10,
  },
  descriptionText: {
    color: theme.palette.text.second,
    fontSize: 18,
  },
  otherInfoWrapper: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelValueDoubleBlockWrapperNotFirst: {
    marginLeft: 20,
  },
  filesAndLinksWrapper: {
    display: 'flex',
    flexDirection: 'row',
  },
  files: {
    display: 'flex',
    flex: 1,
  },
  links: {
    display: 'flex',
    flex: 1,
  },
}))
