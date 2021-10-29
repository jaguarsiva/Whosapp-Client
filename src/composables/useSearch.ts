
import { ref, watch, computed, Ref } from 'vue';
import userType from '@/types/userType';
import chatType from '@/types/chatType';
type userOrChatArray = userType[] | chatType[];

export default function( list: Ref<userOrChatArray> ) {

    const searchKey = ref('');
    const searchResults = ref<userOrChatArray>([]);
    const finalList = computed<userOrChatArray>( () => {
        if( searchResults.value.length ) return searchResults.value;
        else return list.value;
    });

    watch( searchKey, key => {
        if( key === '' ) {
            searchResults.value = [];
            return;
        }
        searchResults.value = list.value.filter( user => user.email.indexOf( key ) !== -1 );
    });

    function handleSearch( searchedValue: string ) {
        searchKey.value = searchedValue.toLowerCase();
    }

    return {
        searchKey,
        handleSearch,
        finalList
    }
}