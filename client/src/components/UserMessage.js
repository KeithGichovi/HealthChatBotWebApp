import React from 'react';


const UserMessage = ({UserMessageProp}) => {
    return (
        <div className="max-w-[500px] bg-blue-500 text-white text-start items-end rounded-lg p-4 m-2">
            {UserMessageProp}
        </div>
    )
}

export default UserMessage;