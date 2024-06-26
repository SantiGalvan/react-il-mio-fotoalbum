const { PrismaClient } = require("@prisma/client");
const { hashPassword } = require("./utils/password");
const prisma = new PrismaClient();

const categories = [
    { id: 1, label: 'Landscape', slug: 'landscape', color: '#4CAF50' },
    { id: 2, label: 'Portrait', slug: 'portrait', color: '#2196F3' },
    { id: 3, label: 'Street Photography', slug: 'street-photography', color: '#FFC107' },
    { id: 4, label: 'Architecture', slug: 'architecture', color: '#FF5722' },
    { id: 5, label: 'Nature', slug: 'nature', color: '#9C27B0' },
    { id: 6, label: 'Wildlife', slug: 'wildlife', color: '#E91E63' },
    { id: 7, label: 'Sports', slug: 'sports', color: '#03A9F4' },
    { id: 8, label: 'Fashion', slug: 'fashion', color: '#795548' },
    { id: 9, label: 'Food', slug: 'food', color: '#607D8B' },
    { id: 10, label: 'Abstract', slug: 'abstract', color: '#FF9800' },
]

const users = [
    {
        id: 1,
        email: 'john.doe@example.com',
        name: 'John Doe',
        password: 'hashed_password_here',
        isAdmin: true,
        isSuperAdmin: false,
    },
    {
        id: 2,
        email: 'jane.smith@example.com',
        name: 'Jane Smith',
        password: 'hashed_password_here',
        isAdmin: false,
        isSuperAdmin: false,
    },
    {
        id: 3,
        email: 'michael.jones@example.com',
        name: 'Michael Jones',
        password: 'hashed_password_here',
        isAdmin: true,
        isSuperAdmin: false,
    },
    {
        id: 4,
        email: 'susan.white@example.com',
        name: 'Susan White',
        password: 'hashed_password_here',
        isAdmin: false,
        isSuperAdmin: false,
    },
    {
        id: 5,
        email: 'peter.parker@example.com',
        name: 'Peter Parker',
        password: 'hashed_password_here',
        isAdmin: false,
        isSuperAdmin: false,
    },
    {
        id: 6,
        email: 'emily.davis@example.com',
        name: 'Emily Davis',
        password: 'hashed_password_here',
        isAdmin: false,
        isSuperAdmin: false,
    },
    {
        id: 7,
        email: 'santi.galvan@example.com',
        name: 'Santi Galvan',
        password: 'hashed_password_here',
        isAdmin: true,
        isSuperAdmin: true,
    },
    {
        id: 8,
        email: 'laura.wilson@example.com',
        name: 'Laura Wilson',
        password: 'hashed_password_here',
        isAdmin: true,
        isSuperAdmin: false,
    },
    {
        id: 9,
        email: 'david.thompson@example.com',
        name: 'David Thompson',
        password: 'hashed_password_here',
        isAdmin: false,
        isSuperAdmin: false,
    },
    {
        id: 10,
        email: 'amy.harris@example.com',
        name: 'Amy Harris',
        password: 'hashed_password_here',
        isAdmin: true,
        isSuperAdmin: false,
    },
]

const messages = [
    {
        id: 1,
        content: 'Great shot! Really captures the essence of photography.',
        email: 'john.doe@example.com',
        userId: 1,
    },
    {
        id: 2,
        content: 'Love the composition in this photo!',
        email: 'jane.smith@example.com',
        userId: 9,
    },
    {
        id: 3,
        content: 'Awesome work! Keep it up.',
        email: 'michael.jones@example.com',
        userId: 3,
    },
    {
        id: 4,
        content: 'This photo tells a story. Well done!',
        email: 'susan.white@example.com',
        userId: 4,
    },
    {
        id: 5,
        content: 'Impressive photography skills!',
        email: 'peter.parker@example.com',
        userId: 7,
    },
]

