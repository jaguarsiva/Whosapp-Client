import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.scss';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyBPZqCe950gqEScRw7VklwzuzOSVf81Qac',
	authDomain: 'whosapp-2c58f.firebaseapp.com',
	projectId: 'whosapp-2c58f',
	storageBucket: 'whosapp-2c58f.appspot.com',
	messagingSenderId: '242627069039',
	appId: '1:242627069039:web:e8998e8bc3cac16993f99a',
	measurementId: 'G-E73KHM0MXG'
};

initializeApp(firebaseConfig);

const app = createApp(App);
app.use(router);
app.use(store);
app.mount('#app');
