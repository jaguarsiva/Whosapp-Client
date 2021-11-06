<template>
	<div class="message__row flex align-center">
		<span
			class="message__text"
			:class="{
				sender__message: message.isSender,
				receiver__message: !message.isSender
			}"
		>
			{{ message.text }}
			<span class="message__time flex align-end">
				{{ message.time }}
				<svg
					viewBox="0 0 16 15"
					width="16"
					height="15"
					class="read__reciepts"
					v-if="message.isSender && message.isRead"
				>
					<path
						fill="currentColor"
						d="M15.01 3.316l-.478-.372a.365.365 0 0 0-.51.063L8.666 9.879a.32.32 0 0 1-.484.033l-.358-.325a.319.319 0 0 0-.484.032l-.378.483a.418.418 0 0 0 .036.541l1.32 1.266c.143.14.361.125.484-.033l6.272-8.048a.366.366 0 0 0-.064-.512zm-4.1 0l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
					></path>
				</svg>
				<svg
					viewBox="0 0 16 15"
					width="16"
					height="15"
					class="read__reciepts"
					v-if="message.isSender && !message.isRead"
				>
					<path
						fill="currentColor"
						d="M10.91 3.316l-.478-.372a.365.365 0 0 0-.51.063L4.566 9.879a.32.32 0 0 1-.484.033L1.891 7.769a.366.366 0 0 0-.515.006l-.423.433a.364.364 0 0 0 .006.514l3.258 3.185c.143.14.361.125.484-.033l6.272-8.048a.365.365 0 0 0-.063-.51z"
					></path>
				</svg>
			</span>
		</span>
	</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	props: {
		message: {
			type: Object,
			required: true
		}
	},
	setup() {}
});
</script>

<style lang="scss" scoped>
.message__row {
	margin-bottom: 9px;
	padding: 0 75px;
	min-height: 35px;
}

.message__text {
	padding: 6px 85px 8px 12px;
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

.read__reciepts {
	margin-left: 4px;
}

@media (max-width: 1023px) {
	.message__row {
		padding: 0 30px;
	}
}

@media (max-width: 767px) {
	.message__row {
		padding: 0 15px;
	}
}
</style>
