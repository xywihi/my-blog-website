import React, { Component } from 'react';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        // 当产生错误时调用，返回一个状态对象以更新 state
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        // 当产生错误时调用，可以用于记录错误信息或发送错误报告
        console.error('Error:', error);
        console.error('Error Info:', errorInfo);
    }

    render() {
        if (this.state.hasError) {
            // 自定义错误备用 UI
            return <div>Something went wrong.</div>;
        }

        // 没有错误，正常渲染子组件
        return this.props.children;
    }
}

export default ErrorBoundary;
