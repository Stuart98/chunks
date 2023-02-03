import { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from "./Header";

import routes from '../routes/index';

import SuspenseContent from "./SuspenseContent";


function PageContent(){
    const mainContentRef = useRef(null);

    return(
        <div className="drawer-content flex flex-col bg-white rounded-box m-5 md:ml-0 shadow-md">
            <Header/>
            <main className="flex flex-1 overflow-y-auto py-5 px-6" ref={mainContentRef}>
                <Suspense fallback={<SuspenseContent />}>
                        <Routes>
                            {
                                routes.map((route, key) => {
                                    return(
                                        <Route
                                            key={key}
                                            path={`${route.path}`}
                                            element={<route.component />}
                                        />
                                    )
                                })
                            }
                        </Routes>
                </Suspense>
                <div className="h-16"></div>
            </main>
        </div> 
    )
}


export default PageContent
