import Model from "./model";
import Child from "./child";
class Parent extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            clicks: 0
        };
        this.handlerClick = this.handlerClick.bind(this);
    }

    handlerClick() {
        this.setState(state => {
            clicks: state.clicks + 1
        });
    }

    render() {
        return (
            <div onClick={this.handlerClick}>
                <p>Number of clicks: {this.state.clicks}</p>
                <p>
                    Open up the browser DevTools
                    to observe that the button
                    is not a child of the div
                    with the onClick handler.
                </p>
                <Model>
                    <Child/>
                </Model>
            </div>
        );
    }
}
export default Parent;