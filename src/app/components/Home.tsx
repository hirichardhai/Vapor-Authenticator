import React, { useState } from "react";
import Logo from "../screens/vapor.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGamepad } from "@fortawesome/free-solid-svg-icons";

export default function Home(props) {
    
    const [value, setValue] = useState(0); // Dud state to force update after making an account idle / de-idle

    const playingGames = props.accountsIdling[props.user.steamid] || false;

    return (<div className="m-2 flex flex-wrap">
        <div className="mx-4 font-bold text-2xl w-full text-white">Home</div>
        <div className="m-4 mt-2 p-4 flex w-full justify-center border-b border-white">
            <img src={Logo} className="h-36 w-36" />
        </div>

        {/* Idle games button */}
        <div className={`m-2 ml-4 p-12 rounded bg-white font-bold cursor-pointer relative overflow-hidden ${playingGames ? "bg-yellow-500" : "bg-green-500"}`} onClick={() => {
            window["electron"].currentUser.playGames((playingGames) ? [] : null).then(() => {
                props.accountsIdling[props.user.steamid] = !playingGames;
                props.setAccountsIdling(props.accountsIdling);
                setValue(value + 1); // Used to rerender component
            });
        }}>
            <FontAwesomeIcon icon={faGamepad} transform={{ rotate: 42 }} size="10x" className="absolute bottom-0 right-0 opacity-20" />
            {playingGames ? "Stop Idling" : "Play All Games"}
        </div>        
    </div>)
}