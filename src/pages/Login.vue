<template>
	<header class="login__header">
		<div class="login__heading flex align-center">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="39"
				height="39"
				viewBox="0 0 39 39"
			>
				<path
					fill="#00E676"
					d="M10.7 32.8l.6.3c2.5 1.5 5.3 2.2 8.1 2.2 8.8 0 16-7.2 16-16 0-4.2-1.7-8.3-4.7-11.3s-7-4.7-11.3-4.7c-8.8 0-16 7.2-15.9 16.1 0 3 .9 5.9 2.4 8.4l.4.6-1.6 5.9 6-1.5z"
				></path>
				<path
					fill="#FFF"
					d="M32.4 6.4C29 2.9 24.3 1 19.5 1 9.3 1 1.1 9.3 1.2 19.4c0 3.2.9 6.3 2.4 9.1L1 38l9.7-2.5c2.7 1.5 5.7 2.2 8.7 2.2 10.1 0 18.3-8.3 18.3-18.4 0-4.9-1.9-9.5-5.3-12.9zM19.5 34.6c-2.7 0-5.4-.7-7.7-2.1l-.6-.3-5.8 1.5L6.9 28l-.4-.6c-4.4-7.1-2.3-16.5 4.9-20.9s16.5-2.3 20.9 4.9 2.3 16.5-4.9 20.9c-2.3 1.5-5.1 2.3-7.9 2.3zm8.8-11.1l-1.1-.5s-1.6-.7-2.6-1.2c-.1 0-.2-.1-.3-.1-.3 0-.5.1-.7.2 0 0-.1.1-1.5 1.7-.1.2-.3.3-.5.3h-.1c-.1 0-.3-.1-.4-.2l-.5-.2c-1.1-.5-2.1-1.1-2.9-1.9-.2-.2-.5-.4-.7-.6-.7-.7-1.4-1.5-1.9-2.4l-.1-.2c-.1-.1-.1-.2-.2-.4 0-.2 0-.4.1-.5 0 0 .4-.5.7-.8.2-.2.3-.5.5-.7.2-.3.3-.7.2-1-.1-.5-1.3-3.2-1.6-3.8-.2-.3-.4-.4-.7-.5h-1.1c-.2 0-.4.1-.6.1l-.1.1c-.2.1-.4.3-.6.4-.2.2-.3.4-.5.6-.7.9-1.1 2-1.1 3.1 0 .8.2 1.6.5 2.3l.1.3c.9 1.9 2.1 3.6 3.7 5.1l.4.4c.3.3.6.5.8.8 2.1 1.8 4.5 3.1 7.2 3.8.3.1.7.1 1 .2h1c.5 0 1.1-.2 1.5-.4.3-.2.5-.2.7-.4l.2-.2c.2-.2.4-.3.6-.5s.4-.4.5-.6c.2-.4.3-.9.4-1.4v-.7s-.1-.1-.3-.2z"
				></path>
			</svg>
			<h1>Whosapp Web</h1>
		</div>
	</header>
	<section class="login__body">
		<div class="login__window">
			<div class="window__top">
				<div class="form__contents">
					<h2>To use WhosApp on your machine:</h2>
					<ol>
						<li>
							<span>1. &nbsp; Have an Whosapp account, then login 😎</span>
							<form @submit.prevent="loginUser" class="login__form flex align-start">
								<div class="form__field">
									<input
										v-model="loginEmail"
										class="form__input"
										type="email"
										placeholder="Email"
										data-field="loginEmail"
										@input="handleChange"
									/>
									<p
										class="error__msg"
										v-show="isError.login.email"
										ref="loginEmailErrorElement"
									>
                            		</p>
								</div>
								<div class="form__field">
									<input
										v-model="loginPassword"
										class="form__input"
										type="password"
										placeholder="Password"
										data-field="loginPassword"
										@input="handleChange"
									/>
									<p
										class="error__msg"
										v-show="isError.login.password"
										ref="loginPasswordErrorElement"
									>
                            		</p>
								</div>
								<div class="form__field">
									<button type="submit" class="btn fancy-btn" ref="loginButton">
										Login
									</button>
								</div>
							</form>
						</li>
						<li>
							<span
								>2. &nbsp; No account! Chill, we got you covered
								as well 😉 </span
							>
							<form @submit.prevent="signupUser" class="signup__form flex align-start">
								<div class="form__field">
									<input
										v-model="signupEmail"
										class="form__input"
										type="email"
										placeholder="Email"
										data-field="signupEmail"
										@input="handleChange"
									/>
									<p
										class="error__msg"
										v-show="isError.signup.email"
										ref="signupEmailErrorElement"
									>
                            		</p>
								</div>
								<div class="form__field">
									<input
										v-model="signupPassword"
										class="form__input"
										type="password"
										placeholder="Password"
										data-field="signupPassword"
										@input="handleChange"
									/>
									<p
										class="error__msg"
										v-show="isError.signup.password"
										ref="signupPasswordErrorElement"
									>
                            		</p>
								</div>
								<div class="form__field">
									<button type="submit" class="btn fancy-btn" ref="signupButton">
										Signup
									</button>
								</div>
							</form>
						</li>
						<li>
							<span>3. &nbsp; Enjoy the clone! 🤡 </span>
						</li>
					</ol>
				</div>
				<div class="qr__code">
					<img
						src="@/assets/images/qrcode.jpg"
						alt="QR Code Whosapp"
					/>
				</div>
				<span class="help__msg">Need help to get started ?</span>
			</div>
			<div class="window__bottom flex-center">
			</div>
		</div>
	</section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { debounce } from '@/helpers/debounce';
