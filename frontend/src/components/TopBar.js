import {Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction} from '@carbon/react';
import {Sun, Moon, Power} from '@carbon/icons-react';

import {useEffect, useState} from 'react';
import {Link} from "react-router-dom";

function TopBar({title}) {
    const [darkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    return (
        <Header aria-label="Top Bar" style={{position: "sticky"}}>
            <HeaderName prefix="KOmegle" as={Link} to={'/'}>{title}</HeaderName>
            <HeaderGlobalBar>
                <HeaderGlobalAction aria-label="Dark Mode" onClick={() => {
                    setDarkMode(!darkMode);
                }}>
                    {darkMode ? <Sun/> : <Moon/>}
                </HeaderGlobalAction>
                {title === 'Chat' && <HeaderGlobalAction aria-label="Quit" as={Link} to={'/'}><Power/></HeaderGlobalAction>}
            </HeaderGlobalBar>
        </Header>
    );
}

export {TopBar}