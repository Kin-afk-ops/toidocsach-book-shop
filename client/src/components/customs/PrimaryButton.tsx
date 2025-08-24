import { Button } from "../ui/button";

interface ChildProps {
  content: string;
  handleTodo?: () => void;
  icon?: React.ReactNode;
  asChild?: boolean; // Nếu là true, thì không gán onClick
  type?: "button" | "submit" | "reset";
}

const PrimaryButton: React.FC<ChildProps> = ({
  content,
  handleTodo,
  icon,
  asChild = false,
  type = "button",
}) => {
  return (
    <Button
      type={type}
      onClick={!asChild && handleTodo ? () => handleTodo() : undefined}
      className="flex items-center justify-center w-full gap-2 px-4 py-2 bg-[#e11d48] hover:bg-[#be123c] rounded-lg text-white transition-colors cursor-pointer"
    >
      {icon && <span>{icon}</span>}
      <span>{content}</span>
    </Button>
  );
};

export default PrimaryButton;
