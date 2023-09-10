import React from 'react'
import WrapperShadow from '../WrapperShadow'

const NavbarAdmin = () => {
    let routes = window.location.pathname.split('/');

    return (
        <WrapperShadow>
            <nav >
                <div className='h-[5rem] flex items-center' >
                    <div className="text-sm breadcrumbs">
                        <ul>
                            {

                                routes.filter((route) => {
                                    return route !== ''
                                }).map((route, key) => (
                                    <li key={key}>
                                        <p className={`${routes[routes.length - 1] == route ? 'text-base_secondary' : ''} `}>
                                            {route}
                                        </p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                </div>
            </nav>
        </WrapperShadow>
    )
}

export default NavbarAdmin