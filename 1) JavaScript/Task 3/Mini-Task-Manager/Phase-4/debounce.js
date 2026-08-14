// new file in this phase 

function debounce(fn, delayMs) {
// fn → the function we want to debounce
//delayMs → how long to wait before calling it
    
    let timer = null; // stores the timer ID returned by setTimeout()

    return function (...args) { // It returns a new function. Note: The returned function uses timer, That means this is a closure (Even after debounce() finishes, timer is still remembered)

        clearTimeout(timer);

        timer = setTimeout(() => {

            fn(...args);
            // If no new call happens before delayMs, JavaScript executes: fn(...args)
            // Rest parameter :-
            // if call debouncedSearch(); -> args = [];
            // if call -> debouncedSearch("Heart"); -> args = ["Heart"];
            // if call -> debouncedSearch("Heart", 5); -> args = ["Heart", 5];
            // if call -> debouncedSearch("Heart", "high"); -> args = ["Heart", "high"]; -> search("Heart", "high"); (call the original function instead of fn)
        }, delayMs);

    };

}

module.exports = debounce;