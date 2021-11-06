// Debounce function definition
export function debounce( functionToDebounce, delayTime = 500 ) {
    let timer: null | ReturnType< typeof setTimeout > = null;
    return ( ...args ) => {
        clearTimeout( timer! );
        timer = setTimeout( () => {
            functionToDebounce.apply( this, args );
        }, delayTime );
    }
}
