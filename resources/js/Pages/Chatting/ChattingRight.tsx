import React from 'react'

type ChattingRightProps = {
    message: any
}

const ChattingRight: React.FC<ChattingRightProps> = ({ message }) => {

    return (
        <div className="chat chat-end">
            <div className="chat-bubble">{message.message}</div>
            <img src={`http://127.0.0.1:8000/storage/${message.user.avatar}`} className="h-full object-cover rounded-full w-10" alt="" />
        </div>
    )
}

export default ChattingRight