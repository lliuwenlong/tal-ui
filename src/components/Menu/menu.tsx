/**
 * @file Menu 组件
 * @author liuwenlong
 */

import React, {createContext, useState} from 'react';
import classNames from 'classnames';
import { MenuItemProps } from './menuItem';
export enum MenuMode {
    HORIZONTAL = 'horizontal',
    VERTIACL = 'vertical'
};

type SelectCallback = (selectIndex: number) => void
interface IMenuContext {
    index: number,
    onSelect?: SelectCallback
}

export interface MenuProps {
    defaultIndex?: number,
    className?: string,
    mode?: MenuMode,
    style?: React.CSSProperties,
    onSelect?: SelectCallback
}

export const MenuContext = createContext<IMenuContext>({ index: 0 });

const Menu: React.FC<MenuProps> = (props) => {
    const { className, mode, style, children, defaultIndex } = props;
    const { onSelect } = props;

    const [currentActive, setActive] = useState(defaultIndex);
    const classes = classNames('tal-menu', className, {
        'menu-vertical': mode === MenuMode.VERTIACL
    });

    const handlerClick = (index: number) => {
        setActive(index);
        onSelect && onSelect(index);
    }

    const passedContext: IMenuContext = {
        index: currentActive ? currentActive : 0,
        onSelect: handlerClick
    };

    const renderChildren = () => {
        return React.Children.map(children, (child, index) => {
            const childElement = child as React.FunctionComponentElement<MenuItemProps>
            const { displayName } = childElement.type;
            if (displayName === 'MenuItem') {
                return React.cloneElement(childElement, {
                    index
                });
            } else {
                console.error('Warrning: Menu has a child which is not a MenuItem component');
            }
        });
    }
    return <ul className={classes} style={style} data-testid="test-menu">
        <MenuContext.Provider value={passedContext}>
            {renderChildren()}
        </MenuContext.Provider>
    </ul>
};

Menu.defaultProps = {
    defaultIndex: 0,
    mode: MenuMode.HORIZONTAL
}

export default Menu;

