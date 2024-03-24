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
            >
                {ChatbotMessageProp}
            </Markdown>
        </div>
    );
};

export default AiMessage;
