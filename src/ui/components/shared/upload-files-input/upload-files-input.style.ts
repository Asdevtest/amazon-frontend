import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(theme => ({
  wrapper: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: 10,
  },

  minimazed: {
    display: 'flex',
    alignItems: 'flex-end',
    flexDirection: 'row',
    gap: 10,
  },

  linkInputWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 10,
  },

  linkInputWrapperMinimazed: {
    width: '65%',
  },

  linkInputContainer: {
    margin: 0,
  },

  label: {
    fontSize: 14,
    lineHeight: '19px',
    marginBottom: 5,
  },

  linkInput: {
    border: `1px solid ${theme.palette.input.customBorder}`,
    borderRadius: 20,
  },

  loadButton: {
    margin: 0,
    height: 32,
  },

  uploadInputWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
  },

  uploadInputWrapperMinimazed: {
    width: '35%',
  },

  attachFiles: {
    fontSize: 14,
    lineHeight: '19px',
    color: theme.palette.text.second,
  },

  uploadButton: {
    position: 'relative',
    width: '100%',
    height: 80,
    color: theme.palette.text.general,
    background: theme.palette.background.second,
    border: `2px dashed ${theme.palette.primary.main}`,
    borderRadius: 20,
    transition: '0.3s ease',
    opacity: 1,

    '&:hover': {
      opacity: 0.8,
    },
  },

  uploadButtonMinimized: {
    height: 32,
    padding: '0 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    color: theme.palette.primary.main,
  },

  uploadInput: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    borderRadius: 20,
    top: 0,
    left: 0,
    opacity: 0,
    cursor: 'pointer',
  },

  buttonsWrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    button: {
      height: 32,
      whiteSpace: 'nowrap',
    },
  },

  imagesCount: {
    marginTop: 5,
    fontSize: '14px',
    lineHeight: '19px',
    textAlign: 'center',
    color: theme.palette.text.second,
  },

  imagesCountSpan: {
    fontSize: 16,
    fontWeight: 600,
    color: theme.palette.primary.main,
    marginRight: 5,
  },
}))
