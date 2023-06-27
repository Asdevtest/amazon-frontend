import { BACKEND_API_URL } from '@constants/keys/env'

export const getUserAvatarSrc = userId => `${BACKEND_API_URL}/uploads/avatars/${userId}.webp`
