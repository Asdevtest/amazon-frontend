import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    width: '100%',
    justifyContent: 'space-between',

    '.rowInput': {
      flexDirection: 'row',
      alignItems: 'center',
    },
  },

  inputNumber: {
    width: '70px',
  },

  systemCourseWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  systemCourse: {
    fontWeight: 600,
  },
}))
