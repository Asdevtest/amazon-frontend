import {BACKEND_API_URL} from '@constants/env'

export const getUserAvatarSrc = userId => `${BACKEND_API_URL}/uploads/avatars/${userId}.webp`
