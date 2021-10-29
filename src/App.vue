<template>
	<main class="flex" :class="{ 'is__logged': isLoggedIn, 'has__chat': hasChat }">
		<SidePane v-if="isLoggedIn" />
		<section class="body__pane">
			<router-view />
		</section>
	</main>
	<NotificationList />
</template>

<script lang="ts">
import { useStore } from 'vuex';
import { computed, defineComponent } from 'vue';
import NotificationList from '@/components/Notification/NotificationList.vue';
import SidePane from '@/components/Sidepane/SidePane.vue';

export default defineComponent({
	components: {
		SidePane,
		NotificationList
	},
	setup() {
		const store = useStore();
		const isLoggedIn = computed( () => store.state.user.isLoggedIn );
		const hasChat = computed( () => Boolean(store.state.user.chat) );
		let user = localStorage.getItem('user');
		if( user ) {
			user = JSON.parse( user );
			store.dispatch('user/login', user);
		}

		return {
			isLoggedIn,
			hasChat
		}
	},
})
</script>

<style lang="scss" scoped>
main.is__logged {
	position: absolute;
	top: 20px;
	left: 70px;
	right: 70px;
	bottom: 20px;
	background-color: $light-black;
	box-shadow: 0 0 6px rgba($color: $black, $alpha: 0.5);

	.body__pane {
		border-left: 1px solid $border-black;
	}
}

.body__pane {
	flex-grow: 1;
}

@media (max-width: 1440px) {
	main.is__logged {
		top: 15px;
		bottom: 15px;
		left: 15px;
		right: 15px;
	}
}

@media (max-width: 767px) {

	main.is__logged {
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}

	.body__pane {
		width: 100vw;
		overflow: hidden;
	}

	main.is__logged .body__pane {
		display: none;
	}

	main.is__logged.has__chat .body__pane {
		display: block;
	}
}

</style>