import { Chunk, FindChunksProps, SingleTextWordsWithPos } from './chat-message.type'

export const findChunks = ({ searchWords, textToHighlight }: FindChunksProps) => {
  const chunks: Chunk[] = []
  const textLow = textToHighlight.toLowerCase()
  const sep = /[\s]+/

  const singleTextWords = textLow.split(sep)

  let fromIndex = 0
  const singleTextWordsWithPos = singleTextWords.map((s: string) => {
    const indexInWord = textLow.indexOf(s, fromIndex)
    fromIndex = indexInWord
    return {
      word: s,
      index: indexInWord,
    }
  })

  searchWords.forEach((sw: string) => {
    if (!sw) {
      return
    }
    const swLow = sw?.toLowerCase()
    singleTextWordsWithPos.forEach((s: SingleTextWordsWithPos) => {
      if (s?.word?.includes(swLow)) {
        const start = s?.index
        const end = s?.index + s?.word?.length
        chunks.push({
          start,
          end,
        })
      }
    })
  })

  return chunks
}