import { signupFirebase, loginFirebase } from '@/services/firebase.js';
import notificationType from "@/types/notificationType";

export default defineComponent({
	setup() {
		const store = useStore();
		const router = useRouter();
		const loginEmail = ref<string>('');
		const loginPassword = ref<string>('');
		const signupEmail = ref<string>('');
		const signupPassword = ref<string>('');
		const loginButton = ref<HTMLButtonElement | null>(null);
		const signupButton = ref<HTMLButtonElement | null>(null);
		const loginEmailErrorElement = ref<HTMLParagraphElement | null>(null);
		const loginPasswordErrorElement = ref<HTMLParagraphElement | null>(null);
		const signupEmailErrorElement = ref<HTMLParagraphElement | null>(null);
		const signupPasswordErrorElement = ref<HTMLParagraphElement | null>(null);
        const isError = ref({
			login: {
				email: false,
				password: false
			},
			signup: {
				email: false,
				password: false
			}
		});

		const validateEmail = (email: string) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test( email );
		const handleChange = debounce( (event: InputEvent) => {
			const element = event.target as HTMLInputElement;
			const field = element.dataset.field!;
			const value = element.value;
			switch( field ) {
				case 'signupEmail': {
					isError.value.signup.email = true;
					if( !value ) signupEmailErrorElement.value!.innerText = 'Email required';
					else if( !validateEmail(value) ) signupEmailErrorElement.value!.innerText = 'Invalid email';
					else isError.value.signup.email = false;
					break;
				}
				case 'signupPassword': {
					isError.value.signup.password = true;
					if( !value ) signupPasswordErrorElement.value!.innerText = 'Password required';
					else if( value.length < 6 ) signupPasswordErrorElement.value!.innerText = 'Weak password';
					else isError.value.signup.password = false;
					break;
				}
				case 'loginEmail': {
					isError.value.login.email = true;
					if( !value ) loginEmailErrorElement.value!.innerText = 'Email required';
					else if( !validateEmail(value) ) loginEmailErrorElement.value!.innerText = 'Invalid email';
					else isError.value.login.email = false;
					break;
				}
				case 'loginPassword': {
					isError.value.login.password = true;
					if( !value ) loginPasswordErrorElement.value!.innerText = 'Password required';
					else if( value.length < 6 ) loginPasswordErrorElement.value!.innerText = 'Weak password';
					else isError.value.login.password = false;
					break;
				}
			}
		});

		async function loginUser() {
			if( loginEmail.value === '' ) {
                isError.value.login.email = true;
                loginEmailErrorElement.value!.innerText = 'Email required';
			}
			else if( loginPassword.value === '' ) {
                isError.value.login.password = true;
                loginPasswordErrorElement.value!.innerText = 'Password required';
			}

            if( isError.value.login.email || isError.value.login.password ) return;
			loginButton.value!.innerHTML = '<span class="spinner"></span>';

			// Api call is made and the user name is obtained from there
			const response = await loginFirebase( loginEmail.value, loginPassword.value );
			if( response.ok ) {
				const notification: notificationType = {
					type: 'success',
					message: 'Login successfull'
				};
				store.dispatch('notification/add', notification );
				const user = response.user;
				localStorage.setItem('user', JSON.stringify(user) );
				store.dispatch('user/login', user);
				loginEmail.value = loginPassword.value = '';
				router.push({ name: 'Home' });
			}
			else {
				const notification: notificationType = {
					type: 'error',
					message: response.message
				};
				store.dispatch('notification/add', notification );
				if( response.message === 'user not found' ) loginEmail.value = loginPassword.value = '';
				else if( response.message === 'wrong password' ) loginPassword.value = '';
			}
			loginButton.value!.innerHTML = 'Login';
        }

		async function signupUser() {
			if( signupEmail.value === '' ) {
                isError.value.signup.email = true;
                signupEmailErrorElement.value!.innerText = 'Email required';
			}
			else if( signupPassword.value === '' ) {
                isError.value.signup.password = true;
                signupPasswordErrorElement.value!.innerText = 'Password required';
			}

            if( isError.value.signup.email || isError.value.signup.password ) return;
			signupButton.value!.innerHTML = '<span class="spinner"></span>';
			const response = await signupFirebase( signupEmail.value, signupPassword.value );
			if( response.ok ) {
				const notification: notificationType = {
					type: 'success',
					message: 'Signup successfull. Now login'
				};
				store.dispatch('notification/add', notification );
				signupEmail.value = signupPassword.value = '';
			}
			else {
				const notification: notificationType = {
					type: 'error',
					message: response.message
				};
				store.dispatch('notification/add', notification );
			}
			signupButton.value!.innerHTML = 'Signup';
		}

		return {
			loginEmail, loginPassword,
			signupEmail, signupPassword,
			loginEmailErrorElement, loginPasswordErrorElement,
			signupEmailErrorElement, signupPasswordErrorElement,
            isError,
			loginButton, signupButton,
			loginUser, signupUser,
			handleChange
		};
	}
});
</script>

