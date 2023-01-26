import React, {  useEffect, useState } from 'react'

function Header(){

    const pageTitle = 'Chunks';

    return(
        <>
            <div className="navbar  flex justify-between bg-base-100  z-10 shadow-md ">

                {/* Menu toogle for mobile view or small screen */}
                <div className="">
                    <label htmlFor="left-sidebar-drawer" className="btn btn-primary drawer-button lg:hidden">
                        OPEN
                        {/*<Bars3Icon className="h-5 inline-block w-5" />*/}
                    </label>
                    <h1 className="text-2xl font-semibold ml-2">{pageTitle}</h1>
                </div>

                <div className="order-last">

                </div>
            </div>

        </>
    )
}

export default Header