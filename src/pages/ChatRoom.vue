<template>
	<div class="chat__top flex align-center">
		<div class="chat__avatar">
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
				<circle cx="16" cy="16" r="15" fill="#96d7ff" />
				<path
					fill="#86c3ef"
					d="M2.35 17A15 15 0 0 1 25.59 4.48a15 15 0 1 0-17.83 24A15 15 0 0 1 2.35 17Z"
				/>
				<path
					fill="#ffc661"
					d="M16 31a15 15 0 0 0 10.06-3.9 1.35 1.35 0 0 0 0-.29 6.64 6.64 0 0 0-6.27-4.52h-7.53A6.64 6.64 0 0 0 6 26.81a1.35 1.35 0 0 0 0 .29A15 15 0 0 0 16 31Z"
				/>
				<path
					fill="#e49f4e"
					d="M13 23.29h7.47a6.57 6.57 0 0 1 5.1 2.44 6.61 6.61 0 0 0-5.78-3.44h-7.53A6.64 6.64 0 0 0 6 26.81a1.35 1.35 0 0 0 0 .29c.25.22.51.43.77.63A6.64 6.64 0 0 1 13 23.29Z"
				/>
				<path
					fill="#ecc5b4"
					d="M18.7 15.83h-5.4a1 1 0 0 0-1 1v6.47a1 1 0 0 0 .45.83l2.7 1.8a1 1 0 0 0 1.1 0l2.7-1.8a1 1 0 0 0 .45-.83v-6.47a1 1 0 0 0-1-1Z"
				/>
				<path
					fill="#ecc5b4"
					d="M21.5 13.67h-11a3 3 0 0 0 0 6h11a3 3 0 0 0 0-6Z"
				/>
				<path
					fill="#f4dab7"
					d="M18.46 9.87h-4.92a3.49 3.49 0 0 0-3.49 3.49v3.36a5.95 5.95 0 0 0 11.9 0v-3.36a3.49 3.49 0 0 0-3.49-3.49Z"
				/>
				<path
					fill="#d6b5b0"
					d="M23.65 6.92h-7.2a6.41 6.41 0 0 0-6.4 6.4 1 1 0 0 0 1 1h7.2a6.41 6.41 0 0 0 6.4-6.4 1 1 0 0 0-1-1Z"
				/>
				<path
					fill="#bf9e99"
					d="M16.67 8h7.2a1 1 0 0 1 .76.37v-.49a1 1 0 0 0-1-1h-7.2a6.41 6.41 0 0 0-6.4 6.4 1 1 0 0 0 .24.63A6.42 6.42 0 0 1 16.67 8Z"
				/>
			</svg>
		</div>
        <h2 class="chat__name">
            {{ roomID.split('@')[0] }}
        </h2>
		<div class="dropdown__outer" @click.stop>
			<button class="btn options__btn flex-center" @click="toggleDropdown">
				<svg viewBox="0 0 24 24" width="24" height="24" class="">
					<path
						fill="currentColor"
						d="M12 7a2 2 0 1 0-.001-4.001A2 2 0 0 0 12 7zm0 2a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 9zm0 6a2 2 0 1 0-.001 3.999A2 2 0 0 0 12 15z"
					></path>
				</svg>
			</button>
			<div class="dropdown__box flex-col" v-if="isDropdownOpen">
				<button class="btn">
					Delete chat
				</button>
			</div>
		</div>
	</div>
	<div class="chat__body">
		<div class="chat__bg"></div>
		<div class="chat__contents">
			<div class="message__row flex align-center" v-for="(message, index) in messages" :key="index">
				<span
					class="message__text"
					:class="{ 'sender__message': message.isSender, 'receiver__message': !message.isSender }">
					{{ message.text  }}
					<span class="message__time">
						{{ message.time }}
					</span>
				</span>
			</div>
		</div>
	</div>
	<div class="chat__bottom">
		<form class="flex align-center" @submit.prevent="sendMessage">
			<input type="text" placeholder="Type a message" v-model="inputMessage" />
			<button type="sumbit" class="send__btn flex-center">
				<svg viewBox="0 0 24 24" width="24" height="24" class="">
					<path
						fill="currentColor"
						d="M1.101 21.757L23.8 12.028 1.101 2.3l.011 7.912 13.623 1.816-13.623 1.817-.011 7.912z"
					></path>
				</svg>
			</button>
		</form>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import { v4 } from 'uuid';
import { getDatabase, ref as firebaseRef, set, onValue } from 'firebase/database';
import messageType from '@/types/messageType';
import { getCurrentTime } from '@/helpers/getCurrentTime';

