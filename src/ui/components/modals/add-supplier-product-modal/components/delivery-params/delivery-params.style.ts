import { makeStyles } from 'tss-react/mui'

export const useStyles = makeStyles()(() => ({
  deliveryParamsWrapper: {
    display: 'flex',
    gap: '20px',
  },

  deliveryCostsWrapper: {
    display: 'flex',
    gap: '20px',
  },

  supplierCourseWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
}))
