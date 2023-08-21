import React from 'react';
import logo from './logo.svg';
import './App.css';
import {UserEntity} from 'types'
import { Spinner } from './components/spinner/Spinner';
import {DownloadBttn} from "./components/download/DownloadBttn";

export const App = () => {


  return (
    <div>
        <Spinner/>
        <DownloadBttn/>
    </div>
  );
}