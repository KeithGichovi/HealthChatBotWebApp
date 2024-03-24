import React from 'react';


const UserMessage = ({UserMessageProp}) => {
    return (
        <div className="w-full bg-blue-600 text-white text-start items-end rounded-lg p-4 m-2">
            {UserMessageProp}
        </div>
    )
}

export default UserMessage;