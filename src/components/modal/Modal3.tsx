import { useEffect, useRef } from "react";
import {
    axisBottom,
    axisLeft,
    ScaleBand,
    scaleBand,
    ScaleLinear,
    scaleLinear,
    select
} from "d3";

export interface IData {
    label: string;
    value: number;
}

interface BarChartProps {
    data: IData[];
    sizeX: number;
    sizeY: number;
    color: string;
}

interface AxisBottomProps {
    scale: ScaleBand<string>;
    transform: string;
}

interface AxisLeftProps {
    scale: ScaleLinear<number, number, never>;
}

interface BarsProps {
    data: BarChartProps["data"];
    height: number;
    scaleX: AxisBottomProps["scale"];
    scaleY: AxisLeftProps["scale"];
    color: string;
}

function AxisBottom({ scale, transform }: AxisBottomProps) {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisBottom(scale));
        }
    }, [scale]);

    return <g ref={ref} transform={transform} />;
}

function AxisLeft({ scale }: AxisLeftProps) {
    const ref = useRef<SVGGElement>(null);

    useEffect(() => {
        if (ref.current) {
            select(ref.current).call(axisLeft(scale));
        }
    }, [scale]);

    return <g ref={ref} />;
}

function Bars({ data, height, scaleX, scaleY, color }: BarsProps) {
    return (
        <>
            {data.map(({ value, label }) => (
                <rect
                    key={`bar-${label}`}
                    x={scaleX(label)}
                    y={scaleY(value)}
                    width={scaleX.bandwidth()}
                    height={height - scaleY(value)}
                    fill={color}
                />
            ))}
        </>
    );
}

export function BarChart({ data, sizeX, sizeY, color }: BarChartProps) {
    const margin = { top: 10, right: 0, bottom: 20, left: 30 };
    const width = sizeX - margin.left - margin.right;
    const height = sizeY - margin.top - margin.bottom;

    const scaleX = scaleBand()
        .domain(data.map(({ label }) => label))
        .range([0, width])
        .padding(0.5);
    const scaleY = scaleLinear()
        .domain([0, Math.max(...data.map(({ value }) => value))])
        .range([height, 0]);

    return (
        <svg
            width={width + margin.left + margin.right}
            height={height + margin.top + margin.bottom}
        >
            <g transform={`translate(${margin.left}, ${margin.top})`}>
                <AxisBottom scale={scaleX} transform={`translate(0, ${height})`} />
                <AxisLeft scale={scaleY} />
                <Bars data={data} height={height} scaleX={scaleX} scaleY={scaleY} color={color}/>
            </g>
        </svg>
    );
}
