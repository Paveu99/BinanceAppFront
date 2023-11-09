import React, {useEffect, useState} from "react";
import {useSpring, animated, useTransition} from "@react-spring/web"
import '../styles/Modal.css'
import { WholeTradeEntity } from "types";
import up from "../styles/Green_Arrow_Up_Darker.svg.png";
import down from "../styles/900px-Red_Arrow_Down.svg.png";
import {BarChart} from "./Modal3";

interface Props {
    info: WholeTradeEntity
    isOpen: boolean,
    onClose: () => void
}
export interface IData {
    label: string;
    value: number;
}

export const Modal2 = (props: Props) => {

    const handleEscape = (e: any) => {
        if (e.keyCode === 27) {
            props.onClose()
        }
    }

    const [data, setData] = useState<IData[]>([
        {
            label: "Weighted Average Price",
            value: Number(props.info.weightedAvgPrice)
        },
        {
            label: "Open Price",
            value: Number(props.info.openPrice)
        },
        {
            label: "Last Price",
            value: Number(props.info.lastPrice)
        },
        {
            label: "High Price",
            value: Number(props.info.highPrice)
        },
        {
            label: "Low Price",
            value: Number(props.info.lowPrice)
        },
    ])

    useEffect(() => {
        document.addEventListener("keydown", handleEscape)

        return () => document.removeEventListener("keydown", handleEscape)
    }, [])

    const modalTransition = useTransition(props.isOpen, {
        from: { opacity: 0},
        enter: { opacity: 1},
        leave: { opacity: 1},
        config: {
            duration: 300
        }
    })

    const springs = useSpring({
        opacity: props.isOpen ? 1 : 0,
        transform: props.isOpen ? "translateY(0%)" : "translateY(-100%)",
        config: {
            duration: 300
        }
    })
    console.log(Number(props.info.openPrice))
    return modalTransition((styles, isOpen) => isOpen && (
        <animated.div className='react-modal-overlay' onClick={props.onClose}>
        <animated.div style={springs} className='react-modal-wrapper' onClick={e => e.stopPropagation()}>
            <div className='react-modal-content'>
                <header>
                    <div>
                        <h2 style={{fontWeight: "bold"}}>More info: {props.info.symbol}</h2>
                    </div>
                    <a href='#' className="close" onClick={props.onClose}></a>
                </header>
                <hr/>
                <div className="info">
                    <div className="main">
                        <div className="spec">
                            <div className="desc">
                                Price Change Percent
                            </div>
                            <div className="value">
                                {
                                    Number(props.info.priceChangePercent) > 0
                                        ? <div>{props.info.priceChangePercent}%<img src={up} style={{width: '30px', paddingLeft: "10px"}}/></div>
                                        : <div>{props.info.priceChangePercent}%<img src={down} style={{width: '30px', paddingLeft: "10px"}}/></div>
                                }
                            </div>
                        </div>
                        <hr/>
                        <div className="spec">
                            <div className="desc">
                                Weighted Average Price
                            </div>
                            <div className="value">
                                {props.info.weightedAvgPrice}
                            </div>
                        </div>
                    </div>
                    <div className="detailed">
                        <div className="upper">
                            <div className="spec">
                                <div className="desc">
                                    Open Price
                                </div>
                                <div className="value">
                                    {props.info.openPrice}
                                </div>
                            </div>
                            <hr/>
                            <div className="spec">
                                <div className="desc">
                                    Last Price
                                </div>
                                <div className="value">
                                    {props.info.lastPrice}
                                </div>
                            </div>
                        </div>
                        <hr/>
                        <div className="lower">
                            <div className="spec">
                                <div className="desc">
                                    High Price
                                </div>
                                <div className="value">
                                    {props.info.highPrice}
                                </div>
                            </div>
                            <hr/>
                            <div className="spec">
                                <div className="desc">
                                    Low Price
                                </div>
                                <div className="value">
                                    {props.info.lowPrice}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <BarChart data={data} sizeX={600} sizeY={300}></BarChart>
            </div>
        </animated.div>
    </animated.div>
    ))

}