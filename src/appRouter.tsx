import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Candidate from './pages/Candidate'
import ChangeStatus from './pages/ChangeStatus'
import Detail from './pages/Detail'
import UpdateCandidate from './pages/UpdateCandidate'
import UpdateInteraction from './pages/UpdateInteraction'
 
export const routes =
    <BrowserRouter>
        <ToastContainer />
        <Routes>
            <Route path='/' element={<Candidate />} />
             <Route path='/detail/:candidateId' element={<Detail />} />
             <Route path='/updatecandidate/:candidateId' element={<UpdateCandidate />} />
             <Route path='/changestatus/:candidateId' element={<ChangeStatus />} />
             <Route path='/updateinteraction/:interactionId' element={<UpdateInteraction />} />
            {/* <Route path='*' element={ <Navigate to='/' /> }></Route> */}
        </Routes>
    </BrowserRouter>
