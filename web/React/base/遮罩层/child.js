class Child extends React.Component {
    render() {
        // 这个按钮的点击事件会冒泡到父元素
        // 因为这里没有定义 'onClick' 属性
        return (
            <div className="model">
                <button>click</button>
            </div>
        );
    }
}
export default Child;