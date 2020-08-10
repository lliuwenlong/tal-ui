import React from 'react';
import Button, {ButtonType, ButtonSize } from "./components/Button/button";
function App() {
    return (
        <div>
            <Button>hello wowrd</Button>
            <Button disabled>disabled</Button>
            <Button btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Pramary</Button>
            <Button btnType={ButtonType.Danger} size={ButtonSize.Small}>Small Danger</Button>
            <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_black">Baidu Link</Button>
            <Button btnType={ButtonType.Link} href="http://www.baidu.com" disabled>Disabled Link</Button>
        </div>
    );
}

export default App;
