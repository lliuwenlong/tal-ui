/**
 * @file menu组件测试用例
 * @author liuwenlong
 */

import React from 'react';
import { render, fireEvent, RenderResult, cleanup } from '@testing-library/react';
import Menu, {MenuProps, MenuMode} from './menu';
import MenuItem, { MenuItemProps} from './menuItem';

function createMenu(props: MenuProps) {
    return (
        <Menu {...props}>
            <MenuItem>
                active
            </MenuItem>
            <MenuItem disabled>
                disabled
            </MenuItem>
            <MenuItem>
                cool link
            </MenuItem>
        </Menu>
    )
}
const props: MenuProps = {
    defaultIndex: 0,
    className: 'test',
    onSelect: jest.fn()
};

const verProps: MenuProps = {
    defaultIndex: 0,
    mode: MenuMode.VERTIACL
};
let wrappper: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement;
describe('test menu and MenItem component', () => {
    beforeEach(() => {
        wrappper = render(createMenu(props));
        menuElement = wrappper.getByTestId('test-menu');
        activeElement = wrappper.getByText('active');
        disabledElement = wrappper.getByText('disabled');
    });

    it('should render correct Menu and MenuItem based on default props', () => {
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('tal-menu');
        expect(menuElement.getElementsByTagName('li').length).toEqual(3);
        expect(activeElement).toHaveClass('menu-item active');
        expect(disabledElement).toHaveClass('menu-item disabled');
    });
    
    it('click items should change active and call the reight callback', () => {
        const thirdItem = wrappper.getByText('cool link');
        fireEvent.click(thirdItem);
        expect(thirdItem).toHaveClass('active');
        expect(activeElement).not.toHaveClass('active');
        expect(props.onSelect).toHaveBeenCalledWith(2);
        fireEvent.click(disabledElement);
        expect(props.onSelect).not.toHaveBeenCalledWith(1);
    });

    it('should render vertical mode when is set to vertical', () => {
        cleanup();
        const wrappper = render(createMenu(verProps));
        const menuElement = wrappper.getByTestId('test-menu');
        expect(menuElement).toBeInTheDocument();
        expect(menuElement).toHaveClass('menu-vertical');
    })
})