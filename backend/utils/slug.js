const generateSlug = (title, list) => {

    // Controllo il title
    if (!title) throw new Error("Title è obbligatorio");
    if (typeof title !== 'string') throw new Error('Title deve essere una stringa!');

    // Controllo l'array/oggetto
    if (!list) throw new Error('Inserisci la lista');

    let baseSlug = '';

    // Ternario per determinare come settare lo slug
    title.includes(' ') ? baseSlug = title.toLowerCase().replaceAll(' ', '-') : baseSlug = title.toLowerCase();

    // Recupero tutti gli slug
    const slugs = list.map(l => l.slug);

    // Contatore
    let counter = 1;

    let slug = baseSlug;

    // Giro su tutti gli slug precedentemente recuperati, se già presente aggiungo un numero alla fine
    while (slugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    // Restituisco lo slug
    return slug;
}

module.exports = generateSlug;