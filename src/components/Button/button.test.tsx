/**
 * @file button组件测试用例
 * @author liuwenlong
 */
import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button, {ButtonProps, ButtonSize, ButtonType} from './button';

describe('test button component', () => {
    it('should render the correct default button', () => {
        const defaultProps = {
            onClick: jest.fn()
        };
        const wrappper = render(<Button {...defaultProps}>Nice</Button>);
        const element = wrappper.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('BUTTON');
        expect(element).toHaveClass('btn btn-default');
        expect(element.disabled).toBeFalsy();
        fireEvent.click(element);
        expect(defaultProps.onClick).toHaveBeenCalled();
    });

    it('should render the correct component  based on different props', () => {
        const buttonProps: ButtonProps = {
            btnType: ButtonType.Primary,
            size: ButtonSize.Large,
            className: 'klass'
        };
        const wrappper = render(<Button {...buttonProps}>Nice</Button>);
        const element = wrappper.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('btn-primary btn-lg klass');
        expect(element.disabled).toBeFalsy();
    });

    it('should render a link when btnType equals link and href is provided', () => {
        const linkProps: ButtonProps = {
            btnType: ButtonType.Link,
            href: 'http://baidu.com/'
        }
        const wrappper = render(<Button {...linkProps}>Link</Button>);
        const element = wrappper.getByText('Link') as HTMLAnchorElement;
        expect(element).toBeInTheDocument();
        expect(element.tagName).toEqual('A');
        expect(element).toHaveClass('btn btn-link');
        expect(element).toHaveAttribute('href');
        expect(element.href).toBe(linkProps.href);
    })

    it('should render disabled button when disabled set to true', () => {
        const disabledButtonProps: ButtonProps = {
            disabled: true,
            onClick: jest.fn()
        };
        const wrappper = render(<Button {...disabledButtonProps}>Nice</Button>);
        const element = wrappper.getByText('Nice') as HTMLButtonElement;
        expect(element).toBeInTheDocument();
        expect(element.disabled).toBeTruthy();
        fireEvent.click(element);
        expect(disabledButtonProps.onClick).not.toHaveBeenCalled();
    })
});