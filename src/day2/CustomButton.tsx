import React from "react";

type CustomButtonProps = {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    color?: string,
    width?: number | string;
    height?: number | string;
};

const CustomButton: React.FC<CustomButtonProps> = ({
    label,
    onClick,
    disabled = false,
    color = "#2563eb", // default blue
    width = "auto",
    height = "auto"
}) => {
    const baseStyle: React.CSSProperties = {
        width,
        height,
        position: "relative",
        overflow: "hidden",
        padding: "10px 16px",
        borderRadius: "6px",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        fontSize: "14px",
        backgroundColor: color,
        color: "#fff",
        opacity: disabled ? 0.6 : 1,
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            style={{
                ...baseStyle,
            }}
        >
            {label}
        </button>
    );
};

export default CustomButton;
