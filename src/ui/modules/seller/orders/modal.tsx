import { useEffect, useRef, useState } from "react";


interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}


export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [initialSize, setInitialSize] = useState({ width: 0, height: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const [resizeDirection, setResizeDirection] = useState("");

  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    // Définir la taille et la position initiales, centrées
    const modalElement = modalRef.current;
    const initialWidth = 700;
    const initialHeight = 500;

    modalElement.style.width = `${initialWidth}px`;
    modalElement.style.height = `${initialHeight}px`;
    modalElement.style.left = `calc(50% - ${initialWidth / 2}px)`;
    modalElement.style.top = `calc(50% - ${initialHeight / 2}px)`;
  }, [isOpen]);

  const handleMouseDown = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    direction: string
  ) => {
    e.stopPropagation();
    setIsResizing(true);
    setResizeDirection(direction);
    setInitialMousePosition({ x: e.clientX, y: e.clientY });
    if (modalRef.current) {
      setInitialSize({
        width: modalRef.current.offsetWidth,
        height: modalRef.current.offsetHeight,
      });
      setInitialPosition({
        x: modalRef.current.offsetLeft,
        y: modalRef.current.offsetTop,
      });
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isResizing) return;

    const dx = e.clientX - initialMousePosition.x;
    const dy = e.clientY - initialMousePosition.y;

    let newWidth = initialSize.width;
    let newHeight = initialSize.height;
    let newX = initialPosition.x;
    let newY = initialPosition.y;

    // Logique de redimensionnement indépendante pour chaque direction
    // Si on tire vers le bas, seule la hauteur change, le "top" est fixe
    if (resizeDirection.includes("bottom")) {
      newHeight = Math.max(200, initialSize.height + dy);
    }
    // Si on tire vers la droite, seule la largeur change, le "left" est fixe
    if (resizeDirection.includes("right")) {
      newWidth = Math.max(300, initialSize.width + dx);
    }
    // Si on tire vers le haut, la hauteur et la position "top" sont ajustées pour que le bas soit fixe
    if (resizeDirection.includes("top")) {
      newHeight = Math.max(200, initialSize.height - dy);
      newY = initialPosition.y + dy;
    }
    // Si on tire vers la gauche, la largeur et la position "left" sont ajustées pour que la droite soit fixe
    if (resizeDirection.includes("left")) {
      newWidth = Math.max(300, initialSize.width - dx);
      newX = initialPosition.x + dx;
    }

    if (modalRef.current) {
      modalRef.current.style.width = `${newWidth}px`;
      modalRef.current.style.height = `${newHeight}px`;
      modalRef.current.style.left = `${newX}px`;
      modalRef.current.style.top = `${newY}px`;
    }
  };

  const handleMouseUp = () => {
    setIsResizing(false);
    setResizeDirection("");
  };

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    } else {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[999999999] flex items-center justify-center bg-gray-600/30 bg-opacity-50"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        ref={modalRef}
        className="absolute rounded-lg bg-white shadow-xl min-w-80 min-h-64"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Contenu de la modale */}
        <div
          className="absolute inset-0 flex flex-col p-6"
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="flex-grow overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {children}
          </div>
        </div>

        {/* Poignées de redimensionnement */}
        <div
          className="absolute top-0 left-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={(e) => handleMouseDown(e, "top-left")}
        ></div>
        <div
          className="absolute top-0 right-0 w-4 h-4 cursor-nesw-resize"
          onMouseDown={(e) => handleMouseDown(e, "top-right")}
        ></div>
        <div
          className="absolute bottom-0 left-0 w-4 h-4 cursor-nesw-resize"
          onMouseDown={(e) => handleMouseDown(e, "bottom-left")}
        ></div>
        <div
          className="absolute bottom-0 right-0 w-4 h-4 cursor-nwse-resize"
          onMouseDown={(e) => handleMouseDown(e, "bottom-right")}
        ></div>
        <div
          className="absolute top-0 left-4 right-4 h-2 cursor-ns-resize"
          onMouseDown={(e) => handleMouseDown(e, "top")}
        ></div>
        <div
          className="absolute bottom-0 left-4 right-4 h-2 cursor-ns-resize"
          onMouseDown={(e) => handleMouseDown(e, "bottom")}
        ></div>
        <div
          className="absolute left-0 top-4 bottom-4 w-2 cursor-ew-resize"
          onMouseDown={(e) => handleMouseDown(e, "left")}
        ></div>
        <div
          className="absolute right-0 top-4 bottom-4 w-2 cursor-ew-resize"
          onMouseDown={(e) => handleMouseDown(e, "right")}
        ></div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 rounded-full p-1 mr-10 text-gray-400 hover:bg-gray-200 hover:text-gray-500"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};
