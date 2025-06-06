import { ReactNode } from 'react';

interface ButtonProps {
    children: ReactNode;
    type?: 'button' | 'submit' | 'reset';
    onClick?: () => void;
}

const Button = ({ children, type = 'button', onClick }: ButtonProps) => {
    return (
        <button type={type} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;