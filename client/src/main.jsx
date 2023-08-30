import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import 'remixicon/fonts/remixicon.css'
import { CookiesProvider } from "react-cookie"
import { Provider } from "react-redux"
import store from './redux/store.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <CookiesProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </CookiesProvider>
)
