
import { ref, watch, computed, Ref } from 'vue';

export default function( list ) {

    const searchKey = ref('');
    const searchResults = ref([]);
    const finalList = computed( () => {
        if( searchKey.value ) return searchResults.value;
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
