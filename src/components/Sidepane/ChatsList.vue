<template>
    <div class="chats__list">
        <ul>
            <li
                v-for="(chat, index) in chats"
                :key="index"
            >
                <router-link
                    :to="{ name: 'ChatRoom', params: { id: chat.urlPath } }"
                    class="chat__box flex align-center"
                >
                    <div class="chat__avatar"></div>
                    <div class="chat__contents">
                        <span class="chat__title"> {{ chat.title }} </span>
                        <span class="chat__time"> {{ chat.time }} </span>
                        <span class="chat__msg flex align-center">
                            {{ chat.message }}
                        </span>
                    </div>
                    <svg class="chat__arrow" viewBox="0 0 19 20" width="19" height="20">
                        <path fill="currentColor" d="M3.8 6.7l5.7 5.7 5.7-5.7 1.6 1.6-7.3 7.2-7.3-7.2 1.6-1.6z"></path>
                    </svg>
                </router-link>
            </li>
            <li v-if="chats.length === 0" class="no__chats flex align-center">
                No Chats Found..
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useStore } from 'vuex';
import { getDatabase, ref as firebaseRef, onValue } from 'firebase/database';
import messageType from '@/types/messageType';
import { getCurrentTime } from '@/helpers/getCurrentTime';

export default defineComponent({
    setup() {
        type chatType = {
            title: string,
            message: string,
            time: string,
            urlPath: string
        };
        const chats = ref<chatType[]>([]);
		const store = useStore();
		const loggedUser = computed( () => store.state.user.user );

        onMounted( () => {
			const db = getDatabase();
			const chatsRef = firebaseRef( db, "chats" );
			onValue( chatsRef, snapshot => {
				if( snapshot.exists() ) {
					const data = snapshot.val();
                    const rooms: [string, object][] = Object.entries( data );
                    const chatRooms = rooms.filter( room => {
                        const roomChat: messageType = Object.values( room[1] )[0];
                        return roomChat.sender === loggedUser.value || roomChat.receiver === loggedUser.value;
                    });
                    chats.value = chatRooms.map( room => {
                        const roomChats: messageType[] = Object.values( room[1] );
                        const roomChat: messageType = roomChats[ roomChats.length - 1 ];
                        const title = roomChat.sender === loggedUser.value ? roomChat.receiver : roomChat.sender;
                        return {
                            title,
                            message: roomChat.text,
                            time: getCurrentTime( new Date( roomChat.time ) ),
                            urlPath: title.split('.').join('dot')
                        };
                    });
				}
			});
        });

        return {
            chats
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

    &.router-link-active {
        background-color: $grey;

        .chat__contents {
            border-bottom-width: 0;
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