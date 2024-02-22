import React from 'react';


const AiMessage = ({ChatbotMessageProp}) => {
    return (
        <div className="bg-blue-700 text-white text-start items-start p-4 rounded-lg m-2">
            <p className={'right-0'}>{ChatbotMessageProp}</p>
        </div>
    )
}

export default AiMessage;