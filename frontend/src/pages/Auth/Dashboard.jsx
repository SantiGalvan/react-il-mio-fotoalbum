import { useAuth } from "../../contexts/AuthContext";
import DashboardCard from "../../components/Cards/DashboardCard";
import Modal from '../../components/Modal/Modal';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from '../../utils/axiosClient.js';
import { FaRegTrashCan as Trash } from "react-icons/fa6";
import { BsFillPencilFill as Pencil } from "react-icons/bs";
import { FaRegEye as FaEye } from "react-icons/fa";
import { FaPlus as Plus } from "react-icons/fa";

const Dashboard = () => {

    const { user, logout } = useAuth();

    const [logoutMode, setLogoutMode] = useState();
    const [deleteMode, setDeleteMode] = useState();
    const [elementToDelete, setElementToDelete] = useState();
    const [typeToDelete, setTypeToDelete] = useState();
    const [photos, setPhotos] = useState();
    const [messages, setMessages] = useState();

    const fetchPhotos = async () => {
        let data = {
            limit: 40,
            user: ''
        };

        if (!user.isSuperAdmin) data.user = true

        const res = await axios.get('/photos', { params: data });
        setPhotos(res.data.data);
    }

    const fetchMessages = async () => {
        const res = await axios.get('/messages', { params: { filteredUser: true } });
        setMessages(res.data);
    }

    const getElementToDelete = (key) => {
        setDeleteMode(true);

        let element;

        if (typeof key === 'number') {
            element = messages.filter(message => message.id === key);
            setTypeToDelete('message');
        }

        if (typeof key === 'string') {
            element = photos.filter(photo => photo.slug === key);
            setTypeToDelete('photo');
        }

        setElementToDelete(element);
        console.log(element);
    }

    const deleteElement = async () => {
        if (typeToDelete === 'message') {
            const res = await axios.delete(`/messages/${elementToDelete[0].id}`);

            fetchMessages()

            setDeleteMode(false);
        }

        if (typeToDelete === 'photo') {
            const res = await axios.delete(`/photos/${elementToDelete[0].slug}`);

            fetchPhotos();

            setDeleteMode(false);
        }
    }

    useEffect(() => {
        fetchPhotos();
        fetchMessages();
    }, [])

    return (
        <section className="container">
            <div className="row">

                <h1 className="text-center">Benvenuto {user.name}</h1>

                <div className="col-7">

                    <div className="card p-4 my-3">

                        <h3 className="text-center pb-2">Le tue foto</h3>

                        <div className="card p-4">

                            <table className="table table-dark mb-0">
                                <thead>
                                    <tr>
                                        <th scope="col">id</th>
                                        <th scope="col">Titolo</th>
                                        <th scope="col">Visibile</th>

                                        {user.isSuperAdmin && <th scope="col">Fotografo</th>}

                                        <th scope="col">
                                            <div className='d-flex justify-content-center'>
                                                <Link to={`/photos/create`} className='btn btn-sm btn-success d-flex align-items-center justify-content-center'><Plus /></Link>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {photos?.map(photo =>
                                    (<tr key={`photo-${photo.id}`}>
                                        <th scope="row">{photo.id}</th>
                                        <td>{photo.title}</td>
                                        <td>{photo.visible ? 'Si' : 'No'}</td>
                                        {user.isSuperAdmin && <td>{photo.user.name}</td>}
                                        <td>
                                            <div className='d-flex justify-content-center gap-2'>

                                                <Link to={`/photos/${photo.slug}`} className='btn btn-sm btn-primary d-flex align-items-center justify-content-center'><FaEye /></Link>
                                                <Link to={`/photos/${photo.slug}/edit`} className='btn btn-sm btn-warning d-flex align-items-center justify-content-center'><Pencil /></Link>
                                                <button onClick={() => { getElementToDelete(photo.slug) }} className='btn btn-sm btn-danger d-flex align-items-center justify-content-center'><Trash /></button>

                                            </div>
                                        </td>
                                    </tr>)
                                    )}

                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>

                <div className="col-5">

                    <div className="card p-4 my-3">

                        <div className="row g-3">

                            <div className="col-12">
                                <div className="card d-flex align-items-center flex-row justify-content-center gap-3 p-4">
                                    <button onClick={() => setLogoutMode(true)} className="btn btn-danger">Logout</button>
                                </div>
                            </div>

                            <div className="col-12">

                                <h3 className="text-center pb-2">I tuoi messaggi</h3>

                                <div className="card p-4">

                                    <table className="table table-dark mb-0">
                                        <thead>
                                            <tr>
                                                <th scope="col">id</th>
                                                <th scope="col">Email</th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>

                                            {messages?.map(message => (
                                                <tr key={message.id}>
                                                    <th scope="row">{message.id}</th>
                                                    <td>{message.email}</td>
                                                    <td>

                                                        <div className='d-flex justify-content-center gap-2'>

                                                            <Link to={`/messages/${message.id}`} className='btn btn-sm btn-primary d-flex align-items-center justify-content-center'><FaEye /></Link>
                                                            <button onClick={() => { getElementToDelete(message.id) }} className='btn btn-sm btn-danger d-flex align-items-center justify-content-center'><Trash /></button>

                                                        </div>

                                                    </td>
                                                </tr>
                                            ))}

                                        </tbody>
                                    </table>

                                </div>
                            </div>
                        </div>

                    </div>

                </div>

            </div>

            {logoutMode &&
                <Modal
                    isShow={logoutMode}
                    closeModal={() => setLogoutMode(false)}
                    title={user?.name}
                    clickLogout={logout}
                />
            }

            {deleteMode &&
                <Modal
                    isShow={deleteMode}
                    closeModal={() => setDeleteMode(false)}
                    title={typeToDelete === 'photo' ? elementToDelete[0].title : null}
                    message={typeToDelete === 'message' ? elementToDelete : null}
                    author={typeToDelete === 'photo' ? elementToDelete[0].user.name : null}
                    clickDelete={deleteElement}
                    deleteMode={true}
                />
            }

        </section>
    )
}

export default Dashboard;