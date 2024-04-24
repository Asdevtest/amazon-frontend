import { ContentState, EditorState, convertFromRaw, convertToRaw } from 'draft-js'

export const parseJSON = (value: string) => {
  // ContentState.createFromText(value) - this is a just text, so value.startsWith('{"blocks":') - that other requests do not break (leave only convertFromRaw(JSON.parse(value)) - right solution)
  const contentState = value?.startsWith('{"blocks":')
    ? convertFromRaw(JSON?.parse(value))
    : ContentState?.createFromText(value)
  const editorState = EditorState.createWithContent(contentState)

  return JSON.stringify(convertToRaw(editorState.getCurrentContent()))
}
