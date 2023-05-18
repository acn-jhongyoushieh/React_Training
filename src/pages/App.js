import logo from '../assets/images/logo.svg';
import styles from './App.module.scss';
import { Link, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage/HomePage';
import TodoList from './TodoList/TodoList';
import WeatherTool from './WeatherTool/WeatherTool';

function App() {
  return (
    <div className={styles.App}>
    <header className={styles.header}>
      <div className={styles.siteName}>
        <Link to="/React_Training">
          React練習サイト
        </Link>
      </div>
    </header>
    <section className={styles.content}>
      <Routes>
        <Route path="/React_Training" element={ <HomePage/> } />
        <Route path="/React_Training/works/todolist" element={ <TodoList/> } />
        <Route path="/React_Training/works/weathertool" element={ <WeatherTool/> } />
      </Routes>
    </section>
    <footer className={styles.footer}>
      jhong-you.shieh React_Training
    </footer>
  </div>
  );
}

export default App;
