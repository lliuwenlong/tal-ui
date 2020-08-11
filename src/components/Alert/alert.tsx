/**
 * @file Alert组件
 * @author liuwenlong
 */

import React, {useState} from 'react';
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
    className?: string
}
const Alert: React.FC<AlertProps> = (props) => {
    const [isShow, setIsShow] = useState(true);
    const { message, description, type, showIcon, icon, closable, closeText, className } = props;
    const Icon = AlertTypeIcon[(type as string)];
    const classes = classNames('tal-alert', className, {
        [`tal-alert-${type}`]: type,
        'tal-alert-with-description': !!description,
        'show-icon': showIcon
    });

    function closeAlert () {
        setIsShow(false);
    }

    return (
        isShow
        ?  <div className={classes}>
            <div className="tal-alert-icon-wrapper">
                {showIcon && <span className="tal-alert-icon">{
                    !!icon ? icon : <Icon />
                }</span>}
            </div>
            <div className="tal-alert-message-wrapper">
            <span>{message}</span>
            {description && <span className="description">{description}</span>}
            </div>
                <div className="tal-alert-close-wrapper" onClick={closeAlert}>
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
    type: AlertType.SUCCESS
}

export default Alert;