import {Fragment, React} from 'react'
import {Routes, Route} from 'react-router-dom'

import 'preline/preline'
import DefaultComponent from '../../components/DefaultComponent/DefaultComponent'

import { adminroutes } from '../../../routes'

const AdminPage = () => {

  return (
    <>
        <Routes>
            {adminroutes.map((route,index) => {
                const Page = route.page;
                const Layout = route.isShowSidebar ? DefaultComponent : Fragment;
                return (
                    <Route path={route.path} 
                    element={
                        <Layout>
                            {/* hero section */}
                            <div class="w-full lg:ps-64">
                            <div class="sm:p-6">
                                <Page/>
                            </div>
                            </div>
                            {/* end hero section */}
                        </Layout>      
                    }/>
                )
            })}
        </Routes>
    </>
  )
}

export default AdminPage
