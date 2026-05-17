import { createContext } from "react"

const employeeContext=createContext()

const EmployeeContextProvider = ({children}) => {

  const contextValue={

  }
  return (
    <employeeContext.Provider value={contextValue}>
      {children}
    </employeeContext.Provider>
  )
}

export default EmployeeContextProvider
