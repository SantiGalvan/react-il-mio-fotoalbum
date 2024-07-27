import { AiFillMessage } from "react-icons/ai";

const MessageIcon = ({ setMessage }) => {


    return (
        <div className="message-icon">
            <AiFillMessage className="icon" onClick={setMessage} />
        </div>
    )
}

export default MessageIcon;