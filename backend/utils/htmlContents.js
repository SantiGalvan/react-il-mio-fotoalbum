const formattedDate = require("./formattedDate")

// Content dell'email da inviare al super admin per validare un nuovo post
const emailToValidate = (user, object) => {
    return `
<!DOCTYPE html>
<html lang="it">

<body>
    <h1>Validazione foto creata da ${user.name}</h1>
    <p>${user.isAdmin ? 'L\'Admin:' : 'Lo user:'} ${user.name} ha appena caricato una nuova foto.</p>
    <p>Validare la nuova foto con titolo: ${object.name}?
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

module.exports = { emailToValidate, emailToChangeValidate, emailToDelete };