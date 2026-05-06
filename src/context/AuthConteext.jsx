import { createContext } from 'react'

export const authDataContext = createContext();

const AuthConteext = ({children}) => {
    let serverUrl = import.meta.env.VITE_API_URL
    console.log(serverUrl);
    
    let value = {
        serverUrl,
    }
  return (
    <div>
        <authDataContext.Provider value={value}>
            {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthConteext
