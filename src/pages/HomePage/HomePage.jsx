import React from 'react';
import styles from './HomePage.module.scss';
import WorkList from '../../components/WorkList/workList';
import worksData from '../../data/works.json';

const HomePage = () => {
    return <div className={ styles.wrap }>
        <section className={ styles.brief }>
            <img src={require("../../assets/images/profile.png")} />
            <h2>Jhong-you.Shieh</h2>
            <h3>Sr Anls, Full-Stack Dev</h3>
            <p>React練習用のサイトです。</p>
        </section>  

        <div className={styles.works}>
            <div className={styles.title}>
                <h1>練習作品リスト</h1>
                <p>Reactで作成した練習作品です。</p>
            </div>
            <WorkList workListData={worksData.data} />
        </div>
  </div>
}

export default HomePage;