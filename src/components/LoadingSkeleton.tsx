import styled, { css, keyframes } from "styled-components";
import React from "react";

type BaseSkeletonProps = {
  animation?: "wave" | "pulse" | false;
  color?: string;
  className?: string;
  style?: React.CSSProperties;
};

type TextVariantProps = {
  variant: "text";
  fontSize?: string;
};

type OtherVariantsProps = {
  variant: "rectangular" | "circular" | "rounded";
  width?: number;
  height?: number;
};

type LoadingSkeletonProps = BaseSkeletonProps &
  (TextVariantProps | OtherVariantsProps);

const BorderRadiusMap: Record<LoadingSkeletonProps["variant"], string> = {
  rectangular: "0",
  circular: "50%",
  rounded: "4px",
  text: "4px",
};

// Dynamic Pulse Animation accepting the provided color
const generatePulseAnimation = (color: string) => keyframes`
  0% {
    background-color: ${color};
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    background-color: ${color};
    opacity: 1;
  }
`;

// Dynamic Wave Animation (uses a white gradient atop the base color)
const waveAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

type CustomCssStyles = React.CSSProperties & {
  "--borderRadius": string;
  "--backgroundColor"?: string;
  "--width"?: string;
  "--height"?: string;
};

const LoadingSkeleton = (props: LoadingSkeletonProps) => {
  const {
    variant,
    animation = "pulse",
    color = "hsl(200, 20%, 95%)",
    className,
    style: userSuppliedStyles,
  } = props;

  React.useEffect(() => {
    if (!["rectangular", "circular", "rounded", "text"].includes(variant)) {
      console.warn(`Invalid variant: ${variant}`);
    }
  }, [variant]);

  const styles = {
    "--borderRadius": BorderRadiusMap[variant],
    "--backgroundColor": color,
  } as CustomCssStyles;

  if (variant === "text") {
    styles["--width"] = "100%";
    styles["--height"] = props.fontSize || "1rem";
  } else {
    styles["--width"] = props.width ? `${props.width}px` : "100%";
    styles["--height"] = props.height ? `${props.height}px` : "auto";
  }

  const finalStyles = {
    ...styles,
    ...userSuppliedStyles,
  };

  return (
    <Wrapper
      style={finalStyles}
      animation={animation}
      baseColor={color}
      className={className}
    />
  );
};

const Wrapper = styled.div<{
  animation: LoadingSkeletonProps["animation"];
  baseColor: string;
}>`
  position: relative;
  overflow: hidden;
  background-color: var(--backgroundColor);
  width: var(--width);
  height: var(--height);
  border-radius: var(--borderRadius);

  ${({ animation, baseColor }) =>
    animation === "pulse" &&
    css`
      animation: ${generatePulseAnimation(baseColor)} 1.5s ease-in-out infinite;
    `}

  ${({ animation }) =>
    animation === "wave" &&
    css`
      &::after {
        content: "";
        position: absolute;
        inset: 0;
        background: linear-gradient(
          90deg,
          transparent 0%,
          rgba(255, 255, 255, 0.4) 50%,
          transparent 100%
        );
        transform: translateX(-100%);
        animation: ${waveAnimation} 2s linear infinite;
      }
    `}
`;

export default LoadingSkeleton;
