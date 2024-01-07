import ButtonMain from '@/Components/LandingPage/ButtonMain';
import { PageProps, User } from '@/types';
import { useForm } from '@inertiajs/react';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';
import { BsFillSendFill } from 'react-icons/bs';
import { IoIosArrowBack } from "react-icons/io";
import ChattingLeft from './ChattingLeft';
import ChattingRight from './ChattingRight';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

type ChattingRoomProps = {
  messages: any
  shopOwner: Pick<User, 'id' | 'avatar' | 'name'>
  customer: Pick<User, 'id' | 'avatar' | 'name'>

} & PageProps

const ChattingRoom: React.FC<ChattingRoomProps> = ({ messages, shopOwner, customer, auth }) => {
  const listChat = useRef<HTMLDivElement>(null)

  console.log(customer);

  const [messagess, setmessagess] = useState(messages.messages)
  const inputRef = useRef<HTMLInputElement>(null)

  function handleBack() {
    window.history.back()
  }

  const { data, setData, post, processing, errors, reset } = useForm({
    message: '',
    chatting_room_id: messages.id,
    message_from_id: auth.user.id,
  });

  function handleSendMessage(e: SyntheticEvent) {
    e.preventDefault()

    post(route('chatting_room_create_message'));
    if (inputRef.current) {
      inputRef.current.value = '';
    }

    reset('chatting_room_id', 'message', 'message_from_id')

  }

  useEffect(() => {
    window.Echo.channel(`messages${messages.id}`).listen("MessageCreated", (event: any) => {
      setmessagess((prev: any) => [...prev, event.message])
    })
  }, [])

  useEffect(() => {
    listChat.current?.lastElementChild?.scrollIntoView();
  }, [messagess])


  return (
    <div>
      <div className='bg-green-200 py-2 flex items-center gap-4 px-4' >
        <button onClick={handleBack} className='text-lg font-bold ' ><IoIosArrowBack /></button>
        {
          shopOwner.id !== auth.user.id ?
            <>
              <img src={`http://127.0.0.1:8000/storage/${shopOwner.avatar}`} className="h-full object-cover rounded-full w-10" alt="" />
              <h1 className='text-lg font-semibold'>{shopOwner.name}</h1>
            </>
            : null
        }
        {
          customer.id !== auth.user.id ?
            <>
              <img src={`http://127.0.0.1:8000/storage/${customer.avatar}`} className="h-full object-cover rounded-full w-10" alt="" />
              <h1 className='text-lg font-semibold'>{customer.name}</h1>
            </>
            : null
        }
      </div>

      <div className='pt-2 h-[85.5vh] overflow-y-scroll' ref={listChat} >
        {
          messagess.map((message: any, key: number) => (
            <div key={key}>
              {
                message.message_from_id === auth.user.id ?
                  <ChattingRight message={message} />
                  : <ChattingLeft message={message} />
              }
            </div>
          ))
        }
      </div>

      <div className='absolute bottom-3 py-2 w-[90%]'>
        <form onSubmit={handleSendMessage} className='flex gap-4 mx-5 w-full ' >
          <input ref={inputRef} onChange={(e) => setData('message', e.target.value)} type="text" className='flex-1 rounded-lg ' />
          <div className='w-10' >
            <ButtonMain variant='no_border'  >
              <div className='flex justify-center items-center text-center'>
                <BsFillSendFill />
              </div>
            </ButtonMain>
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChattingRoom