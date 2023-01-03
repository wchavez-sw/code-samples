import { createContext, useContext } from 'react'
import { RecoverPasswordData } from './'
import { User } from '@interfaces'

interface ContextProps {
  isLoggedIn: boolean
  checking: boolean
  user?: User
  recoverPasswordData?: RecoverPasswordData

  saveRecoverPasswordData: (data: RecoverPasswordData) => void
  loginClient: (token: string, user: User) => void
  logoutClient: () => void
}

export const AuthContext = createContext({} as ContextProps)

export const useAuthContext = () => useContext(AuthContext)
