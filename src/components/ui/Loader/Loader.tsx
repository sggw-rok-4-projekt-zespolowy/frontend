interface LoaderProps {
    size: number;
    speed?: number;
}

export default function Loader({ size, speed = 1 }: LoaderProps) {
  return (
    <div className="flex items-center justify-center" width={size} height={size}>
        <svg 
            className="absolute"
            width={size} height={size} viewBox="0 0 200 200"
        >
            <circle cx="100" cy="100" r="85" fill="var(--primary)"/>
            <circle cx="100" cy="100" r="80" fill="#000000"/>
            <circle cx="100" cy="100" r="30" fill="var(--accent)"/>
            <circle cx="100" cy="100" r="10" fill="#000000"/>
        </svg>
        <svg 
            className="absolute animate-spin" 
            style={{animationDuration: `${speed}s`}}
            width={size} height={size} viewBox="0 0 200 200"
        >
            <path
                d="M 71 71 
                A 41 41 0 0 1 129 71"
                fill="none"
                stroke="#ffffff"
                stroke-width="5"
                stroke-linecap="round"
            />
            <path
                d="M 61 67 
                A 51 51 0 0 1 139 67"
                fill="none"
                stroke="#ffffff"
                stroke-width="5"
                stroke-linecap="round"
            />
            <path
                d="M 73 46
                A 60 60 0 0 1 127 46"
                fill="none"
                stroke="#ffffff"
                stroke-width="5"
                stroke-linecap="round"
            />
            <path
                d="M 61 42
                A 69 69 0 0 1 139 42"
                fill="none"
                stroke="#ffffff"
                stroke-width="5"
                stroke-linecap="round"
            />
            <path
                d="M 71 129
                A 41 41 0 0 0 129 129"
                fill="none"
                stroke="#ffffff"
                stroke-width="5"
                stroke-linecap="round"
            />
                <path
                d="M 61 133 
                A 51 51 0 0 0 139 133"
                fill="none"
                stroke="#ffffff"
                stroke-width="5"
                stroke-linecap="round"
            />
            <path
                d="M 73 154
                A 60 60 0 0 0 127 154"
                fill="none"
                stroke="#ffffff"
                stroke-width="5"
                stroke-linecap="round"
            />
            <path
                d="M 61 158
                A 69 69 0 0 0 139 158"
                fill="none"
                stroke="#ffffff"
                stroke-width="5"
                stroke-linecap="round"
            />
        </svg>
    </div>
  );
}
