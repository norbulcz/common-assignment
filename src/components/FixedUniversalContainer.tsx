import { RefObject, useRef } from "react";
import styled from "styled-components";
import useElementOverlap from "../hooks/useElementOverlap";

interface IContainerStyleProps {
    $isOverlapping: boolean;
}

const Container = styled.div<IContainerStyleProps>`
    position: fixed;
    bottom: 20px;
    right: 20px;

    ${(props) => props.$isOverlapping ? `
        width: 400px;
        height: 300px;
        ` : `
        width: 200px;
        height: 150px;
        `
    }

    transition: width 0.3s ease, height 0.3s ease;

    border-radius: 8px;
    border: 4px solid ${({ theme }) => theme.colors.blue};;
    padding: 2px;

    background-color: ${({ theme }) => theme.colors.white};
`;

interface IFixedUniversalContainerProps {
    overlappingComponentRef: RefObject<HTMLDivElement>;
    content: JSX.Element;
}

const FixedUniversalContainer = (props: IFixedUniversalContainerProps) => {
    const fixedRef = useRef<HTMLDivElement>(null);

    const isOverlapping = useElementOverlap(fixedRef, props.overlappingComponentRef);

    return (
        <Container ref={fixedRef} $isOverlapping={isOverlapping}>
            {isOverlapping && props.content}
        </Container>
    )
};

export default FixedUniversalContainer;