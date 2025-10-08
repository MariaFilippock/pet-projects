import React, {lazy} from 'react';
import './App.scss';
import {Routes, Route} from 'react-router-dom';
import {Navbar} from './components/Navbar/Navbar';

const TodoMVC = lazy(() => import('./pages/TodoMVC/TodoMVC'));
const FilmopoiskJS = lazy(() => import('./pages/FilmopoiskJS/FilmopoiskJS'));
const CalculatorMVC = lazy(() => import('./pages/CalculatorMVC/CalculatorMVC'));
const FilmopoiskReact = lazy(() => import('./pages/FilmopoiskReact/FilmopoiskReact'));
const WeatherForecastJS = lazy(() => import('./pages/WeatherForecastJS/WeatherForecastJS'));

const App = () => {
    return (
        <div className='App'>
            <Navbar/>
            <div className='route-container'>
                <Routes>
                    <Route path='/todo_mvc' element={<TodoMVC/>}/>
                    <Route path='/filmopoisk_js' element={<FilmopoiskJS/>}/>
                    <Route path='/calculator_mvc' element={<CalculatorMVC/>}/>
                    <Route path='/filmopoisk_react' element={<FilmopoiskReact/>}/>
                    <Route path='/weather_forecast_js' element={<WeatherForecastJS/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
