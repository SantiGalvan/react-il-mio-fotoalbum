import { FaRegTrashCan as Trash } from "react-icons/fa6";
import { BsFillPencilFill as Pencil } from "react-icons/bs";

const MessagesTable = ({ messages, onDelete }) => {
    return (
        <table className="table table-dark">
            <thead>
                <tr>
                    <th scope="col">Email</th>
                    <th scope="col">Content</th>
                    <th scope="col">User Name</th>
                    <th scope="col">User Email</th>
                    <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {messages?.map((message, index) => (
                    <tr key={`message-${index}`}>

                        <th scope="row">{message.email}</th>

                        <td>{message.content}</td>

                        <td>{message.user.name}</td>

                        <td>{message.user.email}</td>

                        <td>

                            <div className='d-flex gap-2'>

                                <button className='btn btn-sm btn-warning d-flex align-items-center justify-content-center'><Pencil /></button>

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