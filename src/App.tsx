import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import store from './store';
import {AuthProvider} from './context/AuthContext';
import {AppRoutes} from './routes';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
