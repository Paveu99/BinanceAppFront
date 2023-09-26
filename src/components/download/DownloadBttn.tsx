import React, {useContext, useEffect, useState} from "react";
import * as XLSX from 'xlsx'
import {WholeTradeEntity} from 'types'
import {SearchContext} from "../search/SearchContext";
import '../styles/DownloadBttn.css'

interface Props {
    trades: WholeTradeEntity[]
}
export const DownloadBttn = (props: Props) => {

    const {search} = useContext(SearchContext)

    const today = new Date();
    const date = today.getFullYear()+'.'+(today.getMonth()+1)+'.'+today.getDate();
    const time = today.getHours() + "-" + today.getMinutes() + "-" + today.getSeconds();
    const dateTime = date+' '+time;

    const downloadxls = (e: React.MouseEvent, data: any) => {
        e.preventDefault();
        const ws = XLSX.utils.json_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, `Binance report "${search}" ${dateTime}.xlsx`);
    }
    return <>
        <button
            className="download"
            onClick={(e) => {
                downloadxls(e, props.trades);
            }}
        >
            Download Binance report
        </button>
    </>
}