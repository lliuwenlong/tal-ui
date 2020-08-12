/**
 * @file alert组件测试用例
 * @author liuwelong
 */

import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Alert, { AlertType, AlertProps} from './alert';
import classNames from 'classnames';

describe('test alert', () => {
    it('defautl alert', () => {
        const props: AlertProps = {
            message: '123123123123',
            type: AlertType.INFO,
        };
        const wrapper = render(<Alert {...props} />);
        const element = wrapper.getByTestId('test-alert');
        expect(element).toBeInTheDocument();
        const classes = classNames('tal-alert', `tal-alert-${props.type}`);
        expect(element).toHaveClass(classes);
        const message = wrapper.getByText((props.message as string));
        expect(message).toBeInTheDocument();
        const closeIcon = wrapper.getByTestId('alert-close-icon').firstElementChild;
        expect(closeIcon).not.toBeInTheDocument();
        const alertIcon = wrapper.getByTestId('test-alert-icon').firstElementChild;
        expect(alertIcon).not.toBeInTheDocument();
    });

    it('description alert', () => {
        const props: AlertProps = {
            message: '123123123123',
            type: AlertType.INFO,
            description: '33333333333333'
        };
        const wrapper = render(<Alert {...props} />);
        const element = wrapper.getByTestId('test-alert');
        const classes = classNames('tal-alert-with-description');
        expect(element).toHaveClass(classes);
        const description = wrapper.getByText((props.description as string));
        expect(description).toBeInTheDocument();
    });

    it('props banner', () => {
        const props: AlertProps = {
            message: 'message',
            type: AlertType.INFO,
            banner: true,
            description: 'description'
        };
        const wrapper = render(<Alert {...props} />);
        const element = wrapper.getByTestId('test-alert');
        const classes = classNames('show-icon', 'banner');
        expect(element).toHaveClass(classes);
        const alertIcon = wrapper.getByTestId('test-alert-icon').firstElementChild;
        expect(alertIcon).toBeInTheDocument();
    });

    it('show icon', () => {
        const props: AlertProps = {
            message: '123123123123',
            type: AlertType.INFO,
            showIcon: true,
        };
        const wrapper = render(<Alert {...props} />);
        const element = wrapper.getByTestId('test-alert');
        const classes = classNames('show-icon');
        expect(element).toHaveClass(classes);
    });

    it('icon render', () => {
        const props: AlertProps = {
            message: '123123123123',
            type: AlertType.INFO,
            showIcon: true,
            icon: <div>我是icon</div>
        };
        const wrapper = render(<Alert {...props} />);
        const element = wrapper.getByTestId('test-alert');
        const iconElement = wrapper.getByText('我是icon');
        expect(iconElement).toBeInTheDocument();
        const classes = classNames('show-icon');
        expect(element).toHaveClass(classes);
    });

    it('show close', () => {
        const props: AlertProps = {
            message: '123123123123',
            type: AlertType.INFO,
            closable: true,
            onClose: jest.fn(),
            afterClose: jest.fn()
        };
        const wrapper = render(<Alert {...props} />);
        const element = wrapper.getByTestId('test-alert');
        const classes = classNames('tal-alert', `tal-alert-${props.type}`);
        expect(element).toHaveClass(classes);
        const closeIcon = wrapper.getByTestId('alert-close-icon');
        fireEvent.click(closeIcon);
        expect(props.onClose).toHaveBeenCalled();
        expect(props.afterClose).toHaveBeenCalled();
    });

    it('show render close', () => {
        const props: AlertProps = {
            message: '123123123123',
            type: AlertType.INFO,
            closable: true,
            closeText: <div>关闭</div>,
            onClose: jest.fn(),
            afterClose: jest.fn()
        };
        const wrapper = render(<Alert {...props} />);
        const element = wrapper.getByTestId('test-alert');
        const classes = classNames('tal-alert', `tal-alert-${props.type}`);
        expect(element).toHaveClass(classes);
        const close = wrapper.getByText('关闭');
        expect(close).toBeInTheDocument()
        const closeIcon = wrapper.getByTestId('alert-close-icon');
        fireEvent.click(closeIcon);
        expect(props.onClose).toHaveBeenCalled();
        expect(props.afterClose).toHaveBeenCalled();
    });
})