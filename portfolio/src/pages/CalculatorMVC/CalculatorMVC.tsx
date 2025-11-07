import React from 'react';
import styles from './CalculatorMVC.module.scss';


const CalculatorMVC = () => {
    return (
        <div>
            <iframe
                src={`${process.env.PUBLIC_URL}/native_projects/calculator_mvc/index.html`}
                title='Калькулятор MVC'
                width="800"
                height="600"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
}

export default CalculatorMVC;
