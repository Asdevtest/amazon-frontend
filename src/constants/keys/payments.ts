import { objectFlip } from '@utils/object'

export const paymentsMethod = {
  ALIPAY: 'ALIPAY',
  PAYONEER: 'PAYONEER',
  BANK_TRANSACTION: 'BANK_TRANSACTION',
}

export const paymentsMethodByCode = {
  0: paymentsMethod.ALIPAY,
  10: paymentsMethod.PAYONEER,
  20: paymentsMethod.BANK_TRANSACTION,
}

export const paymentsMethodByKey = objectFlip(paymentsMethodByCode, parseInt)
