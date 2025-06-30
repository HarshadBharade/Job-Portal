import { createBrowserRouter } from 'react-router-dom'
import Navbar from './components/shared/navbar'

const appRouter = createBrowserRouter([
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/',
    element:<Home/>
  },
  {
    path:'/',
    element:<Home/>
  }
])

function App(){
 return (
    <>
      <Navbar/>

    </>
  )

}

 

export default App
