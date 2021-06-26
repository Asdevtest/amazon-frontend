import {UserRole} from './user-roles'

export const accessTokens = {
  [UserRole.ADMIN]: '-=test_token=-:60aac071b2f06d5a147ba00c',
  [UserRole.CLIENT]: '-=test_token=-:609001a82ba62f2d093d6344',
  [UserRole.SUPERVISOR]: '-=test_token=-:609001a82ba62f2d093d6343',
  [UserRole.RESEARCHER]: '-=test_token=-:60aabd92b2f06d5a147ba007',
  [UserRole.BUYER]: '-=test_token=-:60aabf69b2f06d5a147ba009',
  [UserRole.STOREKEEPER]: '-=test_token=-:60aabeeab2f06d5a147ba008',
}
