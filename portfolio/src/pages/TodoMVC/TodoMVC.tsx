import React from 'react';
import styles from './TodoMVC.module.scss';
import common from '../pageStyles.module.scss';

const TodoMVC = () => {
    return (
        <div className={common.contentBox}>
            <iframe
                src={`${process.env.PUBLIC_URL}/native_projects/todo_mvc/index.html`}
                title='Список задач MVC'
                width="800"
                height="600"
                frameBorder="0"
                allowFullScreen
                loading="lazy"
            />
        </div>
    );
}

export default TodoMVC;
