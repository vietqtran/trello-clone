import { persistor, store } from "../../redux/store"

import { PersistGate } from "redux-persist/integration/react"
import { Provider } from "react-redux"
import React from "react"

const ReduxWrapper = ({ children }: { children: React.ReactNode }) => {
   return (
      <Provider store={store}>
         <PersistGate persistor={persistor} loading={null}>
            {children}
         </PersistGate>
      </Provider>
   )
}

export default ReduxWrapper
