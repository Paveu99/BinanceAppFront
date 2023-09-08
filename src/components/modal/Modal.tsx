import React, { useEffect } from "react";
import {useSpring, animated, useTransition} from "@react-spring/web"
import '../styles/Modal.css'
import { WholeTradeEntity } from "types";

interface Props {
    info: WholeTradeEntity
    isOpen: boolean,
    onClose: () => void
}

export const Modal = (props: Props) => {

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
                    <h2>Trade Calculator</h2>
                    <a href='#' className="close" onClick={props.onClose}></a>
                </header>
                <hr/>
                {props.info.symbol} is weighted at {props.info.weightedAvgPrice}
            </div>
        </animated.div>
    </animated.div>
    ))

}