import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import {FilmopoiskJS} from './pages/FilmopoiskJS/FilmopoiskJS';
import {CalculatorMVC} from './pages/CalculatorMVC/CalculatorMVC';
import {TodoMVC} from './pages/TodoMVC/TodoMVC';
import {WeatherForecastJS} from './pages/WeatherForecastJS/WeatherForecastJS';
import {FilmopoiskReact} from './pages/FilmopoiskReact/FilmopoiskReact';
import {Navbar} from './components/Navbar/Navbar';

const App = () => {
    return (
        <div className='App'>
            <Navbar />
            <div className='route-container'>
                <Routes>
                    <Route  path='/filmopoisk_react' element={<FilmopoiskReact/>}/>
                    <Route  path='/filmopoisk_js' element={<FilmopoiskJS/>}/>
                    <Route path='/todo_mvc' element={<TodoMVC/>}/>
                    <Route path='/calculator_mvc' element={<CalculatorMVC/>}/>
                    <Route path='/weather_forecast_js' element={<WeatherForecastJS/>}/>
                </Routes>
            </div>
        </div>
    );
}

export default App;
