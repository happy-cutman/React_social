import profileReducer from './profile_reducer';
import messagesReducer from './messages_reducer';
import sideBarReducer from './sidebar_reducer';

let store = {
    _state: {
        profilePage: {
            posts: [
                {id: '1', message: 'Hello. It is me', like: '31'},
                {id: '2', message: 'Hi, darling', like: '5'},
                {id: '3', message: 'Wonderful life', like: '12'},
                {id: '4', message: 'Arom dom dom', like: '1'},
            ],

            newPostText: 'IT-Koshka',
        },

        messagesPage: {
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
            newMessage: 'IT-koshka',
        },

        sideBar: [
            {id: '1', name: 'Nika', ava: 'https://papermilkdesign.com/images/circle-clipart-instagram-profile-10.png'},
            {
                id: '2',
                name: 'Sasha',
                ava: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSVN8rYSCbXzeODWci-ijqUNzbeU1CePRNJPZbayKE1QHONrMDp'
            },
            {id: '3', name: 'Stepan', ava: 'https://toleranten.files.wordpress.com/2011/03/homer-simpson-400x300.jpg'},
        ]
    },
    _callSubscriber() {
        alert('State changed')
    },

    getState() {
        return this._state
    },
    subscribe(observer) {
        this._callSubscriber = observer;
    },


    dispatch(action) {
        // делегировали преобразование веток state редюсерам, и уведомили подписчика
        this._state.profilePage = profileReducer(this._state.profilePage, action); // отправляем в reducer только то, что ему нужно. reducer преобразовывает profilePage и возвращает новый profilePage, и присваивает в левую часть. Т.е state обновтлся
        this._state.messagesPage = messagesReducer(this._state.messagesPage, action);
        this._state.sideBar = sideBarReducer(this._state.sideBar, action);

        this._callSubscriber(this._state)
    }
};

export default store;
window.store = store;


