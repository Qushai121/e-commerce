import ButtonMain from '@/Components/LandingPage/ButtonMain'
import LinkMain from '@/Components/LandingPage/LinkMain'
import { PageProps } from '@/types'
import { router, usePage } from '@inertiajs/react'
import React, { SyntheticEvent } from 'react'
import { BsChatLeftText } from 'react-icons/bs'

type ChattingRoomMakerProps = {
    shopOwnerId?: number
    customerId?: number
}
const ChattingRoomMaker: React.FC<ChattingRoomMakerProps> = ({ shopOwnerId, customerId }) => {
    const { user } = usePage<PageProps>().props.auth

    // jika shopOwnerId ada valuenya maka yang mulai chat si customer 
    // jika customerId ada valuenya maka yang mulai chat si shop owner 

    function handleMakeChatRoom(e: SyntheticEvent) {
        if (!user) {
            return window.location.replace(route('login'))
        }
        e.preventDefault();

        if (shopOwnerId) {
            router.post(route('chatting_room_create'),
                {
                    'shop_owner_id ': shopOwnerId,
                    'customer_id': user.id
                }
            );
        } else if (customerId) {
            router.post(route('chatting_room_create'),
                {
                    'shop_owner_id ': user.id,
                    'customer_id': customerId
                }
            );
        } else {
            return alert('Something Wrong Happen');
        }
    }

    return (
        <ButtonMain onClick={handleMakeChatRoom} variant='border' className='flex items-center justify-center w-full' >
            <div className='flex justify-center' >
                <BsChatLeftText />
            </div>
        </ButtonMain>
    )
}

export default ChattingRoomMaker