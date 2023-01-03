import { useReducer, useEffect } from 'react'
import Cookies from 'js-cookie'

import { AuthContext, authReducer } from './'

import { User } from '@interfaces'
import { ProfileResponse } from '@interfaces/responses'

import { alfredApi } from '@api'

export interface RecoverPasswordData {
  ref?: string
  pin?: string
}

export interface AuthState {
  isLoggedIn: boolean
  checking: boolean
  user?: User
  recoverPasswordData?: RecoverPasswordData
}

const AUTH_INITIAL_STATE: AuthState = {
  isLoggedIn: false,
  checking: true,
  user: undefined,
  recoverPasswordData: undefined,
}

interface Props {
  children: React.ReactNode
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, AUTH_INITIAL_STATE)

  useEffect(() => {
    checkToken()
  }, [])

  const saveRecoverPasswordData = (data: RecoverPasswordData) => {
    dispatch({
      type: 'AUTH_SAVE_RP_DATA',
      payload: data,
    })
  }

  const checkToken = async () => {
    try {
      const { data } = await alfredApi.get<ProfileResponse>('/users')
      const { data: user } = data

      dispatch({ type: 'AUTH_LOGIN', payload: user })
    } catch (error) {
      Cookies.remove('token')
      dispatch({ type: 'AUTH_LOGOUT' })
    }
  }

  const loginClient = (token: string, user: User) => {
    Cookies.set('token', token)
    dispatch({ type: 'AUTH_LOGIN', payload: user })
  }

  const logoutClient = () => {
    Cookies.remove('token')
    dispatch({ type: 'AUTH_LOGOUT' })
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        saveRecoverPasswordData,
        loginClient,
        logoutClient,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
