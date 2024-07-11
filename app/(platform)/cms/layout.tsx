

export default async function SetupLayout ({ children }: { children: React.ReactNode }) {

  return (
    <div className="h-full flex items-center justify-center">
      {children}
    </div>
  );
};