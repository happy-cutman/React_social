const SEND_MESSAGE = 'SEND-MESSAGE';

let inintialState = {
    dialogs: [
        {
            id: '1',
            name: 'Nika',
            ava: 'https://papermilkdesign.com/images/circle-clipart-instagram-profile-10.png'
        },
        {
            id: '2',
            name: 'Gugusik',
            ava: 'https://img2.freepng.ru/20180623/atf/kisspng-monochrome-photography-black-and-white-silhouette-cartoon-panda-5b2dfa032b6834.8879112315297397791778.jpg'
        },
        {
            id: '3',
            name: 'Sasha',
            ava: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSVN8rYSCbXzeODWci-ijqUNzbeU1CePRNJPZbayKE1QHONrMDp'
        },
        {
            id: '4',
            name: 'Stepan',
            ava: 'https://toleranten.files.wordpress.com/2011/03/homer-simpson-400x300.jpg'
        },
        {
            id: '5',
            name: 'Vitaliy',
            ava: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSrAeGz_9eu03ba9hh6Ltzg0LQX_9KrL85H_c2wB0esA1Pd3C78'
        }
    ],
    messages: [
        {id: '1', message: 'Hi'},
        {id: '2', message: 'How are you?'},
        {id: '3', message: 'Hello its me'},
        {id: '4', message: 'Where are your happy?'},
        {id: '5', message: 'The weather is fine'},
    ],
};

const messagesReducer = (state = inintialState, action) => {

    switch (action.type) {

        case SEND_MESSAGE:
            return {
                ...state,
                newMessage: '',
                messages: [...state.messages, {id: '6', message: action.newMessageText}], // создаём новый массив [, с левой стороны закидываем все элементы messages из старого массива, справа добавляем ещё один элемент в массив]
            };

        default:
            return state;
    }
};

export const sendMessageCreator = (newMessageText) => ({type: SEND_MESSAGE, newMessageText});

export default messagesReducer;