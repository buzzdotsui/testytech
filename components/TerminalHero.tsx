import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Code, Cpu, Shield, Zap } from 'lucide-react';

const TerminalHero: React.FC = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [activeLine, setActiveLine] = useState(0);
    const [charIndex, setCharIndex] = useState(0);

    const script = [
        "> Initializing Core Systems...",
        "> Loading Modules: [React, TypeScript, Tailwind, Gemini AI]...",
        "> Connecting to Neural Network...",
        "> status: ONLINE",
        "> Welcome to Testy Tech Inc."
    ];

    useEffect(() => {
        if (activeLine >= script.length) return;

        const currentText = script[activeLine];

        if (charIndex < currentText.length) {
            const timeout = setTimeout(() => {
                setLines(prev => {
                    const newLines = [...prev];
                    if (newLines[activeLine] === undefined) newLines[activeLine] = "";
                    newLines[activeLine] = currentText.substring(0, charIndex + 1);
                    return newLines;
                });
                setCharIndex(prev => prev + 1);
            }, 30 + Math.random() * 50); // Typing speed
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                setActiveLine(prev => prev + 1);
                setCharIndex(0);
            }, 500); // Delay between lines
            return () => clearTimeout(timeout);
        }
    }, [activeLine, charIndex]);

    return (
        <div className="w-full max-w-2xl mx-auto backdrop-blur-md bg-slate-900/80 border border-slate-700/50 rounded-lg shadow-2xl overflow-hidden font-mono text-sm transform hover:scale-[1.01] transition-transform duration-300 group">
            {/* Title Bar */}
            <div className="bg-slate-800/80 px-4 py-2 flex items-center justify-between border-b border-slate-700/50">
                <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-400 text-xs">root@testy-tech:~/init</span>
                </div>
                <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
            </div>

            {/* Terminal Body */}
            <div className="p-6 h-64 overflow-y-auto font-mono text-left relative">
                <div className="absolute inset-0 bg-slate-950/50 pointer-events-none" />
                <div className="relative z-10 space-y-2">
                    {lines.map((line, i) => (
                        <div key={i} className="text-green-400">
                            <span className="opacity-50 mr-2">$</span>
                            {line}
                            {i === activeLine && <span className="animate-pulse inline-block w-2 h-4 bg-green-400 ml-1 align-middle"></span>}
                        </div>
                    ))}
                    {activeLine >= script.length && (
                        <div className="text-cyan-400 animate-pulse mt-4">
                            <span className="opacity-50 mr-2">$</span>
                            _
                        </div>
                    )}
                </div>

                {/* Scanlines Effect */}
                <div className="absolute inset-0 pointer-events-none bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==')] opacity-[0.03]" />
            </div>
        </div>
    );
};

export default TerminalHero;
