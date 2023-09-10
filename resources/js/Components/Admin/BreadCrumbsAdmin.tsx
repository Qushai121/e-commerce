import React from 'react'
import WrapperShadow from '../WrapperShadow'

const BreadCrumbsAdmin = () => {
    let routes = window.location.pathname.split('/');

    return (
        <nav className='flex items-center h-full ' >
            <div className="text-sm breadcrumbs">
                <ul>
                    {

                        routes.filter((route) => {
                            return route !== ''
                        }).map((route) => (
                            <li>
                                <p className={`${routes[routes.length - 1] == route ? 'text-base_secondary' : ''} `}>
                                    {route}
                                </p>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </nav>
    )
}

export default BreadCrumbsAdmin