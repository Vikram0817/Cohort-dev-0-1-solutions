/*
 * Write a function that halts the JS thread (make it busy wait) for a given number of milliseconds.
 * During this time the thread should not be able to do anything else.
 * the function should return a promise just like before
 */

function sleep(milliseconds) {
    return new Promise(resolve => {
        setTimeout(() => resolve(), milliseconds);
        let a;
        for (let i = 0; i < 1000000000; i++) {
            a += 1;
        }
    }) 
}

module.exports = sleep;

// Done