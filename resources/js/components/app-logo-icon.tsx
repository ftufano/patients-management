import { ImgHTMLAttributes } from 'react';

export default function AppLogoIcon({
    className,
    ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
    const mergedClassName = ['h-9 w-9 rounded-2xl object-cover', className]
        .filter(Boolean)
        .join(' ');

    return (
        <img
            src="/images/welcome-logo.png"
            alt="Patients Manager logo"
            className={mergedClassName}
            {...props}
        />
    );
}
