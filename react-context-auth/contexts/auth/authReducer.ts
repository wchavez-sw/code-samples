import { AuthState, RecoverPasswordData } from './'
import { User } from '@interfaces'

type AuthActionType =
  | { type: 'AUTH_LOGIN'; payload: User }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'AUTH_SAVE_RP_DATA'; payload: RecoverPasswordData }

export const authReducer = (
  state: AuthState,
  action: AuthActionType
): AuthState => {
  switch (action.type) {
    case 'AUTH_SAVE_RP_DATA':
      return {
        ...state,
        recoverPasswordData: {
          ...state.recoverPasswordData,
          ...action.payload,
        },
      }

    case 'AUTH_LOGIN':
      return {
        ...state,
        isLoggedIn: true,
        checking: false,
        user: {
          id: action.payload.id,
          username: action.payload.username,
          email: action.payload.email,
          fullname: action.payload.fullname,
          firstName: action.payload.firstName,
          lastName: action.payload.lastName,
          birthday: action.payload.birthday,
          country: action.payload.country,
          role: action.payload.role,
          createdAt: action.payload.createdAt,
          phoneNumber: action.payload.phoneNumber,
          avatarUri: action.payload.avatarUri,
          wyreId: action.payload.wyreId,
          ssn: action.payload.ssn,
          status: action.payload.status,
        },
      }

    case 'AUTH_LOGOUT':
      return {
        ...state,
        isLoggedIn: false,
        checking: false,
        user: undefined,
      }

    default:
      return state
  }
}
