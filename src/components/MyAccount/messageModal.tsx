import { Modal } from "./modal";

interface MessageModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
}

export const MessageModal = ({ isOpen, onClose, message }: MessageModalProps) => (
  <Modal isOpen={isOpen} onClose={onClose} title="Information">
    <p>{message}</p>
    <div className="flex justify-end mt-4">
      <button
        onClick={onClose}
        className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
      >
        Fermer
      </button>
    </div>
  </Modal>
);