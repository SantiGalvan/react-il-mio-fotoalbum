const formattedDate = require("./formattedDate")

// Content dell'email da inviare al super admin per validare un nuovo post
const emailToValidate = (user, object) => {
    return `
<!DOCTYPE html>
<html lang="it">

<body>
    <h1>Validazione foto creata da ${user.name}</h1>
    <p>${user.isAdmin ? 'L\'Admin:' : 'Lo user:'} ${user.name} ha appena caricato una nuova foto.</p>
    <p>Validare la nuova foto con titolo: ${object.title}?
    <a href='http://localhost:5173/photos/${object.slug}' target="_blank" rel="noopener noreferrer">Premi qui per controllare</a>.</p>
</body >

</html >
`
}

const emailToChangeValidate = object => {
    if (object.validated) {

        return `
    <!DOCTYPE html>
    <html lang="it">
    
    <body>
        <h1>Foto validata</h1>
        <p>La tua foto ${object.title} creata il ${formattedDate(object.createdAt)} è stata validata dal Super Admin</p>
        <p>Per vederla clicca il link
            <a href='http://localhost:5173/photos/${object.slug}' target="_blank" rel="noopener noreferrer">
                ${object.title}
            </a>.
        </p>
    </body>
    
    </html>
    `

    } else {

        return `
    <!DOCTYPE html>
    <html lang="it">

    <body>
        <h1>Foto non validata</h1>
        <p>La tua foto ${object.title} creata il ${formattedDate(object.createdAt)} è stata rifiutata dal Super Admin</p>
        <p>Prova a modificarla per renderla consona alla validazione</p>
    </body>

    </html>
    `

    }
}

const emailToDelete = (user, object) => {
    return `
    <!DOCTYPE html>
    <html lang="it">

    <body>
        <h1>Foto Eliminata</h1>
        <p>La tua foto ${object.title} creata il ${formattedDate(object.createdAt)} è stata eliminata dal Super Admin ${user.name}</p>
        <p>Prova a contattare l'admin, anche a questa email per eventuali motivazioni</p>
        <p>Grazie</p>
        <p>Super Admin ${user.name}</p>
    </body>

    </html>
`
}

const emailToSuperAdminUpdate = (user, object) => {
    return `
    <!DOCTYPE html>
    <html lang="it">

    <body>
        <h1>Foto Modificata dal Super Admin</h1>
        <p>La tua foto ${object.title} creata il ${formattedDate(object.createdAt)} è stata modificata dal Super Admin ${user.name}</p>
        <p>Prova a contattare l'admin, anche a questa email per eventuali motivazioni</p>
        <p>Grazie</p>
        <p>Super Admin ${user.name}</p>
    </body>

    </html>
`
}

const emailToUpdate = (user, object) => {
    return `
    <!DOCTYPE html>
    <html lang="it">

    <body>
        <h1>Foto ${object.title} modificata da ${user.name}</h1>
        <p>La foto ${object.title} creata il ${formattedDate(object.createdAt)} è stata modificata da ${user.name}</p>
        <p>Controlla che le modifiche siano consone a gli standard del sito</p>
        <p>Per vedere l'immagine 
            <a href='http://localhost:5173/photos/${object.slug}' target="_blank" rel="noopener noreferrer">
                clicca qui
            </a>
        </p>
    </body>

    </html>
`
}

const emailToMessage = object => {
    return `
    <!DOCTYPE html>
    <html lang="it">

    <body>
        <h1>Messaggio ricevuto da ${object.email}</h1>
        <p>${object.content}</p>
        <p>Per controllare il messaggio 
            <a href='http://localhost:5173/messages/${object.id}' target="_blank" rel="noopener noreferrer">
                clicca qui
            </a>
        </p>
    </body>

    </html>
`
}

module.exports = { emailToValidate, emailToChangeValidate, emailToDelete, emailToSuperAdminUpdate, emailToUpdate, emailToMessage };