let lender=[
    {
        _id: "1345asdfasd1",
        name: "veilhelm alexander Guarin",
        email: "me@veilhelmalexander.com",
        password: "1qsdf123423ñlksdfñlakjsfñ",
        passwordEncrypted: true,
        scores: ["13241asf324","413asdf41","13452asdf34","22adsadffa23"],
        averageScore: 4.7,
        notifications: "dsf1wrqdfas134",
        spaces: ["jñkljlñklkj141","nbnbn34141432"],
    },
    {
        _id: "1345dfa1",
        name: "Amelia Gomez Perez",
        email: "AmeliaPerez@gmail.com",
        password: "1qsdf123423ñlksd3423jsfñ",
        passwordEncrypted: true,
        scores: ["asddsfd343","afafd334234","daadfsfsad34","ghjjhf4434"],
        averageScore: 4.2,
        notifications: "sggsf3223455",
        spaces: ["mjkhlh1234"],
    },
    {
        _id: "fdaf234",
        name: "Diego Ardila",
        email: "diego@gmail.com",
        password: "asdfasdf143514",
        passwordEncrypted: true,
        scores: ["asdfa134513451","adgasd345"],
        averageScore: 4.1,
        notifications: "dsf1wrqdfas134",
        spaces: ["ñhljkhlkjh13432"],
    },
]


let tenant=[
    {
        _id: "adsfñk245",
        name: "Sara Valentina",
        email: "sara@gmail.com",
        password: "adñkl145134123",
        passwordEncrypted: true,
        scores: ["adfjkñ2345", "adsfadf3353", "añsdñ41351123"],
        averageScore: 4.1,
        currentSPaces: [],
        reservedSpaces: ["jñkljlñklkj141"],
        usedSpaces: ["nbnbn34141432", "mjkhlh1234", "ñhljkhlkjh13432"],
        notifications: "adlkfj134"
    },
    {
        _id: "adñflkjds134",
        name: "michelle Karlz",
        email: "michelle@gmail.com",
        password: "1q3423ñlksdfñlakjsfñas",
        passwordEncrypted: true,
        scores: ["adfjkñ2345"],
        averageScore: 4.1,
        currentSPaces: [],
        reservedSpaces: [],
        usedSpaces: ["nbnbn34141432"],
        notifications: "ñlk245"
    },
    {
        _id: "afasdfa23l76",
        name: "amy Martinez",
        email: "amy@gmail.com",
        password: "1qsdf1dfñlakjsfñ",
        passwordEncrypted: true,
        scores: [],
        averageScore: null,
        currentSPaces: [],
        reservedSpaces: [],
        usedSpaces: [],
        notifications: "90145lkjadf"
    },
]

let spaces=[
    {
        _id: "jñkljlñklkj141",
        area: 12,
        width: 2,
        length: 2,
        height: 3,
        pricePerMeterPerDay: 25000,
        spaceTags: ["adsfa134","fdf13413","adfj24511"],
        datesReserved: "13afdgafasdf",
        photos: ["http://www.aws.s3.com/131ñlksfads", "http://www.aws.s3.com/123413asfdad", "http://www.aws.s3.com/adf134134", "http://www.aws.s3.com/hggf5"],
        aditionalInfo: "it is really cold area without cooling",
        lenderId: "1345asdfasd1",
        inventory:"aldsfjh4534",
        location: {
            long:123413,
            latt:1345145
        }
    },
    {
        _id: "nbnbn34141432",
        area: 400,
        width: 20,
        length: 5,
        height: 4,
        pricePerMeterPerDay: 20000,
        spaceTags: ["adsfa134","fdf13413","ñkjlñkj1234","ajklsdfñ134"],
        datesReserved: "13afdgfddgfadfdf",
        photos: ["http://www.aws.s3.com/gqr4gr", "http://www.aws.s3.com/sfg24355", "http://www.aws.s3.com/fads4543", "http://www.aws.s3.com/gjhkkg3456"],
        aditionalInfo: "The entrance is really small so I don´t think large objects is a good idea",
        lenderId: "1345asdfasd1",
        inventory: "hjlkh134315"
    },
    {
        _id: "mjkhlh1234",
        area: 16,
        width: 4,
        length: 2,
        height: 2,
        pricePerMeterPerDay: 1000,
        spaceTags: ["adsfa134"],
        datesReserved: "14efre1jgd23",
        photos: ["http://www.aws.s3.com/131ñlksfads", "http://www.aws.s3.com/123413asfdad", "http://www.aws.s3.com/adf134134", "http://www.aws.s3.com/hggf5"],
        aditionalInfo: "the sun hits the space directly in the afternoons",
        lenderId: "1345dfa1",
        inventory: "lkghghkjjh1324"
    },
    {
        _id: "ñhljkhlkjh13432",
        area: 16,
        width: 4,
        length: 2,
        height: 2,
        pricePerMeterPerDay: 1000,
        spaceTags: ["adsfa134"],
        datesReserved: "1j345lhlsd145",
        photos: ["http://www.aws.s3.com/131ñlksfads", "http://www.aws.s3.com/123413asfdad", "http://www.aws.s3.com/adf134134", "http://www.aws.s3.com/hggf5"],
        aditionalInfo: "the sun hits the space directly in the afternoons",
        lenderId: "fdaf234",
        inventory: "zxzcxvzkjhl124"
    }
]

