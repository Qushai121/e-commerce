import Blocked from '@/Components/blockedSection/Blocked'
import React from 'react'
import SelectStore from '../Admin/SelectStore'

const BlockedChooseStore = () => {
    return (
        <div className='h-[75vh] relative'>
            <Blocked message='You Need Chose Your Store  ' >
                <SelectStore />
            </Blocked>
        </div>
    )
}

export default BlockedChooseStore