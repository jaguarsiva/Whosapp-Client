<template>
	<aside class="users__pane" :class="{ is__active: isUserListActive }">
		<div class="top__row flex">
			<button class="btn back__btn" @click="closeUsersPane">
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
			<span> New Chat </span>
		</div>
		<SearchBox
			placeholder="Search contacts"
			:value="searchKey"
			@search-change="handleSearch"
		/>
		<div class="users__list">
			<ul>
				<li
					v-for="(user, index) in finalList"
					:key="index"
				>
					<button
						class="user__box flex align-center"
						@click="openUserChat(user.email)"
					>
						<div class="user__avatar"></div>
						<div class="user__contents flex-col justify-center">
							<span class="user__name"> {{ user.email }} </span>
						</div>
					</button>
				</li>
			</ul>
			<div class="no__users" v-if="finalList.length === 0">
				<span>No users found.</span>
			</div>
		</div>
	</aside>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from 'vue';
import { getDatabase, ref as firebaseRef, onValue } from 'firebase/database';
import SearchBox from '@/components/Sidepane/SearchBox.vue';
import { useStore } from 'vuex';
import useSearch from '@/composables/useSearch';
import userType from '@/types/userType';

export default defineComponent({
	components: {
		SearchBox
	},
	props: {
		isUserListActive: {
			type: Boolean,
			required: true
		}
	},
	setup(props, context) {

		const users = ref<userType[]>([]);

		const store = useStore();
		const loggedUser = computed( () => store.state.user.user );
        const { searchKey, handleSearch, finalList } = useSearch( users );

		function openUserChat( user: string ) {
            store.dispatch('user/setChat', user);
			closeUsersPane();
		}

		function closeUsersPane() {
			context.emit('close-pane');
			searchKey.value = '';
		}

		onMounted( () => {
			const db = getDatabase();
			const usersRef = firebaseRef( db, "users" );
			onValue( usersRef, snapshot => {
				if( snapshot.exists() ) {
					const data = snapshot.val();
					const result: userType[] = Object.values( data );
					users.value = result
						.map( user => ({ email: user.email}) )
						.filter( user => user.email !== loggedUser.value );
				}
			});
		});

		return {
			openUserChat,
			closeUsersPane,
			handleSearch,
            finalList,
			searchKey
		};
	}
});
</script>

<style lang="scss" scoped>
.users__pane {
	position: absolute;
	top: 0;
	left: -100%;
	height: 100%;
	width: 100%;
	z-index: 2;
	background-color: #131c21;
	transition: left 0.2s linear;

	&.is__active {
		left: 0;
	}
}

.top__row {
	background-color: rgb(50, 55, 57);
	height: 110px;
	padding: 12px 20px;
	align-items: flex-end;

	.btn {
		height: 30px;
		margin-right: 25px;
	}

	span {
		line-height: 35px;
		font-size: rem(20);
		font-weight: 500;
	}
}

.users__list {
    height: calc(100% - 160px);
    background-color: rgb(19, 28, 33);
    overflow-y: scroll;
    overflow-y: overlay;
}

.user__box {
	height: 70px;
    cursor: pointer;
    position: relative;
    isolation: isolate;
	width: 100%;

    &:hover {
        background-color: $grey;
    }
}

.user__avatar {
    height: 50px;
    margin-left: 15px;
    width: 50px;
    border-radius: 50%;
    background-color: $border-black;
    margin-right: 18px;
}

.user__contents {
    height: 100%;
    flex-grow: 1;
    padding-right: 15px;
    border-bottom: 1px solid $border-black;
}

.user__name {
    color: rgba(241, 241, 242, 0.92);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: rem(16);
    font-weight: 400;
	text-align: left;
}

.user__number {
    grid-column: 1 / 3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $grey-text;
    font-size: rem(14);
    font-weight: 300;
    margin-top: 6px;
}

@media (max-width: 767px) {
	.top__row {
		height: 60px;
	}

	.users__list {
		height: calc(100% - 110px);
	}
}

.no__users {
	padding: 25px;
	opacity: 0.6;
	font-weight: 300;
}

</style>
