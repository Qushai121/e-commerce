import React from 'react'
import ButtonAdmin from './ButtonAdmin'
import WrapperShadow from '../WrapperShadow'

type DownloadMenuProps = {
    className?: string
}

const DownloadMenu: React.FC<DownloadMenuProps> = ({ className }) => {
    return (
        <WrapperShadow className={`flex items-center gap-4 ${className}`}>
            <div>
                <ButtonAdmin className='!bg-red-400' >
                    Download Pdf
                </ButtonAdmin>
            </div>
            <div>
                <ButtonAdmin className='!bg-green-400' >
                    Download Excel
                </ButtonAdmin>
            </div>
        </WrapperShadow>
    )
}

export default DownloadMenu