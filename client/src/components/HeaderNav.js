import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

function HeaderNav() {
    const [activeItem, setActiveItem] = React.useState('home');

    function handleItemClick(e, { name }) {
        setActiveItem(name);
    }

    return (
        <div>
            <Menu pointing secondary>
                <Menu.Item
                    name='home'
                    active={activeItem === 'home'}
                    onClick={handleItemClick}
                    as={Link}
                    to='/'
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                        as={Link}
                        to='/login'
                    />
                    <Menu.Item
                        name='register'
                        active={activeItem === 'register'}
                        onClick={handleItemClick}
                        as={Link}
                        to='/register'
                    />
                </Menu.Menu>
            </Menu>
        </div>
    )

}

export default HeaderNav;
