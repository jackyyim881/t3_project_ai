export default function Button({small , className="", disabled, ...props}) {
    return (
        <button
        className={cn(
            "px-4 py-2 rounded-md text-white font-semibold bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
            small ? "text-sm" : "text-base",
            className
        )}
        onClick={onClick}
        disabled={disabled}
        {...props}
        >
        {children}
        </button>
    );
    }

