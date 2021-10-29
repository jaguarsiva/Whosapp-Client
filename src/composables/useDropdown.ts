
import { ref } from 'vue';

export default function useDropdown() {
    const isDropdownOpen = ref<boolean>(false);

    function setIsOpenFalsy() { isDropdownOpen.value = false; };

    function toggleDropdown() {
        isDropdownOpen.value = !isDropdownOpen.value;
        if( isDropdownOpen.value )
            document.body.addEventListener( 'click', setIsOpenFalsy, { once: true });
    };

    return {
        isDropdownOpen,
        toggleDropdown,
        setIsOpenFalsy
    }
}