const photos = [
    {
        id: 1,
        title: "Tramonto sul mare",
        slug: "tramonto-sul-mare",
        image: "tramonto.jpg",
        description: "Un suggestivo tramonto rosso sul mare con nuvole colorate",
        visible: true,
        categories: [1, 2],
        userId: 1,
    },
    {
        id: 2,
        title: "Ritratto di anziano contadino",
        slug: "ritratto-di-anziano-contadino",
        image: "ritratto.jpg",
        description: "Ritratto in bianco e nero di un anziano contadino con cappello",
        visible: true,
        categories: [3],
        userId: 2,
    },
    {
        id: 3,
        title: "Cascata tra i boschi",
        slug: "cascata-tra-i-boschi",
        image: "cascata.jpg",
        description: "Cascata immersa nei boschi con riflessi dell'acqua limpida",
        visible: true,
        categories: [1],
        userId: 3,
    },
    {
        id: 4,
        title: "Panorama urbano notturno",
        slug: "panorama-urbano-notturno",
        image: "panorama.jpg",
        description: "Panorama notturno della città con luci degli edifici e delle strade",
        visible: true,
        categories: [4, 5],
        userId: 1,
    },
    {
        id: 5,
        title: "Fiori di campo in primavera",
        slug: "fiori-di-campo-in-primavera",
        image: "fiori.jpg",
        description: "Colorati fiori di campo durante la stagione primaverile",
        visible: true,
        categories: [1],
        userId: 2,
    },
    {
        id: 6,
        title: "Riflessi al tramonto sul lago",
        slug: "riflessi-al-tramonto-sul-lago",
        image: "riflessi.jpg",
        description: "Riflessi dorati al tramonto sull'acqua calma di un lago",
        visible: true,
        categories: [1, 2],
        userId: 3,
    },
    {
        id: 7,
        title: "Architettura moderna di vetro",
        slug: "architettura-moderna-di-vetro",
        image: "architettura.jpg",
        description: "Architettura moderna con edificio di vetro e acciaio",
        visible: true,
        categories: [4],
        userId: 1,
    },
    {
        id: 8,
        title: "Ritratto di giovane donna",
        slug: "ritratto-di-giovane-donna",
        image: "ritratto2.jpg",
        description: "Ritratto di una giovane donna con sguardo sereno",
        visible: false,
        categories: [3],
        userId: 2,
    },
    {
        id: 9,
        title: "Paesaggio autunnale con foglie rosse",
        slug: "paesaggio-autunnale-con-foglie-rosse",
        image: "autunno.jpg",
        description: "Paesaggio autunnale con alberi dalle foglie rosse cadenti",
        visible: true,
        categories: [1, 2],
        userId: 3,
    },
    {
        id: 10,
        title: "Cielo stellato sopra le montagne",
        slug: "cielo-stellato-sopra-le-montagne",
        image: "cielo_stellato.jpg",
        description: "Cielo notturno stellato visto sopra le cime delle montagne",
        visible: true,
        categories: [1],
        userId: 1,
    },
    {
        id: 11,
        title: "Spiaggia al tramonto",
        slug: "spiaggia-al-tramonto",
        image: "spiaggia.jpg",
        description: "Spiaggia deserta con colori caldi al tramonto",
        visible: true,
        categories: [1, 2],
        userId: 2,
    },
    {
        id: 12,
        title: "Ritratto di bambina con fiore",
        slug: "ritratto-di-bambina-con-fiore",
        image: "ritratto3.jpg",
        description: "Ritratto di una bambina sorridente con un fiore in mano",
        visible: true,
        categories: [3],
        userId: 3,
    },
    {
        id: 13,
        title: "Foresta innevata",
        slug: "foresta-innevata",
        image: "foresta.jpg",
        description: "Paesaggio di una foresta innevata con alberi ricoperti di neve",
        visible: false,
        categories: [1, 2],
        userId: 1,
    },
    {
        id: 14,
        title: "Skyline della città di notte",
        slug: "skyline-della-citta-di-notte",
        image: "skyline.jpg",
        description: "Vista panoramica della skyline della città di notte con luci luminose",
        visible: true,
        categories: [4, 5],
        userId: 2,
    },
    {
        id: 15,
        title: "Campi di lavanda in Provenza",
        slug: "campi-di-lavanda-in-provenza",
        image: "lavanda.jpg",
        description: "Campi di lavanda in fiore nella regione della Provenza, Francia",
        visible: true,
        categories: [1],
        userId: 3,
    },
    {
        id: 16,
        title: "Riflessi sull'acqua di un fiume",
        slug: "riflessi-sull-acqua-di-un-fiume",
        image: "riflessi_fiume.jpg",
        description: "Riflessi sull'acqua calma di un fiume al tramonto",
        visible: true,
        categories: [1, 2],
        userId: 1,
    },
    {
        id: 17,
        title: "Architettura minimalista",
        slug: "architettura-minimalista",
        image: "architettura2.jpg",
        description: "Architettura moderna con design minimalista",
        visible: true,
        categories: [4],
        userId: 2,
    },
    {
        id: 18,
        title: "Ritratto di uomo anziano",
        slug: "ritratto-di-uomo-anziano",
        image: "ritratto4.jpg",
        description: "Ritratto in bianco e nero di un uomo anziano con barba",
        visible: true,
        categories: [3],
        userId: 3,
    },
    {
        id: 19,
        title: "Campagna toscana in primavera",
        slug: "campagna-toscana-in-primavera",
        image: "toscana.jpg",
        description: "Paesaggio della campagna toscana con campi verdi e cielo azzurro",
        visible: false,
        categories: [1, 2],
        userId: 1,
    },
    {
        id: 20,
        title: "Tramonto invernale sulla montagna",
        slug: "tramonto-invernale-sulla-montagna",
        image: "tramonto_invernale.jpg",
        description: "Tramonto invernale con colori caldi sulla cima di una montagna innevata",
        visible: true,
        categories: [1, 2],
        userId: 2,
    },
];

// Categorie
prisma.category.createMany({
    data: categories
})
    .then()
    .catch(err => console.error(err));

// User
users.forEach(async (user) => {
    const { id, email, name, password, isAdmin, isSuperAdmin } = user;

    const passwordDb = await hashPassword(password);

    const data = {
        id,
        email,
        name,
        password: passwordDb,
        isAdmin,
        isSuperAdmin
    };

    prisma.user.create({ data }).then().catch(err => console.error(err));
})

// Messaggi
prisma.message.createMany({
    data: messages
})
    .then()
    .catch(err => console.error(err));

// Photos
photos.forEach(photo => {

    const { id, title, slug, description, image, visible, userId, categories } = photo;

    const data = {
        id,
        title,
        slug,
        image,
        description,
        visible,
        userId,
        categories: { connect: categories.map(id => ({ id })) }
    }

    prisma.photo.create({ data }).then().catch(err => console.error(err));

})