import React from 'react';

const JoinLevel = () => {
    return (
        <table className='joinLevel' border='1px' >
            <tbody>
                <tr className='joinLevel--head'>
                    <th>Adhésion Année civile</th>
                    <th>25€</th>
                    <th>38€</th>
                    <th>56€</th>
                </tr>
                <tr>
                    <td>Accès aux journées organisées par l’association</td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                </tr>
                <tr className='joinLevel--color'>
                    <td>Informations professionnelles par mail </td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                </tr>
                <tr>
                    <td>Accès à la bibliothèque</td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                </tr>
                <tr className='joinLevel--color'>
                    <td>Accès au site internet</td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                </tr>
                <tr>
                    <td>Réponses aux questions par téléphone ou par mail</td>
                    <td align='center'></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                </tr>
                <tr className='joinLevel--color'>
                    <td >Conseils et accompagnement</td>
                    <td align='center'></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                </tr>
                <tr>
                    <td>Accès aux fiches pratiques FNAF</td>
                    <td align='center'> </td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                </tr>
                <tr className='joinLevel--color'>
                    <td >Accès à ALLO ECOUTE</td>
                    <td align='center'> </td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                </tr>
                <tr>
                    <td>Intervention FNAF directe auprès de l'employeur</td>
                    <td align='center'> </td>
                    <td align='center'></td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                </tr>
                <tr className='joinLevel--color'>
                    <td >Assurance Protection Juridique</td>
                    <td align='center'> </td>
                    <td align='center'> </td>
                    <td align='center'><img src='./assets/logos/true.png' alt='ok'></img></td>
                </tr>
            </tbody>
        </table>
    );
};

export default JoinLevel;