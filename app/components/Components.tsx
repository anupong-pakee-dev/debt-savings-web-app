export const Card = ({ children, className = "" }) => {
  return (
    <div className={`rounded-2xl bg-white shadow-sm ${className}`}>
      {children}
    </div>
  );
};

export const CardContent = ({ children, className = "" }) => {
  return <div className={`p-6 ${className}`}>{children}</div>;
};

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-xl font-semibold text-emerald-900 bg-white hover:bg-emerald-50 shadow-lg shadow-emerald-900/20 transition ${className}`}
    >
      {children}
    </button>
  );
};

export const Input = (props) => {
  return (
    <input className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none" />
  );
};

export const Select = ({ children, ...props }) => {
  return (
    <select className="w-full rounded-xl border border-slate-200 px-4 py-2 text-sm focus:border-slate-400 focus:outline-none">
      {children}
    </select>
  );
};
