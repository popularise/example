import { FunctionComponent } from "react";

interface IProps {
  children: React.ReactNode;
  onCancel: () => void;
}

const Modal: FunctionComponent<IProps> = ({ children, onCancel }) => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-600/50 flex flex-col items-center justify-center">
      <div className="p-10 bg-white rounded-md shadow-md relative">
        <div
          onClick={() => onCancel()}
          className="absolute cursor-pointer hover:bg-orange-700 font-bold  text-center text-white rounded-full p-1 w-8 h-8 bg-orange-500"
          style={{ top: "-5px", right: "-5px" }}
        >
          x
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
