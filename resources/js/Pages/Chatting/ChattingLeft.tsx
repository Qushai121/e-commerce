import React from 'react'

type ChattingLeftProps = {
    message: any
}

const ChattingLeft: React.FC<ChattingLeftProps> = ({ message }) => {
    return (
        <div className="chat chat-start">
            <img src={`http://127.0.0.1:8000/storage/${message.user.avatar}`} className="h-full object-cover rounded-full w-10" alt="" />
            <div className="chat-bubble">{message.message}</div>
        </div>
    )
}

export default ChattingLeft