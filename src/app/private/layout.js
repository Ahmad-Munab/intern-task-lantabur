export default function Layout({ children }) {
  return (
    <div className="w-screen h-screen flex flex-col justify-start items-center my-20 space-y-24 bg-background">
      {children}
    </div>
  );
}
