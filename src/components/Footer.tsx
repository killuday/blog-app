'use client'
import React, {useState} from 'react';
import Image from "next/image";

function Footer() {
    const [quote, setQuote] = useState("I've got some cheek making that crack!");
    const quotes = [
        "I've got some cheek making that crack!",
        "I'm a little Behind on my jokes butt a well-Rounded Butt pun always beats a Crappy one.",
        "Is that two cheeky for you?!",
        "Hope this isn't crack-ing you up?",
        "I know, what a half-arsed attempt at humour!",
        "Sorry if I'm being a smart ass.",
        "Like it? You can always take another crack at it?",
        "Ok time to get stuck into the backend again instead of wasting my time writing bottom-drawer jokes.",
        "Ok, well, now that's behind you maybe you'd like to share this?",
        "I'll understand if you think it didn't Butt the mustard!",
        "Cool! You can leave that in the Rear-view now!",
        "Butt wait, there's more!"
        // Add more quotes here
    ];
    const generateQuote = () => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    };
    return (
        <aside className="mt-12 text-center all-prose">
            <p className="mb-6 text-lg leading-relaxed">Looks like you have reached the bottom of this page!</p>{" "}
            {/*ssr:118*/}
            {/*ssr:if:false*/}
            <div className="justify-center flex mb-12">
                <Image
                    alt="a cheeky butt"
                    className="h-full transform transition-transform duration-400 delay-200 hover:rotate-[-22deg]"
                    src="/butt.png"
                    height={100}
                    width={160}
                />
            </div>
            <p className="mb-6 text-lg leading-relaxed">Bummer!</p>
            <p className="mb-6 text-lg leading-relaxed">{quote}</p>
            <button className="bg-gray-200 rounded-full py-1 px-2 text-sm" onClick={generateQuote}>pun me up</button>

        </aside>

    );
}

export default Footer;