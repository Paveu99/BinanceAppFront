import React, {useEffect, useState} from "react";
import * as XLSX from 'xlsx'
import {WholeTradeEntity} from 'types'
export const DownloadBttn = () => {

    const [trades, setTrades] = useState<WholeTradeEntity[] | null>(null)

    const refreshTrades = async () => {
        setTrades(null)
        const res = await fetch('http://localhost:3001/trades')
        const data = await res.json()
        setTrades(data.trades)
    }

    useEffect(() => {
        refreshTrades()
    }, []);

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
        XLSX.writeFile(wb, `Binance report ${dateTime}.xlsx`);
    }
    return <p>
        <button
            className="downloadbttn"
            disabled={!trades}
            onClick={(e) => {
                downloadxls(e, trades);
            }}
        >
            Download Binance report
        </button>
        <button className="downloadbttn" onClick={() => window.location.reload()}>Refresh</button>
    </p>
}