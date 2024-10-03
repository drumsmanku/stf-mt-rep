import React, { useRef, useEffect, useState } from 'react';
import {CiRedo} from "react-icons/ci";

const SignBoard = ({
                       width = 300, // Smaller width
                       height = 80, // Smaller height
                       strokeColor = '#000000',
                       strokeWidth = 2,
                   }) => {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [isDrawing, setIsDrawing] = useState(false);

    useEffect(() => {
        const canvas = canvasRef.current;
        canvas.width = width * 2;
        canvas.height = height * 2;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;

        const context = canvas.getContext('2d');
        context.scale(2, 2);
        context.lineCap = 'round';
        context.strokeStyle = strokeColor;
        context.lineWidth = strokeWidth;
        contextRef.current = context;
    }, [width, height, strokeColor, strokeWidth]);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const finishDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };

    const clearCanvas = () => {
        const canvas = canvasRef.current;
        contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
    };

    return (
        <div className="flex flex-col items-start">
            <canvas
                ref={canvasRef}
                className="w-1/2 h-1/2 border border-gray-300 rounded cursor-crosshair"
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onMouseLeave={finishDrawing}
            />
            <button
                onClick={clearCanvas}
                className="p-3 text-sm flex items-center gap-2 text-gray-700"
            >
                <CiRedo />
                Clear
            </button>
        </div>
    );
};

export default SignBoard;
