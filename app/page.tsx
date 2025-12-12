"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Play,
  Download,
  Wand2,
  Clock,
  Film,
  Settings,
  Zap
} from "lucide-react";

interface GeneratedVideo {
  id: string;
  prompt: string;
  url: string;
  thumbnail: string;
  duration: number;
  timestamp: Date;
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [duration, setDuration] = useState(5);
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [style, setStyle] = useState("cinematic");

  const styles = [
    "cinematic",
    "realistic",
    "animated",
    "artistic",
    "sci-fi",
    "dreamlike"
  ];

  const examplePrompts = [
    "A serene sunset over a tranquil lake with mountains in the background",
    "A bustling futuristic city with flying cars and neon lights",
    "A close-up of a blooming flower in time-lapse",
    "An astronaut floating in space with Earth in the background",
    "A cozy cabin in a snowy forest at night with warm lights glowing",
    "Underwater scene with colorful coral reef and tropical fish"
  ];

  const generateVideo = async () => {
    if (!prompt.trim()) return;

    setIsGenerating(true);
    setGenerationProgress(0);

    // Simulate generation progress
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 95) {
          clearInterval(progressInterval);
          return 95;
        }
        return prev + 5;
      });
    }, 200);

    // Simulate video generation (4 seconds)
    await new Promise((resolve) => setTimeout(resolve, 4000));

    clearInterval(progressInterval);
    setGenerationProgress(100);

    // Create placeholder video
    const newVideo: GeneratedVideo = {
      id: Date.now().toString(),
      prompt: prompt,
      url: `https://placeholder-video-${Date.now()}.mp4`,
      thumbnail: `https://picsum.photos/seed/${Date.now()}/1920/1080`,
      duration: duration,
      timestamp: new Date(),
    };

    setVideos([newVideo, ...videos]);
    setIsGenerating(false);
    setGenerationProgress(0);
    setPrompt("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      generateVideo();
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Film className="w-12 h-12 text-purple-400" />
            <h1 className="text-5xl md:text-6xl font-bold gradient-text">
              Video Gen AI
            </h1>
          </div>
          <p className="text-gray-400 text-lg">
            Transform your imagination into stunning videos with AI
          </p>
        </motion.div>

        {/* Main Generation Interface */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-purple-500/20 shadow-2xl">
            {/* Settings Bar */}
            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-400 mb-2">
                  <Settings className="inline w-4 h-4 mr-1" />
                  Duration
                </label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(Number(e.target.value))}
                  className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  disabled={isGenerating}
                >
                  <option value={3}>3 seconds</option>
                  <option value={5}>5 seconds</option>
                  <option value={10}>10 seconds</option>
                  <option value={15}>15 seconds</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-400 mb-2">
                  <Film className="inline w-4 h-4 mr-1" />
                  Aspect Ratio
                </label>
                <select
                  value={aspectRatio}
                  onChange={(e) => setAspectRatio(e.target.value)}
                  className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  disabled={isGenerating}
                >
                  <option value="16:9">16:9 (Landscape)</option>
                  <option value="9:16">9:16 (Portrait)</option>
                  <option value="1:1">1:1 (Square)</option>
                  <option value="21:9">21:9 (Cinematic)</option>
                </select>
              </div>

              <div className="flex-1 min-w-[200px]">
                <label className="block text-sm text-gray-400 mb-2">
                  <Wand2 className="inline w-4 h-4 mr-1" />
                  Style
                </label>
                <select
                  value={style}
                  onChange={(e) => setStyle(e.target.value)}
                  className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-purple-500"
                  disabled={isGenerating}
                >
                  {styles.map((s) => (
                    <option key={s} value={s}>
                      {s.charAt(0).toUpperCase() + s.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="relative">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Describe the video you want to create..."
                className="w-full bg-black/40 border border-purple-500/30 rounded-lg px-6 py-4 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 resize-none h-32"
                disabled={isGenerating}
              />
            </div>

            {/* Example Prompts */}
            {!isGenerating && prompt === "" && (
              <div className="mt-4">
                <p className="text-sm text-gray-400 mb-2">Try these examples:</p>
                <div className="flex flex-wrap gap-2">
                  {examplePrompts.slice(0, 3).map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setPrompt(example)}
                      className="text-xs bg-purple-900/30 hover:bg-purple-900/50 border border-purple-500/30 rounded-full px-4 py-2 transition-colors"
                    >
                      {example.slice(0, 50)}...
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={generateVideo}
              disabled={isGenerating || !prompt.trim()}
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed rounded-lg px-6 py-4 font-semibold text-white flex items-center justify-center gap-2 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
            >
              {isGenerating ? (
                <>
                  <Zap className="w-5 h-5 animate-pulse" />
                  Generating... {generationProgress}%
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Video
                </>
              )}
            </button>

            {/* Progress Bar */}
            <AnimatePresence>
              {isGenerating && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4"
                >
                  <div className="bg-black/40 rounded-full h-2 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${generationProgress}%` }}
                      className="h-full bg-gradient-to-r from-purple-600 to-blue-600"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-400 mt-2">
                    Processing frames and rendering video...
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Generated Videos Gallery */}
        {videos.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Film className="w-6 h-6 text-purple-400" />
              Your Generated Videos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {videos.map((video, index) => (
                <motion.div
                  key={video.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 backdrop-blur-xl rounded-xl overflow-hidden border border-purple-500/20 hover:border-purple-500/40 transition-all group"
                >
                  {/* Video Thumbnail */}
                  <div className="relative aspect-video bg-black/40 overflow-hidden">
                    <img
                      src={video.thumbnail}
                      alt={video.prompt}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                      <button className="bg-purple-600 hover:bg-purple-700 rounded-full p-4 transition-colors">
                        <Play className="w-6 h-6" />
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 rounded-full p-4 transition-colors">
                        <Download className="w-6 h-6" />
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 rounded-full px-3 py-1 text-xs flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {video.duration}s
                    </div>
                  </div>

                  {/* Video Info */}
                  <div className="p-4">
                    <p className="text-sm text-gray-300 line-clamp-2">
                      {video.prompt}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {video.timestamp.toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {videos.length === 0 && !isGenerating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center py-20"
          >
            <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400 opacity-50" />
            <p className="text-gray-400 text-lg">
              Start creating amazing videos with AI
            </p>
            <p className="text-gray-500 text-sm mt-2">
              Enter a prompt above and let the magic happen
            </p>
          </motion.div>
        )}

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center text-gray-500 text-sm"
        >
          <p>Powered by advanced AI video generation technology</p>
        </motion.div>
      </div>
    </div>
  );
}
