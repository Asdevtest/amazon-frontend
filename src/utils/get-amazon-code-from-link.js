export const getAmazonCodeFromLink = link => {
  const pattern = /\/dp\/\w+/
  const out = link.match(pattern) ? link.match(pattern) : []
  const code = out[0] ? out[0].split('/')[2] : ''
  return code
}
