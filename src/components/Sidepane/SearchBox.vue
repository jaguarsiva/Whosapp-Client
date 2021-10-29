<template>
	<div class="search__box">
		<div class="search__field flex align-center">
			<input
				type="text"
				class="search__input"
				v-model="searchInput"
				:placeholder="placeholder"
			/>
			<button class="search__btn flex-center" tabindex="-1">
				<svg viewBox="0 0 24 24" width="24" height="24" class="">
					<path
						fill="currentColor"
						d="M15.009 13.805h-.636l-.22-.219a5.184 5.184 0 0 0 1.256-3.386 5.207 5.207 0 1 0-5.207 5.208 5.183 5.183 0 0 0 3.385-1.255l.221.22v.635l4.004 3.999 1.194-1.195-3.997-4.007zm-4.808 0a3.605 3.605 0 1 1 0-7.21 3.605 3.605 0 0 1 0 7.21z"
					></path>
				</svg>
			</button>
			<button class="back__btn flex-center" tabindex="-1">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					width="24"
					height="24"
					fill="currentColor"
				>
					<path fill="none" d="M0 0h24v24H0V0z" />
					<path
						d="M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59a.996.996 0 0 0 0 1.41l6.59 6.59a.996.996 0 1 0 1.41-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1z"
					/>
				</svg>
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { debounce } from '../../helpers/debounce.js';

export default defineComponent({
	props: {
		placeholder: {
			type: String,
			required: true
		},
		value: {
			type: String,
			required: true
		}
	},
	setup(props, context) {
		const searchInput = ref<string>( props.value );
		watch( searchInput, debounce( (value: string) => {
			context.emit('search-change', value);
		}, 250));

		watch( () => props.value, () => {
			searchInput.value = props.value;
		});

		return {
			searchInput
		}
	},
})
</script>


<style lang="scss" scoped>
.search__box {
	height: 50px;
	padding: 7px 15px;
	border-bottom: 1px solid $border-black;
	background-color: rgb(19, 28, 33);
}

.search__field {
	background-color: $grey;
	border-radius: 24px;
	height: 35px;
    position: relative;
}

.search__btn, .back__btn {
    position: absolute;
    height: 100%;
    left: 20px;
}

.search__btn {
    animation: open-icon 0.3s ease both;
}

.back__btn {
    animation: close-icon 0.3s ease both;
}

.search__input {
	background-color: transparent;
	border: 0;
	outline: 0;
	height: 100%;
	width: 100%;
	padding: 0 30px 0 65px;
	color: $grey-text;

	&::placeholder {
		font-weight: 200;
		font-size: rem(14);
		color: $grey-text;
	}

    &:focus + .search__btn {
        animation: close-icon 0.3s ease both;
    }

    &:focus ~ .back__btn {
        animation: open-icon 0.3s ease both;
    }
}

@keyframes open-icon {
    0% { transform: rotate(-90deg); opacity: 0; }
    100% { transform: rotate(0); overflow: 1; }
}

@keyframes close-icon {
    0% { transform: rotate(0); opacity: 1; }
    100% { transform: rotate(-90deg); opacity: 0; }
}
</style>