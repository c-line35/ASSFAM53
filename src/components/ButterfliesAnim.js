import React from 'react';
const colors = ['red', 'pink', 'yellow', 'blue'];

const ButterfliesAnim = () => {
    return (
        <section>
            {colors.map((color)=>
            <div key ={color}className={'anim anim--' + color}>
                <img src={'./assets/butterfly/pap-' + color +'-1.png'} className="butterfly butterfly--1" alt={"papillon" + {color}}/>
                <img src={'./assets/butterfly/pap-' + color +'-2.png'} className="butterfly butterfly--2" alt={"papillon" + {color}}/>
            </div>
            )}
        </section>
    );
};

export default ButterfliesAnim;