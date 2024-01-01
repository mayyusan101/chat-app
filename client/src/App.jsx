import { Chat, Header } from '../utils/import.js';
import { store } from './store/store.js'
import { Provider } from 'react-redux'
import { AuthContextProvider } from './context/AuthContext.jsx';
import { getUser } from '../utils/localStorage.js';
import './App.css'


function App() {
  return (
    <>
      <Provider store={store}>
        <AuthContextProvider value={getUser() || null}>
          <Header />
          <Chat />
        </AuthContextProvider>
      </Provider>
    </>
  )
}

export default App
