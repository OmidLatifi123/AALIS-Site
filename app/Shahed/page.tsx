import Shahed from '@/components/Shahed/Shahed';

export default function ShahedPage() {
  return (
    <main className="w-screen h-screen bg-gradient-to-b from-gray-900 to-black">
      <div className="w-full h-full flex flex-col">
        {/* Header */}
        <header className="bg-black/50 backdrop-blur-sm border-b border-gray-800 p-4">
          <h1 className="text-3xl font-bold text-white">Shahed-136 Drone Model</h1>
          <p className="text-gray-400 mt-1">Interactive 3D Model Viewer</p>
        </header>
        
        {/* 3D Viewer */}
        <div className="flex-1 w-full">
          <Shahed />
        </div>
        
        {/* Footer */}
        <footer className="bg-black/50 backdrop-blur-sm border-t border-gray-800 p-3 text-center text-gray-400 text-sm">
          <p>3D Model Viewer powered by Three.js</p>
        </footer>
      </div>
    </main>
  );
}