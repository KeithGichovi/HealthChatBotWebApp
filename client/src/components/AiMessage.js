import React from 'react';
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeExternalLinks from "rehype-external-links";
import remarkExternalLinks from "remark-external-links";


/**
 * 
 * @component AiMessage
 * @description This component is used to display the messages from the Chatbot.
 * @param {Object} props - The component props.
 * @param {string} props.ChatbotMessageProp - The message to be displayed by the Chatbot.
 * @returns {JSX.Element} The rendered AiMessage component.
 * 
 * 
 */
const AiMessage = ({ ChatbotMessageProp }) => {
    return (
        <div className="bg-gray-500 text-white text-justify md:text-start items-start p-4 rounded-lg m-2 w-full">
            <Markdown
                remarkPlugins={[remarkGfm, remarkExternalLinks]}
                rehypePlugins={[rehypeExternalLinks]}
                components={{
                    a: (props) => <a className="font-semibold underline text-gray-800 hover:text-blue-300" {...props}>{props.children}</a>,
                    p: (props) => <p className="text-start text-gray-100 my-2" {...props}/>,
                    ul: (props) => <ul className="px-4 lg:pl-4 md:px-2 list-decimal list-inside" {...props}/>,
                    ol: (props) => <ol className="px-4 lg:pl-12 md:px-2 list-decimal list-outside" {...props}/>,
                    blockquote: (props) => <blockquote
                        className="border-l-4 border-gray-400 pl-2 italic my-4" {...props}/>
                }}
                children={ChatbotMessageProp}
            />
        </div>

    );
};

export default AiMessage;
