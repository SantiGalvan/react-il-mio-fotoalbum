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
    const [photosNotValid, setPhotosNotValid] = useState();
    const [abstractDescription, setAbstractDescription] = useState();

    const fetchPhotos = async () => {
        let data = {
            limit: 40,
            user: ''
        };

        if (!user.isSuperAdmin) data.user = true

        const res = await axios.get('/photos', { params: data });
        const newPhotos = res.data.data;
        setPhotos(newPhotos);

        // Se ci sono foto da validare le inserisco in questa variabile
        const newPhotosToValidated = newPhotos.filter(photo => photo.validated === false);
        setPhotosNotValid(newPhotosToValidated);
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

    const formattedDate = (dateToFormatted) => {
        const date = new Date(dateToFormatted);

        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');

        const italianDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

        return italianDate;
    }

    const getAbstractDescription = () => {

        const photodescriptions = photosNotValid?.map(photo => photo.description);
        const photoToAbstract = photodescriptions?.filter(photo => photo.length > 40);

        if (photoToAbstract) {

            let newContent = [];

            for (let i = 0; i < photoToAbstract.length; i++) {
                const abstract = photoToAbstract[i].toString().substr(0, 40) + '...';
                newContent.push(abstract);
            }

            setAbstractDescription(newContent ? newContent : []);
        }
    }

    useEffect(() => {
        fetchPhotos();
        fetchMessages();
    }, [])

    return (
        <section className="container">
            <div className="row">

                <h1 className="text-center title">Benvenuto {user.name}</h1>

                {photosNotValid?.length !== 0 &&
                    <div className="col-12" >
                        <div className="card p-4 my-3">
                            <h3 className="text-center pb-2">Foto da validare</h3>

                            <div className="card p-4">


                                <table className="table table-dark mb-0">
                                    <thead>
                                        <tr>

                                            <th scope="col">id</th>
                                            <th scope="col">Titolo</th>
                                            <th scope="col">Descrizione</th>
                                            <th scope="col">Visibile</th>
                                            <th scope="col">Fotografo</th>
                                            <th scope="col">Data</th>
                                            <th scope="col"></th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {photosNotValid?.map(photo =>
                                        (<tr key={`photo-${photo.id}`}>
                                            <th scope="row">{photo.id}</th>
                                            <td>{photo.title}</td>

                                            {abstractDescription ?
                                                <td>{abstractDescription}</td> :
                                                <td>{photo.description}</td>
                                            }

                                            <td>{photo.visible ? 'Si' : 'No'}</td>
                                            <td>{photo.user.name}</td>
                                            <td>{formattedDate(photo.createdAt)}</td>
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
                }

                <div className="col-7">

                    <div className="card p-4 my-3">

                        {user.isSuperAdmin ?
                            <h3 className="text-center pb-2">Tutte le foto</h3> :
                            <h3 className="text-center pb-2">Le tue foto</h3>
                        }

                        <div className="card p-4">

                            {photos?.length !== 0 ?
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
                                </table> :
                                <div className="text-center d-flex align-items-center justify-content-center flex-column">
                                    <h4>Non ci sono foto, creane subito una premendo l'apposito bottone</h4>
                                    <Link to={`/photos/create`} className='btn btn-success d-flex align-items-center justify-content-center gap-1'><Plus />Crea</Link>
                                </div>
                            }

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

                                    {messages?.length !== 0 ?
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
                                        </table> :
                                        <div className="text-center">
                                            <h4>Non ci sono messaggi</h4>
                                        </div>
                                    }

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
                    logoutMode={logoutMode}
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