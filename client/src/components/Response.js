import React from 'react';
import { CiWarning } from "react-icons/ci";

/***
 * 
 * @component Response
 * @description - This component is used to display the response message.
 * @param {Object} response - The response object.
 * @returns {JSX.Element} - The rendered Response component.
 * 
 */
const Response = ({response}) => {
    return (
        <div className={`flex flex-row bg-red-300 items-center justify-start p-4 rounded-md mb-2`}>
            <CiWarning
                size={30}
                className={`text-white mr-4`}
            />
            <span>{response.message}</span>
        </div>
    )
}

export default Response;