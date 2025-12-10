import Header from "@/components/header";

export default function DocsPage() {
  return (
    <>
      <Header />
      <div className="min-h-screen bg-black text-white flex items-center justify-center px-4">
        <div className="text-center space-y-4 max-w-2xl">
          <h1 className="text-4xl font-bold">
            <span className="inline-block bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Docs
            </span>
          </h1>
          <p className="text-xl text-gray-400">Coming Soon</p>
        </div>
      </div>
    </>
  );
}
