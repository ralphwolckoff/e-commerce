interface LoadingOverlayProps {
  isLoading: boolean;
}

export const LoadingOverlay = ({ isLoading }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-999999 h-screen w-screen flex items-center justify-center bg-white bg-opacity-90 backdrop-blur-sm">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-current border-r-transparent text-primary-600 motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
    </div>
  );
};