<<<<<<< HEAD
let notifications=[
    {id: 1,
    userId: 1,
    eventsId: [{eventId:1},{eventId:3}],
    chatId: 1
    },
    {id: 2,
    userId: 2,
    eventId: [{eventId:2},{eventId:3}],
    chatId: 1
    },
    {id: 3,
    userId: 3,
    eventId: [{eventId:1},{eventId:2}],
    chatId: 2
    },
    {id: 4,
    userId: 2,
    eventId: [{eventId:1},{eventId:3}],
    chatId: 1
    },
];

let inventory=[
    {id:1,
    spaceId:1,
    productsId:[{productId:1},{productId:2}]
    },
    {id:2,
    spaceId:2,
    data:[{productId:2},{productId:4},{productId:1}]
    },
    {id:3,
    spaceId:3,
    data:[{productId:3}]
    },
    {id:4,
    spaceId:4,
    data:[{productId:3},{productId:4}]
=======
let spacesTags=[
    {
        _id: "adsfa134",
        tag: "dark space",
        description: "dark area with low or no ilumination"
    },
    {
        _id: "fdf13413",
        tag: "hot area",
        description: "high temperatures in the area up to 36 degrees celcious"
    },
    {
        _id: "adfj24511",
        tag: "cold area",
        description: "low temperatures in the area from 0 degrees celcious"
    },
    {
        _id: "ñkjlñkj1234",
        tag: "big load",
        description: "space adecuate for storing big objects and load inventory"
    },
    {
        _id: "ajklsdfñ134",
        tag: "heavy load",
        description: "space adecuate for storing heavy objects (more than 100Kg)"
    }
]

let datesReserved = [
    {
        _id:"13afdgafasdf",
        dates: [
            {
                day: 19,
                month: 0
            },
            {
                day: 20,
                month: 0
            },
            {
                day: 21,
                month: 0
            },
            {
                day: 22,
                month: 0
            },
            {
                day: 23,
                month: 0
            },
            {
                day: 24,
                month: 0
            },
            {
                day: 25,
                month: 0
            },
            {
                day: 12,
                month: 2
            },
            {
                day: 13,
                month: 2
            },
            {
                day: 14,
                month: 2
            },
            {
                day: 15,
                month: 2
            },
        ]
    },
    {
        _id:"13afdgfddgfadfdf",
        dates: [
            {
                day: 19,
                month: 0
            },
            {
                day: 20,
                month: 0
            },
            {
                day: 21,
                month: 0
            },
            {
                day: 22,
                month: 0
            },
            {
                day: 23,
                month: 0
            },
            {
                day: 24,
                month: 0
            },
            {
                day: 25,
                month: 0
            },
            {
                day: 12,
                month: 2
            },
            {
                day: 13,
                month: 2
            },
            {
                day: 14,
                month: 2
            },
            {
                day: 15,
                month: 2
            },
        ]
    },
    {
        _id:"14efre1jgd23",
        dates: [
            {
                day: 19,
                month: 0
            },
            {
                day: 20,
                month: 0
            },
            {
                day: 21,
                month: 0
            },
            {
                day: 22,
                month: 0
            },
            {
                day: 23,
                month: 0
            },
            {
                day: 24,
                month: 0
            },
            {
                day: 25,
                month: 0
            },
            {
                day: 12,
                month: 2
            },
            {
                day: 13,
                month: 2
            },
            {
                day: 14,
                month: 2
            },
            {
                day: 15,
                month: 2
            },
        ]
    },
    {
        _id:"1j345lhlsd145",
        dates: [
            {
                day: 19,
                month: 0
            },
            {
                day: 20,
                month: 0
            },
            {
                day: 21,
                month: 0
            },
            {
                day: 22,
                month: 0
            },
            {
                day: 23,
                month: 0
            },
            {
                day: 24,
                month: 0
            },
            {
                day: 25,
                month: 0
            },
            {
                day: 12,
                month: 2
            },
            {
                day: 13,
                month: 2
            },
            {
                day: 14,
                month: 2
            },
            {
                day: 15,
                month: 2
            },
        ]
>>>>>>> 57b18b522256182a37df5e9f3bb35d2d6c195af6
    }
]

let notifications=[{}];

let inventory=[{}];

let scores=[{}];

let chats=[{}];

let events=[
    {
        id: 1,
        event:"event 1",
        id_notifications : [{
            id_notificatio : 1,    
            id_notificatio : 3,    
        }]
    },
 
    {
        id: 2,
        event:"event 2",
        id_notifications : [{
            id_notificatio : 2,    
            id_notificatio : 4
        }],
    },
    {
        id: 3,
        event:"event 3",
        id_notifications : [{
            id_notificatio : 1,
            id_notificatio : 2,
            id_notificatio : 3,
            id_notificatio : 4
        }]
    },
]

let productsElementsObjects=[
    {
        id:1,
        object:"television",
        category:"electronic",
        units:1
    },
    {
        id:2,
        object:"fruts",
        category:"organic",
        units:10
    },
    {
        id:3,
        object:"steel sheets",
        category:"metal",
        units:4
    },
    {
        id:4,
        object:"wood sheets",
        category:"organic",
        units:30
    },

]

let scoresCriterias=[
    {
        id: 1,
        score :"organic",
    },
    {
        id:2,
        score:"plastic"
    },
    {
        id:3,
        score:"chemical"
    },
    {
        id:4,
        score:"metal"
    }
]