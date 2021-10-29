<template>
    <SearchBox
        placeholder="Search or start a new chat"
        :value="searchKey"
        @search-change="handleSearch"
    />
    <div class="chats__list">
        <ul>
            <li
                v-for="(chat, index) in finalList"
                :key="index"
            >
                <button
                    @click="openUserChat( chat.email )"
                    class="chat__box flex align-center"
                    :class="{ is__active: activeChat === chat.email }"
                >
                    <div class="chat__avatar"></div>
                    <div class="chat__contents">
                        <span class="chat__title"> {{ chat.email }} </span>
                        <span class="chat__time"> {{ chat.lastMessageTime }} </span>
                        <span class="chat__msg flex align-center">
                            {{ chat.lastMessage }}
                        </span>
                    </div>
                    <svg class="chat__arrow" viewBox="0 0 19 20" width="19" height="20">
                        <path fill="currentColor" d="M3.8 6.7l5.7 5.7 5.7-5.7 1.6 1.6-7.3 7.2-7.3-7.2 1.6-1.6z"></path>
                    </svg>
                </button>
            </li>
            <li v-if="chats.length === 0" class="no__chats flex align-center">
                No Chats Found..
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref, onUnmounted } from 'vue';
import { useStore } from 'vuex';
import { dbMessageType } from '@/types/messageType';
import chatType from '@/types/chatType';
import { getCurrentTime } from '@/helpers/getCurrentTime';
import { getDatabase, ref as firebaseRef, onValue, off } from 'firebase/database';
import SearchBox from '@/components/Sidepane/SearchBox.vue';
import useSearch from '@/composables/useSearch';

export default defineComponent({
    components: {
        SearchBox
    },
    setup() {
        const chats = ref<chatType[]>([]);
		const store = useStore();
        const db = getDatabase();
		const loggedUser = computed( () => store.state.user.user );
        const activeChat = computed( () => store.state.user.chat );
        const { searchKey, handleSearch, finalList } = useSearch( chats );

		function openUserChat( user: string ) {
            store.dispatch('user/setChat', user);
			searchKey.value = '';
		}

        onMounted( () => {
			const chatsRef = firebaseRef( db, "chats" );
			onValue( chatsRef, snapshot => {
				if( snapshot.exists() ) {
					const data = snapshot.val();
                    const rooms: [string, object][] = Object.entries( data );
                    const chatRooms = rooms.filter( room => {
                        const roomChat: dbMessageType = Object.values( room[1] )[0];
                        return roomChat.sender === loggedUser.value || roomChat.receiver === loggedUser.value;
                    });
                    const results = chatRooms.map( room => {
                        const roomChats: dbMessageType[] = Object.values( room[1] );
                        const roomChat: dbMessageType = roomChats.reduce( (result, chat) => {
                            const resultTime = new Date( result.time );
					        const chatTime = new Date( chat.time );
                            return resultTime < chatTime ? chat : result;
                        }, roomChats[0] );
                        const email = roomChat.sender === loggedUser.value ? roomChat.receiver : roomChat.sender;
                        return {
                            email,
                            lastMessage: roomChat.text,
                            lastMessageTime: roomChat.time,
                        };
                    });
                    chats.value = results.sort( (a: chatType, b: chatType) => {
                        const aDate = new Date( a.lastMessageTime );
                        const bDate = new Date( b.lastMessageTime );
                        if( aDate < bDate ) return 1;
                        else if( bDate < aDate ) return -1;
                        else return 0;
                    }).map( chat => ({
                            ...chat,
                            lastMessageTime: getCurrentTime( new Date( chat.lastMessageTime ) )
                        })
                    );
				}
                else chats.value = [];
			});
        });

        onUnmounted( () => {
			const chatsRef = firebaseRef( db, "chats" );
            off( chatsRef );
        });

        return {
            chats,
            activeChat,
            searchKey,
            handleSearch,
            openUserChat,
            finalList
        };
    }
})
</script>

<style lang="scss" scoped>
.chats__list {
    height: calc(100% - 200px);
    background-color: rgb(19, 28, 33);
    overflow-y: scroll;
    overflow-y: overlay;
}

.chat__box {
    width: 100%;
    height: 70px;
    cursor: pointer;
    position: relative;
    isolation: isolate;

    .chat__arrow {
        position: absolute;
        bottom: 10px;
        right: 15px;
        z-index: 2;
        display: none;
    }

    &:hover {
        background-color: $grey;

        .chat__arrow {
            display: block;
        }
    }

    &.is__active {
        background-color: $grey;

        .chat__contents {
            border-bottom-color: transparent;
        }
    }
}

.no__chats {
    height: 70px;
    font-size: rem(14);
    color: rgba(241, 241, 242, 0.92);
    font-weight: 400;
    padding-left: 50px;
}

.chat__avatar {
    height: 50px;
    margin-left: 15px;
    width: 50px;
    border-radius: 50%;
    background-color: $border-black;
    margin-right: 18px;
}

.chat__contents {
    height: 100%;
    flex-grow: 1;
    padding-right: 15px;
    display: grid;
    grid-template-columns: 1fr 55px;
    row-gap: 6px;
    align-content: center;
    border-bottom: 1px solid $border-black;
}

.chat__title {
    color: rgba(241, 241, 242, 0.92);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: rem(16);
    font-weight: 400;
    text-align: left;
}

.chat__time {
    font-size: rem(12);
    line-height: 12px;
    text-align: right;
    display: block;
    font-weight: 300;
    color: $grey-text;
}

.chat__msg {
    grid-column: 1 / 3;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: $grey-text;
    font-size: rem(14);
    font-weight: 300;

    svg {
        margin-right: 4px;
    }
}

</style>