<template>
	<header class="flex align-center">
		<div class="profile__picture">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				data-name="Layer 1"
				viewBox="0 0 64 64"
			>
				<circle cx="32" cy="32" r="27" fill="#27aae1" />
				<path
					fill="#262234"
					d="M48.75 53.16a26.94 26.94 0 0 1-33.5 0L16 50.5a9.12 9.12 0 0 1 8.79-6.5h14.42A9.12 9.12 0 0 1 48 50.5Z"
				/>
				<path
					fill="#ffd2b4"
					d="M36 39v5.76a2 2 0 0 1-1.11 1.8 6.46 6.46 0 0 1-5.78 0 2 2 0 0 1-1.11-1.8V39Z"
				/>
				<path
					fill="#fff"
					d="M36 44v.76a2 2 0 0 1-1.11 1.8 6.48 6.48 0 0 1-5.78 0 2 2 0 0 1-1.11-1.8V44h-2v.76a4 4 0 0 0 2.22 3.58 8.39 8.39 0 0 0 7.56 0A4 4 0 0 0 38 44.76V44Z"
					opacity=".2"
				/>
				<path
					fill="#ffd2b4"
					d="M32 15.21C43.45 15.21 42.47 26 42.47 26c1.68-.17 3 .49 3 2.86s-1 2.86-2.35 3a.29.29 0 0 0-.27.27c-.39 3.69-3 6.39-5.58 8.2a9.16 9.16 0 0 1-10.56 0c-2.57-1.81-5.19-4.52-5.58-8.2a.29.29 0 0 0-.27-.27c-1.31-.13-2.35-.63-2.35-3s1.27-3 2.94-2.86c.02 0-.91-10.79 10.55-10.79Z"
				/>
				<path
					fill="#262234"
					d="M36 41.08v1.5a9.16 9.16 0 0 1-8 0v-1.5a9.16 9.16 0 0 0 8 0Z"
					opacity=".1"
				/>
				<path
					fill="#262234"
					d="M32 13.62c-8.83 0-11.31 6.71-11.31 12.72a9.56 9.56 0 0 0 .31 2.13c.18.72 2.07.69 2.19 0a16.75 16.75 0 0 1 1.11-6.85 1.07 1.07 0 0 1 .06-.09 12.65 12.65 0 0 0 4.29 2.77.38.38 0 0 0 .51-.47 17.69 17.69 0 0 1-.49-1.75 12.45 12.45 0 0 0 4.55 2.67.38.38 0 0 0 .49-.5c-.15-.39-.34-.89-.5-1.44a11.91 11.91 0 0 0 5.27 2 .38.38 0 0 0 .39-.58 16.91 16.91 0 0 1-1-1.83 13.24 13.24 0 0 0 2.54.86 20.68 20.68 0 0 1 .51 5.18c.11.64 2 .67 2.19 0a9.56 9.56 0 0 0 .26-2.12c-.06-5.99-2.53-12.7-11.37-12.7Z"
				/>
				<path
					fill="#262234"
					d="M32.13 16s-1.39-2.46-6.84-3a.38.38 0 0 0-.35.61c.2.27.43.6.66 1a15.57 15.57 0 0 0-2.85.3.38.38 0 0 0-.16.68c1.22.93 3.6 3 3.06 4.39Z"
				/>
			</svg>
		</div>
		<span class="nav__brand"> {{ user }} </span>
		<button class="btn chat__btn flex-center" @click="isUserListActive = true">
			<svg viewBox="0 0 24 24" width="24" height="24" class="">
				<path
					fill="currentColor"
					d="M19.005 3.175H4.674C3.642 3.175 3 3.789 3 4.821V21.02l3.544-3.514h12.461c1.033 0 2.064-1.06 2.064-2.093V4.821c-.001-1.032-1.032-1.646-2.064-1.646zm-4.989 9.869H7.041V11.1h6.975v1.944zm3-4H7.041V7.1h9.975v1.944z"
				></path>
			</svg>
		</button>
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
				<button class="btn" @click="logout">
					Logout
				</button>
			</div>
		</div>
	</header>
	<UsersList
		:isUserListActive="isUserListActive"
		@close-pane="closeUsersList"
	/>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import UsersList from '@/components/Sidepane/UsersList.vue';
import notificationType from "@/types/notificationType";
import useDropdown from '@/composables/useDropdown';

export default defineComponent({
	components: {
		UsersList
	},
	setup() {
		const isUserListActive = ref<boolean>(false);
		const store = useStore();
		const router = useRouter();
		const user = computed( () => store.state.user.user );
		const { isDropdownOpen, toggleDropdown, setIsOpenFalsy } = useDropdown();

		function logout() {
			document.body.removeEventListener( 'click', setIsOpenFalsy );
			store.dispatch('user/logout');
			const notification: notificationType = {
				type: 'success',
				message: 'Logout successful'
			};
			store.dispatch('notification/add', notification );
			router.push({ name: 'Login' });
		}

		function closeUsersList() {
			isUserListActive.value = false;
		}

		return {
			isDropdownOpen,
			toggleDropdown,
			isUserListActive,
			logout,
			closeUsersList,
			user
		}
	}
});
</script>

<style lang="scss" scoped>
header {
	background-color: rgb(42, 47, 50);
	height: 60px;
	padding: 0 15px;
}

.profile__picture {
	height: 45px;
	width: 45px;
}

.nav__brand {
	margin-left: 12px;
	font-size: rem(15);
	font-weight: 400;
	color: rgb(177, 179, 181);
}

.chat__btn {
	margin-left: auto;
}

.chat__btn,
.options__btn {
	height: 45px;
	width: 45px;
}

.dropdown__outer {
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

</style>
