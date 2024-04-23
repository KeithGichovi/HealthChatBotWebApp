import React from 'react';
import Markdown from "react-markdown";
import remarkGfm from 'remark-gfm'
import rehypeExternalLinks from "rehype-external-links";
import remarkExternalLinks from "remark-external-links";

const AiMessage = ({ ChatbotMessageProp }) => {
    return (
        <div className="bg-gray-500 text-white text-justify md:text-start items-start p-4 rounded-lg m-2 w-full">
            <Markdown
                remarkPlugins={[remarkGfm, remarkExternalLinks]}
                rehypePlugins={[rehypeExternalLinks]}
                components={{
                    a: (props) => <a className="font-semibold underline text-gray-800 hover:text-blue-300" {...props}/>,
                    h1: (props) => <h1 className="text-3xl font-bold text-white my-4" {...props}/>,
                    h2: (props) => <h2 className="text-2xl font-semibold text-white my-3" {...props}/>,
                    h3: (props) => <h3 className="text-xl font-semibold text-white my-2" {...props}/>,
                    h4: (props) => <h4 className="text-lg font-semibold text-white my-2" {...props}/>,
                    p: (props) => <p className="text-start text-gray-100 my-2" {...props}/>,
                    ul: (props) => <ul className="p-2 lg:pl-4 list-decimal list-inside" {...props}/>,
                    ol: (props) => <ol className="p-2 lg:pl-12 list-decimal list-outside" {...props}/>,
                    blockquote: (props) => <blockquote className="border-l-4 border-gray-400 pl-2 italic my-4" {...props}/>
                }}
                children={ChatbotMessageProp}
            />
        </div>
    );
};

export default AiMessage;
