
import { signoutFirebase } from '@/services/firebase.js';

export default {
    namespaced: true,
    state: {
        user: null as string | null,
        isLoggedIn: false,
        chat: null as string | null
    },
    mutations: {
        SET_USER( state, user: string | null ) {
            state.user = user;
        },
        SET_ISLOGGEDIN( state, isLoggedIn: boolean ) {
            state.isLoggedIn = isLoggedIn;
        },
        SET_CHAT( state, chat: string | null ) {
            state.chat = chat;
        }
    },
    actions: {
        login({ commit }, user: string) {
            commit( 'SET_USER', user );
            commit( 'SET_ISLOGGEDIN', true );
        },
        logout({ commit }) {
            localStorage.removeItem('user');
            commit( 'SET_USER', null );
            commit( 'SET_ISLOGGEDIN', false );
            signoutFirebase();
        },
        setChat({ commit }, chat: string | null) {
            commit( 'SET_CHAT', chat );
        }
    }
};