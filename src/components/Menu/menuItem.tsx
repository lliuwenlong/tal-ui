/**
 * @file MenuItem 组件
 * @author liuwenlong
 */

import React, {useContext} from 'react';
import classNames from 'classnames';
import {MenuContext} from './menu'
export interface MenuItemProps {
    index?: number,
    disabled?: boolean,
    className?: string,
    style?: React.CSSProperties
}

const MenuItem: React.FC<MenuItemProps> = (porps) => {
    const { index, disabled, style, className, children } = porps;
    const context = useContext(MenuContext);
    const classes = classNames('menu-item', className, {
        'disabled': disabled,
        'active': context.index === index
    });
    function handlerClick() {
        context.onSelect
            && !disabled
            && (typeof index === 'number')
            && context.onSelect(index as number);
    }
    
    return (<li className={classes} style={style} onClick={handlerClick}>
        {children}
    </li>);
}

MenuItem.displayName = 'MenuItem';
export default MenuItem;