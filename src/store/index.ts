import { createStore } from 'vuex';
import user from './modules/user';
import notification from './modules/notification';

const store = createStore({
    modules: {
        user,
        notification
    }
});

export default store;