<style lang="scss" scoped>
.login__header {
	height: 222px;
	width: 100%;
	background-color: $header-green;
}

.login__heading {
	max-width: 1050px;
	margin: 0 auto;
	padding: 27px 0;

	svg {
		height: 39px;
		width: 39px;
		margin-right: 14px;
	}

	h1 {
		font-size: rem(14);
		font-weight: 500;
		text-transform: uppercase;
		color: #fff;
	}
}

.login__body {
	height: 900px;
	width: 100%;
	background-color: $app-bg;
}

.login__window {
	position: relative;
	top: -90px;
	background-color: #fff;
	border-radius: 3px;
	max-width: 910px;
	height: 100%;
	margin: 0 auto;
	box-shadow: 0 17px 50px 0 rgba(0, 0, 0, 0.19),
		0 12px 15px 0 rgba(0, 0, 0, 0.24);
}

.window__top,
.window__bottom {
	height: 450px;
	width: 100%;
}

.window__top {
	padding: 65px 60px;
	display: grid;
	grid-template-columns: 1fr 264px;
	row-gap: 50px;

	h2 {
		padding-top: 8px;
		font-weight: 200;
		color: #525252;
		font-size: rem(28);
	}
}

.qr__code {
	width: 264px;
	height: 264px;
	position: relative;
	isolation: isolate;

	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
}

.help__msg {
	color: teal;
	font-size: rem(14);
	font-weight: 300;
}

.consent__msg {
	label {
		font-size: rem(14);
		font-weight: 300;
		color: rgba(0, 0, 0, 0.45);
		margin-left: 6px;
		cursor: pointer;
	}

	input {
		accent-color: teal;
		cursor: pointer;
	}
}

.form__contents {
	li {
		margin-top: 18px;
	}

	span {
		font-size: rem(15);
		line-height: 1.8;
		font-weight: 400;
		color: #525252;
	}

	form {
		margin-top: 12px;
		padding-left: 22px;
	}

    .error__msg {
        font-size: rem(13);
        color: red;
        font-weight: 400;
        margin-top: 5px;
    }
}

.form__field {
	height: 50px;
}

.form__input {
	font-size: rem(14);
	font-weight: 400;
	width: 130px;
	height: 30px;
	border: 0;
	border-bottom: 1px solid rgba(0, 0, 0, 0.45);
	padding-left: 3px;
	margin-right: 15px;
	outline: 0;
	color: #525252;

	&::placeholder {
		color: rgba(0, 0, 0, 0.45);
	}

	&:focus,
	&:active {
		border-color: $header-green;
		box-shadow: 0 0.5px 0 0 $header-green;
	}
}

.btn {
	width: 75px;
	height: 30px;
	padding: 0 9px;
	text-transform: capitalize;
	background: $header-green;
	color: $white;
	border-radius: 4px;
	box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.25);

    &::after {
	    background-color: rgba(0, 0, 0, 0.25);
    }
}

.window__bottom {
	background-color: rgba(0, 0, 0, 0.05);
}

@media (max-width: 767px) {
	.login__window {
		top: 0;
	}

	.login__header, .login__body {
		height: auto;
	}

	.login__heading {
		padding-left: 50px;
		padding-right: 50px;
	}

	.window__top {
		display: flex;
		flex-direction: column;
		padding: 30px 20px;
		height: auto;

		h2 {
			font-size: rem(18);
			margin-bottom: 30px;
			text-align: center;
		}

		form {
			flex-wrap: wrap;
			justify-content: space-between;
		}

		.form__field {
			width: 48%;

			.form__input {
				width: 100%;
				margin-right: 0;
			}
		}

		.form__field:last-child {
			width: 100%;
			margin-top: 5px;

			.btn {
				width: 100%;
				height: 35px;
			}
		}
	}

	.qr__code {
		margin-left: auto;
		margin-right: auto;
	}

	.help__msg {
		text-align: center;
	}

}

</style>
