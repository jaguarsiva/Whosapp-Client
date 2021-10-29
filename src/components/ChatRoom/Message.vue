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
			<span class="message__time">
				{{ message.time }}
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

</style>
