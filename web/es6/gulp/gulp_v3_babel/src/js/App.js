class App{
    constructor(name) {
        this.name = name;
    }

    render() {
        document.querySelector("#app").innerHTML = ("test gulp babel " + this.name);
    }
}

export default App;
