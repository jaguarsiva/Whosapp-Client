<template>
	<section class="side__pane flex-col">
		<ToolsBox />
		<div class="notification__box">
			<div class="avatar">
				<svg viewBox="0 0 48 48" width="48" height="48" class="">
					<path
						fill="currentColor"
						d="M24.154 2C11.919 2 2 11.924 2 24.165S11.919 46.33 24.154 46.33s22.154-9.924 22.154-22.165S36.389 2 24.154 2zm-.744 15.428v-.618c0-.706.618-1.324 1.324-1.324s1.323.618 1.323 1.324v.618c2.559.618 4.412 2.823 4.412 5.559v3.176l-8.294-8.294a5.056 5.056 0 0 1 1.235-.441zm1.323 15.706a1.77 1.77 0 0 1-1.765-1.765h3.529a1.768 1.768 0 0 1-1.764 1.765zm7.236-.883l-1.765-1.765H17.233v-.882l1.765-1.765v-4.853a5.56 5.56 0 0 1 .794-2.912l-2.559-2.559 1.147-1.147 14.735 14.736-1.146 1.147z"
					></path>
				</svg>
			</div>
			<p class="not__title">Developer Information</p>
			<p class="not__msg">
				Made with 🤍 by
				<a href="https://www.sivaa.tech/" title="Siva's Portfolio" target="_blank">
					Siva
				</a>
			</p>
		</div>
		<ChatsList />
	</section>
</template>

<script lang="ts">
import ToolsBox from '@/components/Sidepane/ToolsBox.vue';
import ChatsList from '@/components/Sidepane/ChatsList.vue';

import { defineComponent } from 'vue';

export default defineComponent({
	components: {
        ToolsBox,
		ChatsList
	},
	setup() {}
});
</script>

<style lang="scss" scoped>
.side__pane {
	width: 420px;
	position: relative;
	overflow: hidden;
}

.notification__box {
	height: 90px;
    padding: 0 15px;
	background-color: rgb(8, 83, 115);
    display: grid;
    grid-template-columns: 48px 1fr;
    grid-template-rows: 24px 24px;
    place-content: center;
    align-items: center;
    column-gap: 15px;
    row-gap: 2px;

	a {
		text-decoration: underline;
	}
}

.avatar {
    grid-row: 1/3;
    grid-column: 1/2;

    svg path {
        fill: rgb(142, 178, 190);
    }
}

.not__title {
    color: rgba(241, 241, 242, 0.96);
    font-size: rem(16);
    font-weight: 400;
}

.not__msg {
    color: rgba(241, 241, 242, 0.75);
    font-size: rem(14);
    font-weight: 400;
}

</style>
