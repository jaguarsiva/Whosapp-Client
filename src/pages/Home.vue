<template>
	<HomePage v-if="!chat" />
	<ChatRoom v-else />
</template>

<script lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import ChatRoom from '@/components/ChatRoom/ChatRoom.vue';
import HomePage from '@/components/HomePage.vue';

export default {
	components: {
		ChatRoom,
		HomePage
	},
	setup() {
		const store = useStore();
		const chat = computed( () => store.state.user.chat );

		function deleteChat() {
			store.dispatch( 'user/setChat', null );
		}

		return {
			chat,
			deleteChat
		};
	}
};
</script>
