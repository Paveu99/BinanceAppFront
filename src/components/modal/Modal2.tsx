import React, { useEffect } from "react";
import {useSpring, animated, useTransition} from "@react-spring/web"
import '../styles/Modal.css'
import { WholeTradeEntity } from "types";
import {AddExpression} from "../calculator/Calculator";
import up from "../styles/Green_Arrow_Up_Darker.svg.png";
import down from "../styles/900px-Red_Arrow_Down.svg.png";

interface Props {
    info: WholeTradeEntity
    isOpen: boolean,
    onClose: () => void
}

export const Modal2 = (props: Props) => {

    const handleEscape = (e: any) => {
        if (e.keyCode === 27) {
            props.onClose()
        }
    }

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

    return modalTransition((styles, isOpen) => isOpen && (
        <animated.div className='react-modal-overlay' onClick={props.onClose}>
        <animated.div style={springs} className='react-modal-wrapper' onClick={e => e.stopPropagation()}>
            <div className='react-modal-content'>
                <header>
                    <div>
                        <h2>More info: {props.info.symbol}</h2>
                    </div>
                    <a href='#' className="close" onClick={props.onClose}></a>
                </header>
                <hr/>
                <div className="info">
                    <div className="main">
                        <div>
                            {
                                Number(props.info.priceChangePercent) > 0
                                    ? <div>{props.info.priceChangePercent}%<img src={up} style={{width: '30px', paddingLeft: "10px"}}/></div>
                                    : <div>{props.info.priceChangePercent}%<img src={down} style={{width: '30px', paddingLeft: "10px"}}/></div>
                            }
                        </div>
                        <div>
                            {props.info.weightedAvgPrice}
                        </div>
                    </div>
                    <div className="detailed">
                        <div className="upper">
                            <div>
                                {props.info.openPrice}
                            </div>
                            <div>
                                {props.info.lastPrice}
                            </div>
                        </div>
                        <div className="lower">
                            <div>
                                {props.info.highPrice}
                            </div>
                            <div>
                                {props.info.lowPrice}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </animated.div>
    </animated.div>
    ))

}