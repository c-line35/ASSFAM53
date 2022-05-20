import React from 'react';

const Events = () => {
    return (
        <div className='events'>
            <div className='events__title'>Prochains évènements</div>
            <div className='events__content'>
                <div className='events__content__item'>
                    <h4>Assemblée Générale</h4>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."</p>
                </div>
                <div className='events__content__item'>
                    <h4>Journée à thème</h4>
                    <p>"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."</p>
                </div>
                <div className='events__content__item'>
                    <h4>Formation</h4>
                    <p>description</p>
                </div>
            </div>
        </div>
    );
};

export default Events;