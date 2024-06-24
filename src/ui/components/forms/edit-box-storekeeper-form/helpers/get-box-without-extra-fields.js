export const getBoxWithoutExtraFields = box => {
  const { finalWeight, volumeWeight, ...boxWithoutExtraFields } = box

  return boxWithoutExtraFields
}
