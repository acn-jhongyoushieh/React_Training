import React from 'react';
import styles from './workList.module.scss';
import { Link } from 'react-router-dom';

const WorkList = ({workListData}) => {
  return <div className={styles.workLists}>
    <ul>
        {
          workListData && workListData.map(item=>
            <li key={item.id}>
              <Link to={ `/React_Training/works/${item.id}` }>
                <div className={ styles.cover }>
                  <img src={require(`../../assets/images/${item.cover}`)} />
                </div>
                <div className={styles.workbrief}>
                  <h3>{item.title}</h3>
                  <p>{item.brief}</p>
                </div>                       
              </Link>
            </li>
          )
        }
    </ul>
  </div>
}

export default WorkList;