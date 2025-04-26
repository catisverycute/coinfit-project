interface MenuItemProps {
  label: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ label, onClick }) => (
  <button
    className="w-full text-left py-3 px-4 bg-white rounded-lg shadow hover:bg-blue-50 transition"
    onClick={onClick}
  >
    {label}
  </button>
);

export default MenuItem;
