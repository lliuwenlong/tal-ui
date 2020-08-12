import React from 'react';
import Menu, {MenuMode} from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';

function App() {
    return (
        <Menu defaultIndex={0} mode={MenuMode.VERTIACL}>
            <MenuItem index={0}>
                cool link
            </MenuItem>
            <MenuItem index={1} disabled>
                cool link
            </MenuItem>
            <MenuItem index={2}>
                cool link
            </MenuItem>
        </Menu>
    );
}

export default App;
