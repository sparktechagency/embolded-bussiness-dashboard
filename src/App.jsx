import 'antd/dist/reset.css';

import './App.css'
import { RouterProvider } from 'react-router-dom';
import Routers from './Router';
import Layout from './layouts/Layout';

const App = () => {
  return (
    <div className=''>
     <RouterProvider router={Routers}>
          <Layout />
     </RouterProvider>
    </div>
  )
}

export default App