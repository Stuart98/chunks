import { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Header from "./Header";

import routes from '../routes/index';

import SuspenseContent from "./SuspenseContent";


function PageContent(props){
    const mainContentRef = useRef(null);
console.log(props);
    return(
        <div className="drawer-content flex flex-col bg-white rounded-box m-5 ml-0 shadow-md">
            <Header/>
            <main className="flex-1 overflow-y-auto pt-8 px-6" ref={mainContentRef}>
                <Suspense fallback={<SuspenseContent />}>
                        <Routes>
                            {
                                routes.map((route, key) => {
                                    console.log(route);
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
