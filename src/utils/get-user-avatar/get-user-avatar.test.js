import { getUserAvatarSrc } from './get-user-avatar'

describe('Test getUserAvatarSrc(userId)', () => {
  const validTestValue = [{ userId: '5dd42e16-9594-4f3a-9a6b-e9453193e78c' }]

  validTestValue.forEach(value => {
    test('Valid props', () => {
      expect(getUserAvatarSrc(value.userId)).not.toBeNull()
      expect(typeof getUserAvatarSrc(value.userId)).toBe('string')
    })
  })
})
