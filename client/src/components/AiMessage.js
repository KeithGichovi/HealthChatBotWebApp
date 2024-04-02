import React from 'react';
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeExternalLinks from "rehype-external-links";
import remarkExternalLinks from "remark-external-links";


const AiMessage = ({ ChatbotMessageProp }) => {

    return (
        <div className="bg-gray-500 text-white text-start items-start p-4 rounded-lg m-2 w-full">
            <Markdown
                className={`right-0`}
                remarkPlugins={[remarkGfm, remarkExternalLinks]}
                rehypePlugins={[rehypeExternalLinks]}
                components={{
                    a: (props) => <a className={`semi-bold underline text-gray-800 hover:text-blue-300`} {...props}/>,
                    li: (props) => <li className={`ml-2 py-1 lg:ml-5`} {...props}/>,
                    h1: (props) => <li className={`text-2xl py-1`} {...props}/>
                }}
                children={ChatbotMessageProp}
            />
        </div>
    );
};

export default AiMessage;
