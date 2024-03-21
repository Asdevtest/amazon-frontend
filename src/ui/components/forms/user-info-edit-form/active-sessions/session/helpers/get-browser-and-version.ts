export const getBrowserAndVersion = (session: string): string => {
  let tem: RegExpMatchArray | [] | null
  let M: RegExpMatchArray | [] | null =
    session.match(
      /(opera|chrome|safari|firefox|msie|trident|samsungbrowser|yabrowser(?=\/))\/?\s*(\d+(\.\d+)+(\.\d+)?)/i,
    ) || []

  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+(\.\d+)+(\.\d+)?)/g.exec(session) || []

    return `Explorer (${tem[1] || ''})`
  }

  if (M[1] === 'Chrome') {
    tem = session.match(/\b(OPR|Edge)\/(\d+(\.\d+)+(\.\d+)?)/)

    if (tem !== null) {
      const app = tem.slice(1).toString().split(',')

      return `${app[0].replace('OPR', 'Opera')} (${app[1]})`
    }
  }

  M = M[2] ? [M[1], M[2]] : ['Unknown', '0']
  tem = session.match(/version\/(\d+(\.\d+)+(\.\d+)?)/i)

  if (tem !== null) {
    M.splice(1, 1, tem[1])
  }

  return `${M[0]} (${M[1]})`
}
