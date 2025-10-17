import React from 'react';
import styles from './CalculatorMVC.module.scss';
import common from '../pageStyles.module.scss';


const CalculatorMVC = () => {
    console.log(process.env.PUBLIC_URL);
    return (
        <div className={common.contentBox}>
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
