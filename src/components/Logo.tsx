export default function Logo({
  variant = "default",
  size = "default",
  className = "",
}: {
  variant?: "default" | "light" | "compact";
  size?: "sm" | "default" | "lg" | "xl";
  className?: string;
}) {
  const isLight = variant === "light";

  const sizeClasses = {
    sm: "h-9 sm:h-10",
    default: "h-14 sm:h-16 md:h-18 lg:h-20",
    lg: "h-16 sm:h-20 md:h-24",
    xl: "h-20 sm:h-24 md:h-28",
  }[size];

  return (
    <div className={`flex items-center select-none ${className}`}>
      {isLight ? (
        <div className="bg-white px-4 py-2 sm:px-5 sm:py-2.5 rounded-2xl shadow-xl border border-slate-200/60 inline-flex items-center hover:scale-105 transition-transform duration-300">
          <img
            src="/logo.svg"
            alt="NISSI Elite Plast UPVC Profiles"
            className={`${sizeClasses} w-auto object-contain drop-shadow-sm`}
          />
        </div>
      ) : (
        <div className="inline-flex items-center hover:opacity-95 transition-opacity">
          <img
            src="/logo.svg"
            alt="NISSI Elite Plast UPVC Profiles"
            className={`${sizeClasses} w-auto object-contain drop-shadow-sm`}
          />
        </div>
      )}
    </div>
  );
}
