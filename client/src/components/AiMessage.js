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
                    a: (props) => <a className={`underline text-[#F58426] hover:text-blue-300`} {...props}/>,
                    li: (props) => <li className={`ml-6 py-1`} {...props}/>
                }}
            >
                {ChatbotMessageProp}
            </Markdown>
        </div>
    );
};

export default AiMessage;
