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

  systemCourseWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  systemCourse: {
    fontWeight: 600,
  },
}))
