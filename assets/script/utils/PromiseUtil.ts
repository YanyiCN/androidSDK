export default class PromiseUtil{
    static all(promises:any[], concurrent = promises.length):Promise<any>{
        if (!Array.isArray(promises)) {
            throw new TypeError('You must pass an array to all.');
        }
    
        if (concurrent < 1) {
            return Promise.reject();
        }
    
        return new Promise((resolve, reject) => {
            const queue = [...promises];
            const result = [];
            let total = promises.length;
            let count = concurrent;
            let index = 0;
    
            function resolver(index) {
                return function(value) {
                    resolveAll(index, value);
                };
            }
    
            function resolveAll(index, value) {
                result[index] = value;
                count++;
                total--;
                next();
                
                if (!total) {
                    resolve(result);
                }
            }
    
            function rejecter(reason) {
                reject(reason);
            }
    
            function next() {
                while (queue.length && count > 0) {
                    count--;
                    (queue.shift())().then(resolver(index++), rejecter);
                }
            }
    
            next();
        });
    };

    static delayPromise(fn) {
        return function() {
            return new Promise(fn);
        };
    }
}
