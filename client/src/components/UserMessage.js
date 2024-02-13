import React from 'react';


const UserMessage = ({UserMessageProp}) => {
    return (
        <div className="bg-gray-700 text-white text-justify">
            {UserMessageProp}
        </div>
    )
}

export default UserMessage;