import React, { useState, useRef, useEffect } from 'react';
import { Point } from './types';
import { calculateCentroid, findNearestCluster } from './utils/distance';
import { CircleDot, Trash2, Plus, Minus, RefreshCw } from 'lucide-react';

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [clusters, setClusters] = useState<Point[]>([]);
  const [numClusters, setNumClusters] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const colors = [
    '#FF6B6B', // Red
    '#4ECDC4', // Teal
    '#45B7D1', // Blue
    '#96CEB4', // Green
    '#FFEEAD', // Yellow
    '#D4A5A5', // Pink
    '#9B59B6', // Purple
    '#3498DB', // Light Blue
  ];

  useEffect(() => {
    drawCanvas();
  }, [points, clusters]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw points
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = colors[point.clusterId % colors.length];
      ctx.fill();
    });

    // Draw centroids
    clusters.forEach((centroid, index) => {
      ctx.beginPath();
      ctx.arc(centroid.x, centroid.y, 8, 0, 2 * Math.PI);
      ctx.fillStyle = colors[index % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2;
      ctx.stroke();
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newPoint: Point = {
      id: `point-${Date.now()}`,
      x,
      y,
      clusterId: clusters.length > 0 ? findNearestCluster({ x, y } as Point, clusters) : 0,
      isCentroid: false,
    };

    setPoints([...points, newPoint]);
  };

  const initializeClusters = () => {
    if (points.length < numClusters) {
      alert('Add more points before initializing clusters!');
      return;
    }

    // Randomly select initial centroids from existing points
    const shuffled = [...points].sort(() => 0.5 - Math.random());
    const initialCentroids = shuffled.slice(0, numClusters).map((point, index) => ({
      ...point,
      clusterId: index,
      isCentroid: true,
    }));

    setClusters(initialCentroids);

    // Assign points to nearest cluster
    const updatedPoints = points.map((point) => ({
      ...point,
      clusterId: findNearestCluster(point, initialCentroids),
    }));

    setPoints(updatedPoints);
  };

  const runKMeans = () => {
    if (clusters.length === 0) {
      initializeClusters();
      return;
    }

    setIsRunning(true);
    const interval = setInterval(() => {
      // Calculate new centroids
      const newCentroids = clusters.map((_, index) => {
        const clusterPoints = points.filter((p) => p.clusterId === index);
        return calculateCentroid(clusterPoints);
      });

      // Reassign points to nearest centroid
      const updatedPoints = points.map((point) => ({
        ...point,
        clusterId: findNearestCluster(point, newCentroids),
      }));

      setClusters(newCentroids);
      setPoints(updatedPoints);
    }, 500);

    // Stop after a few iterations
    setTimeout(() => {
      clearInterval(interval);
      setIsRunning(false);
    }, 3000);
  };

  const clearCanvas = () => {
    setPoints([]);
    setClusters([]);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h1 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <CircleDot className="w-6 h-6" />
            K-means Clustering Visualization
          </h1>
          
          <div className="mb-4 flex items-center gap-4">
            <button
              onClick={() => setNumClusters(Math.max(2, numClusters - 1))}
              className="p-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
              disabled={isRunning}
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-medium">Clusters: {numClusters}</span>
            <button
              onClick={() => setNumClusters(Math.min(8, numClusters + 1))}
              className="p-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors"
              disabled={isRunning}
            >
              <Plus className="w-4 h-4" />
            </button>
            
            <button
              onClick={runKMeans}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2"
              disabled={isRunning || points.length === 0}
            >
              <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
              {clusters.length === 0 ? 'Initialize Clusters' : 'Run K-means'}
            </button>
            
            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-2"
              disabled={isRunning}
            >
              <Trash2 className="w-4 h-4" />
              Clear
            </button>
          </div>

          <div className="relative">
            <canvas
              ref={canvasRef}
              width={800}
              height={500}
              onClick={handleCanvasClick}
              className="border border-gray-300 rounded-lg cursor-crosshair bg-gray-50"
            />
            <div className="absolute top-2 left-2 bg-white/80 backdrop-blur-sm rounded p-2 text-sm">
              Click anywhere to add points
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;