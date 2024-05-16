import React, { Children } from 'react';
 
const withNewProp = (WrappedComponent, newProp) => {
  const NewComponent = (props) => {
    // 使用React.Children.map来遍历children
    const childrenWithNewProp = Children.map(props.children, (child) => {
      // 使用React.cloneElement来复制元素并添加新的prop
      return React.cloneElement(child, { ...child.props, ...newProp });
    });
 
    // 返回WrappedComponent，并传入更新后的children
    return <WrappedComponent {...props}>{childrenWithNewProp}</WrappedComponent>;
  };
 
  return NewComponent;
};
 
export default withNewProp;