import React from 'react';

const Events = () => {
    return (
        <div className='events'>
            <div className='events__title'>Prochains évènements</div>
            <div className='events__content'>
                <div className='events__content__item'>
                    <h4>Assemblée Générale</h4>
                    <p>L'assemblée Générale est l'occasion pour nous de faire le point sur l'année écoulée.</p>
                    <p>Nous aborderons notamment le rapport financier, moral, et d'activité</p>
                    <p>C'est surtout, pour nous, un moment de partage et d'échange.</p>
                </div>
                <div className='events__content__item'>
                    <h4>La sortie d'été</h4>
                    <p>Pendant l'été, nous nous réunissons lors d'une journée conviviale, accompgnés des enfants,</p>
                    <p> autour d'activités (activités nautiques à La Rincerie, visite du Château de Lassay Les Châteaux, parc animalier de l'Arche de Noé...).</p>
                    <p>Un goûter est offert à la fin de cette journée pour tous les participants.</p>
                </div>
                <div className='events__content__item'>
                    <h4>Journée à thème</h4>
                    <p>Rencontre animée par un professionnel autour du thème : "Accompagner le vécu du deuil de l'enfant placé."</p>
                    <p>Un certificat de présence sera transmis aux stagiaires à l'issu de la conférence.</p>
                </div>
            </div>
        </div>
    );
};

export default Events;