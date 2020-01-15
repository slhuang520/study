class App {

    constructor(name){
        this.name = name;
    }

    render() {
        document.querySelector("#app").innerHTML = "gulp-babel " + this.name;
    }
}

export default App;