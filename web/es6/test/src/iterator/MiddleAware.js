export default functions => {
    function * generator(arr) {
        for (let item of arr) {
            yield item;
        }
    }

    const it = generator(functions);

    const init = () => {
        doNext(it.next());
    };

    function doNext(n) {
        n.value(() => {
            let next = it.next();

            if (next.done){
                return;
            }

            doNext(next);
        });
    }

    init();
}