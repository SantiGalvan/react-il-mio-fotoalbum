import { useEffect, useState } from "react";
import { FaRegTrashCan as Trash } from "react-icons/fa6";
import { FaRegEye as FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const MessagesTable = ({ messages, onDelete }) => {

    const [abstractMessage, setAbstractMessage] = useState();

    const getAbstractMessage = () => {

        const messageContents = messages?.map(message => message.content);
        const messageToAbstract = messageContents?.filter(message => message.length > 40);

        if (messageToAbstract) {

            let newContent = [];

            for (let i = 0; i < messageToAbstract.length; i++) {
                const abstract = messageToAbstract[i].toString().substr(0, 40) + '...';
                newContent.push(abstract);
            }

            setAbstractMessage(newContent ? newContent : []);
        }
    }

    useEffect(() => {
        getAbstractMessage();
    }, [])

    return (

        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Content</th>
                    <th scope="col">User Name</th>
                    <th scope="col">User Email</th>
                    <th scope="col">Data</th>
                    <th scope="col"></th>
                </tr>
            </thead>

            <tbody>

                {messages?.map((message, index) => (
                    <tr key={`message-${index}`}>

                        <th scope="row">{message.email}</th>

                        {abstractMessage && <td>{message.content.length > 40 ? abstractMessage[index] : message.content}</td>}

                        <td>{message.user.name}</td>

                        <td>{message.user.email}</td>

                        <td>{message.createdAt}</td>

                        <td>

                            <div className='d-flex gap-2'>

                                <Link to={`/messages/${message.id}`} className='btn btn-sm btn-primary d-flex align-items-center justify-content-center'><FaEye /></Link>
                                <button onClick={() => { onDelete(message.id) }} className='btn btn-sm btn-danger d-flex align-items-center justify-content-center'><Trash /></button>

                            </div>

                        </td>

                    </tr>
                ))}

            </tbody>

        </table>
    )
}

export default MessagesTable;