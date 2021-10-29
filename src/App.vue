<template>
	<main class="flex" :class="{ 'is__logged': isLoggedIn }">
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
		let user = localStorage.getItem('user');
		if( user ) {
			user = JSON.parse( user );
			store.dispatch('user/login', user);
		}

		return {
			isLoggedIn
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

</style>