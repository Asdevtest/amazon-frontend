export const copyToClipBoard = text => (text ? navigator.clipboard.writeText(text) : null)
