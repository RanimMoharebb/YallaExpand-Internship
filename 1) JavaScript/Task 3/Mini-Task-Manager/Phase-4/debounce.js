// new file in this phase 

function debounce(fn, delayMs) {

    let timer = null;

    return function (...args) {

        clearTimeout(timer);

        timer = setTimeout(() => {

            fn(...args);

        }, delayMs);

    };

}

module.exports = debounce;