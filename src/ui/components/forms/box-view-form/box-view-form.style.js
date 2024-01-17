import { makeStyles } from 'tss-react/mui'

export const useClassNames = makeStyles()(theme => ({
  wrapper: {
    height: '100%',
    width: 1040,
    padding: 10,
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 20,
  },

  boxAndPrepIdContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  boxAndPrepIdTitle: {
    fontSize: 18,
    lineHeight: '25px',
    fontWeight: 600,
    textTransform: 'uppercase',
    color: theme.palette.text.general,
  },

  boxAndPrepIdInput: {
    width: 240,
    height: 40,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 7,
  },

  input: {
    fontSize: 16,
    lineHeight: '22px',
    color: theme.palette.text.general,
  },

  superBoxContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
  },

  superBoxIconContainer: {
    padding: '5px 15px',
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: 7,
  },

  superBoxIcon: {
    width: 28,
    height: 28,
  },

  superBoxText: {
    fontSize: 22,
    lineHeight: '28px',
    fontWeight: 600,
    color: theme.palette.primary.main,
  },

  updatedContainer: {
    marginLeft: 'auto',
    display: 'flex',
    gap: 10,
  },

  updatedText: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.second,
  },

  updatedTitle: {
    fontSize: 18,
    lineHeight: '25px',
    color: theme.palette.text.general,
  },

  divider: {
    height: 1,
    width: '100%',
    background: '#E0E0E0',
  },

  information: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },

  informationContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },

  informationContainerMinGap: {
    gap: 17,
  },

  informationTitle: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  informationText: {
    minWidth: 150,
    maxWidth: 300,
    fontSize: 16,
    lineHeight: '22px',
    color: theme.palette.text.general,

    wordBreak: 'break-all',
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: 1,
    WebkitBoxOrient: 'vertical',
  },

  informationUser: {
    fontSize: 16,
    lineHeight: '22px',
    fontWeight: 400,
    color: theme.palette.text.general,
  },

  switcherWrapper: {
    display: 'flex',
    flexDirection: 'column',
  },

  informationTitleMargin: {
    marginTop: 10,
  },

  blueColor: {
    color: theme.palette.primary.main,
  },

  commentsWrapper: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: 30,
  },

  commentField: {
    height: 'auto',
  },

  label: {
    marginBottom: 5,
    fontSize: '14px',
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  fieldContainer: {
    margin: '0 !important',
  },

  buttonsWrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 40,
  },

  closeBtn: {
    padding: '0 15px',
    color: theme.palette.text.general,
  },
}))
