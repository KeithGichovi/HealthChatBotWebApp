import React from 'react';

/***
 * 
 * @component UserMessage
 * @description - This component is used to display the user message.
 * @param {Object} props - The component props.
 * @param {string} props.UserMessageProp - The user message to be displayed.
 * @returns {JSX.Element} - The rendered UserMessage component.
 * 
 */
const UserMessage = ({UserMessageProp}) => {
    return (
        <div className="w-full bg-blue-600 text-white text-start items-end rounded-lg p-4 m-2">
            {UserMessageProp}
        </div>
    )
}

export default UserMessage;