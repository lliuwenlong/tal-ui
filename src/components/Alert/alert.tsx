/**
 * @file Alert组件
 * @author liuwenlong
 */

import React, {useState, useEffect} from 'react';
import classNames from 'classnames';
import {CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined, CloseOutlined} from '@ant-design/icons'
export enum AlertType {
    SUCCESS = 'success',
    INFO = 'info',
    WARNING = 'warning',
    ERROR = 'error'
}

interface AlertTypeIconInterFace {
    success: React.ForwardRefExoticComponent<any>,
    info: React.ForwardRefExoticComponent<any>,
    warning: React.ForwardRefExoticComponent<any>,
    error: React.ForwardRefExoticComponent<any>,
    [propName: string]: React.ForwardRefExoticComponent<any>
}

const AlertTypeIcon: AlertTypeIconInterFace = {
    success: CheckCircleOutlined,
    info: ExclamationCircleOutlined,
    warning: ExclamationCircleOutlined,
    error: CloseCircleOutlined
}

export interface AlertProps {
    type: AlertType,
    message: string | React.ReactNode,
    description?: string | React.ReactNode,
    showIcon?: boolean,
    icon?: React.ReactNode,
    closable?: boolean,
    closeText?: string | React.ReactNode,
    className?: string,
    banner?: boolean
    onClose?: () => void,
    afterClose?: () => void
}
const Alert: React.FC<AlertProps> = (props) => {
    const [isShow, setIsShow] = useState(true);
    const { message, description, type, showIcon, icon, closable, closeText, className, banner } = props;
    const { onClose, afterClose} = props;
    const Icon = AlertTypeIcon[(type as string)];
    const classes = classNames('tal-alert', className, {
        [`tal-alert-${type}`]: type,
        'tal-alert-with-description': !!description,
        'show-icon': showIcon || banner,
        'banner': banner
    });

    function closeAlert() {
        onClose && onClose();
        setIsShow(false);
    }

    useEffect(() => {
        return () => {
            if (!!isShow) {
                afterClose && afterClose();
            }
        }
    }, [isShow])
    return (
        isShow
        ?  <div className={classes} data-testid='test-alert'>
            <div className="tal-alert-icon-wrapper" data-testid='test-alert-icon'>
                {(showIcon || banner) && <span className="tal-alert-icon">{
                    !!icon ? icon : <Icon />
                }</span>}
            </div>
            <div className="tal-alert-message-wrapper">
            <span>{message}</span>
            {description && <span className="description">{description}</span>}
            </div>
                <div className="tal-alert-close-wrapper" onClick={closeAlert} data-testid='alert-close-icon'>
                {
                    closable && (
                        closeText ? closeText : <CloseOutlined /> 
                    ) 
                }
            </div>
        </div>
        : null
    )
}

Alert.defaultProps = {
    closable: false,
    showIcon: false,
    type: AlertType.SUCCESS,
    banner: false
}

export default Alert;