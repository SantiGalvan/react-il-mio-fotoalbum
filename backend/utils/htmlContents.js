// Content dell'email da inviare al super admin per validare un nuovo post
const emailToValidate = (user, object) => {
    return `
<!DOCTYPE html>
<html lang="es">
<style>
    html {
        background-color: white;
    }

    body {
        max-width: 600px;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        margin: auto;
        background-color: rgb(229, 255, 246);
        padding: 40px;
        border-radius: 4px;
        margin-top: 10px;
    }
</style>

<body>
    <h1>Validazione foto creata da ${user.name}</h1>
    <p>${user.isAdmin ? 'L\'Admin:' : 'Lo user:'} ${user.name} ha appena caricato una nuova foto.</p>
    <p>Validare la nuova foto con titolo: ${object.name}?
    <a href='http://localhost:5173/photos/${object.slug}' target="_blank" rel="noopener noreferrer">Premi qui per controllare</a>.</p>
</body >

</html >
`
}

module.exports = emailToValidate;