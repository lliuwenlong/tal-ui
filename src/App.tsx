import React from 'react';
import Alert, { AlertType } from './components/Alert/alert';
import { type } from 'os';

function App() {
    return (
        <div>
            <Alert
                type={AlertType.INFO}
                message='info'
                description='asdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasdasd'
                showIcon={true}
                closable={false}
                closeText={<div>关闭</div>}
            />
            <hr/>
            <Alert type={AlertType.SUCCESS} message='success' showIcon={true} />
            <hr/>
            <Alert type={AlertType.WARNING} message='warning' showIcon={true} />
            <hr/>
            <Alert type={AlertType.ERROR} message='error' showIcon={true} />
        </div>
    );
}

export default App;