export default defineComponent({
	setup() {
		type msgType = {
			isSender: boolean,
			text: string,
			time: string
		};

		const messages = ref<msgType[]>([]);
		const isDropdownOpen = ref<boolean>(false);
		const inputMessage = ref<string>('');
		const store = useStore();
		const user = computed( () => store.state.user.user );
		const route = useRoute();
		const roomID = computed( () => route.params.id.toString() );
		let unsub: Function;
		const db = getDatabase();
		const receiverEmail = computed( () => {
			const emailFields = roomID.value.split('@');
			return emailFields[0] + '@' + emailFields[1].split('dot').join('.');
		});
		const collectionName = computed( () => {
			const sender = user.value.split('.')[0].split('@').join('');
			const receiver = receiverEmail.value.split('.')[0].split('@').join('');
			return [ sender, receiver ].sort().join('-');
		});

		async function sendMessage() {

			if( inputMessage.value === '' ) return;

			const database = getDatabase();
			const messageRef = firebaseRef( database, "chats/" + collectionName.value + '/' + v4() );

			const message: messageType = {
				sender: user.value,
				receiver: receiverEmail.value,
				text: inputMessage.value,
				time: new Date().toUTCString()
			};
			set( messageRef, message );
			inputMessage.value = '';
		}

		function setIsOpenFalsy() {
			isDropdownOpen.value = false;
		};

		function toggleDropdown() {
			isDropdownOpen.value = !isDropdownOpen.value;
			if( isDropdownOpen.value ) document.body.addEventListener( 'click', setIsOpenFalsy, { once: true });
		};

		onMounted( () => {
			const starCountRef = firebaseRef( db, "chats/" + collectionName.value );
			unsub = onValue( starCountRef, listenValueChange );
		});

		onUnmounted( () => {
			unsub();
		});

		watch( roomID, () => {
			unsub();
			const starCountRef = firebaseRef( db, "chats/" + collectionName.value );
			unsub = onValue( starCountRef, listenValueChange );
		});

		function listenValueChange( snapshot ) {
			if( snapshot.exists() ) {
				const data = snapshot.val();
				let result: messageType[] = Object.values( data );
				result = result.sort( (a: messageType, b: messageType) => {
					const aDate = new Date( a.time );
					const bDate = new Date( b.time );
					if( aDate < bDate ) return -1;
					else if( bDate < aDate ) return 1;
					else return 0;
				});
				messages.value = result.map( (message: messageType) => {
					return {
						isSender: message.sender === user.value,
						text: message.text,
						time: getCurrentTime( new Date(message.time) )
					}
				});
			}
			else
				messages.value = [];
		}

		return {
			messages, inputMessage,
			sendMessage,
			isDropdownOpen,
			toggleDropdown,
			roomID
		};
	}
});
</script>

<style lang="scss" scoped>
.chat__top {
	height: 60px;
	background-color: rgb(30, 36, 40);
    padding: 0 20px;
    position: relative;
    z-index: 5;
}

.chat__avatar {
    height: 40px;
    width: 40px;
}

.chat__name {
    font-size: rem(16);
    font-weight: 500;
    margin-left: 12px;
	text-transform: capitalize;
}

.dropdown__outer {
    margin-left: auto;
	position: relative;
}

.dropdown__box {
	position: absolute;
	right: 15px;
	width: 150px;
    padding: 9px 0;
    background-color: rgb(42, 47, 50);
    border-radius: 3px;
    box-shadow: rgba(0, 0, 0, 0.26) 0px 2px 5px 0px, rgba(0, 0, 0, 0.16) 0px 2px 10px 0px;
	transform-origin: top right;
	animation: scale 0.2s linear;

	.btn {
		height: 40px;
		text-align: left;
		padding: 0 15px;

		&:hover {
			background-color: rgb(32, 39, 43);
		}
	}
}

.chat__body {
	position: relative;
	z-index: 2;
	background: rgb(13, 20, 24);
	height: calc(100% - 120px);

	.chat__bg {
		position: sticky;
		top: 0; left: 0;
		width: 100%;
		height: 100%;
		background-image: url('@/assets/images/tile background.png');
		background-attachment: fixed;
		opacity: 0.1;
		z-index: -1;
	}

	.chat__contents {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		padding: 12px 0;
		overflow-y: scroll;
		overflow-y: overlay;
		z-index: 1;
	}
}

.message__row {
	margin-bottom: 18px;
	padding: 0 75px;
	min-height: 35px;
}

.message__text {
	padding: 6px 65px 8px 12px;
	position: relative;
	font-size: rem(14);
	line-height: 1.5;
	max-width: 350px;
	color: rgba(241, 241, 242, 0.95);

	&::before {
		content: '';
		position: absolute;
		width: 0;
		height: 0;
		top: 0;
		right: -12px;
	}
}

.sender__message {
	background-color: rgb(5, 97, 98);
	margin-left: auto;
	border-radius: 6px 0 6px 6px;

	&::before {
		border-bottom: 12px solid transparent;
		border-left: 12px solid rgb(5, 97, 98);
		border-top-right-radius: 5px;
		right: -8px;
	}
}

.receiver__message {
	background-color: rgb(38, 45, 49);
	border-radius: 0 6px 6px 6px;

	&::before {
		left: -8px;
		border-bottom: 12px solid transparent;
		border-right: 12px solid rgb(38, 45, 49);
		border-top-left-radius: 5px;
	}
}

.message__time {
	position: absolute;
	right: 9px;
	bottom: 2px;
	font-size: rem(11);
	color: rgba(241, 241, 242, 0.63);
}

.chat__bottom {
	height: 60px;
	background-color: rgb(30, 36, 40);

	form {
		height: 100%;
		padding: 0 15px;
	}

	input {
		flex-grow: 1;
		height: 40px;
		border-radius: 24px;
		border: 0;
		outline: 0;
		background-color: rgb(51, 56, 59);
		padding: 0 30px;
		color: $grey-text;
		font-weight: 400;
		font-size: rem(16);

		&::placeholder {
			font-weight: 300;
		}
	}
}

.send__btn {
	margin-left: 15px;
    height: 40px;
}
</style>
