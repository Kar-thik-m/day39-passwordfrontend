import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import People from './pages/user';
import Login from './pages/Login';
import Register from './pages/Register';
import EmailCheck from './pages/EmailCheck';
import PrivateRoute from '../PrivateRoute';
import Reset from './pages/PasswordReast';
import Verify from './pages/Verify';
const App = () => {

  return (
    <BrowserRouter>
      <Routes>
        <Route>
          <Route index path="/" element={<PrivateRoute element={<People />} />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/EmailCheck' element={<EmailCheck />} />
          <Route path='/Reset' element={<Reset />} />
          <Route path='/verify' element={<Verify />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}


export default App;