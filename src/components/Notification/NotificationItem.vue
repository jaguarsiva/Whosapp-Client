<template>
	<div
		class="notification__item flex align-center"
		:class="'notification__' + notification.type"
		ref="notificationItem"
	>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" v-if="notification.type === 'success'">
			<circle cx="32" cy="32" r="32" fill="teal"/>
			<path fill="#fff" d="m52.32 21.09-4.42-4.41a.628.628 0 0 0-.88 0L26.65 37.05 17.1 27.5a.628.628 0 0 0-.88 0l-4.55 4.54c-.11.12-.18.27-.18.44 0 .16.07.32.18.43l14.41 14.41c.12.12.27.18.44.18.16 0 .32-.06.43-.18l25.36-25.35c.25-.24.25-.64.01-.88z"/>
		</svg>
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" v-if="notification.type === 'error'">
			<path
				d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1zm1-5c0 .6-.4 1-1 1s-1-.4-1-1V8c0-.6.4-1 1-1s1 .4 1 1v4z"
			/>
		</svg>
		<p>
			{{ notification.message }}
		</p>
	</div>
</template>

<script lang="ts">
import notificationType from '@/types/notificationType';
import {
	defineComponent,
	PropType,
	onMounted,
	onBeforeUnmount,
	ref
} from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
	props: {
		notification: {
			type: Object as PropType<notificationType>,
			required: true
		}
	},
	setup(props) {
		const notificationItem = ref<HTMLDivElement | null>(null);
		const store = useStore();
		let timer: null | ReturnType<typeof setTimeout> = null;

		onMounted(() => {
			timer = setTimeout(() => {
				notificationItem.value!.classList.add('is__closing');
				setTimeout(() => {
					store.dispatch( 'notification/remove', props.notification.id );
				}, 400);
			}, 5000);
		});

		onBeforeUnmount(() => {
			clearTimeout(timer!);
		});

		return {
			notificationItem
		};
	}
});
</script>

<style lang="scss" scoped>
.notification__item {
	position: relative;
	padding: 10px 24px;
	border-radius: 6px;
	animation: open-notif 0.5s ease;
	box-shadow: 0px 6px 12px rgb(0, 0, 0, 0.1);
	pointer-events: all;
	cursor: context-menu;
	background-color: #fff;
	border-left: 10px solid transparent;
	border-right: 10px solid transparent;
	animation: open-notification 0.5s ease;

	&.is__closing {
		animation: close-notification 0.5s ease;
	}
}

svg {
	height: 30px;
	width: 30px;
	margin-right: 25px;

	path {
		height: 30px;
		width: 30px;
	}
}


p {
	font-size: rem(15);
	font-weight: 400;
	line-height: 1.5;
	color: $black;

	&::first-letter {
		text-transform: uppercase;
	}
}

.notification__success {
	border-color: teal;
}

.notification__error {
	border-color: #e20613;

	svg, path {
		fill: #e20613;
	}
}
</style>
