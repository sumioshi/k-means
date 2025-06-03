import React, { useState, useRef, useEffect } from 'react';
import { Point } from './types';
import { calculateCentroid, findNearestCluster, calculateEuclideanDistance } from './utils/distance';
import { CircleDot, Trash2, Plus, Minus, RefreshCw, HelpCircle } from 'lucide-react';

function App() {
  const [points, setPoints] = useState<Point[]>([]);
  const [clusters, setClusters] = useState<Point[]>([]);
  const [numClusters, setNumClusters] = useState(2);
  const [isRunning, setIsRunning] = useState(false);
  const [showHelp, setShowHelp] = useState(true);
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

    // Draw grid lines
    ctx.strokeStyle = '#f0f0f0';
    ctx.lineWidth = 1;
    for (let i = 0; i <= canvas.width; i += 50) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i <= canvas.height; i += 50) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw cluster regions if clusters exist
    if (clusters.length > 0) {
      // Create Voronoi-like regions
      for (let x = 0; x < canvas.width; x += 10) {
        for (let y = 0; y < canvas.height; y += 10) {
          const point = { x, y, id: '', clusterId: 0, isCentroid: false };
          const clusterId = findNearestCluster(point, clusters);
          ctx.fillStyle = `${colors[clusterId % colors.length]}10`;
          ctx.fillRect(x, y, 10, 10);
        }
      }
    }

    // Draw points
    points.forEach((point) => {
      ctx.beginPath();
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = colors[point.clusterId % colors.length];
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
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

      // Draw centroid label
      ctx.font = '14px Arial';
      ctx.fillStyle = '#000';
      ctx.textAlign = 'center';
      ctx.fillText(`C${index + 1}`, centroid.x, centroid.y - 15);
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!canvasRef.current || isRunning) return;

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
    setShowHelp(false);
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
    setShowHelp(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold flex items-center gap-2">
              <CircleDot className="w-6 h-6" />
              K-means Clustering Visualization
            </h1>
            <button
              onClick={() => setShowHelp(!showHelp)}
              className="p-2 rounded hover:bg-gray-100 transition-colors"
              title="Toggle Help"
            >
              <HelpCircle className="w-5 h-5" />
            </button>
          </div>

          {showHelp && (
            <div className="mb-4 p-4 bg-blue-50 rounded-lg text-sm">
              <h2 className="font-semibold mb-2">How to use:</h2>
              <ol className="list-decimal list-inside space-y-1">
                <li>Click anywhere on the canvas to add data points</li>
                <li>Use + and - to adjust the number of clusters (K)</li>
                <li>Click "Initialize Clusters" to start the clustering process</li>
                <li>Click "Run K-means" to optimize the clusters</li>
                <li>Use "Clear" to start over</li>
              </ol>
            </div>
          )}
          
          <div className="mb-4 flex items-center gap-4">
            <button
              onClick={() => setNumClusters(Math.max(2, numClusters - 1))}
              className="p-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
              disabled={isRunning}
              title="Decrease number of clusters"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="font-medium">Clusters (K): {numClusters}</span>
            <button
              onClick={() => setNumClusters(Math.min(8, numClusters + 1))}
              className="p-2 rounded bg-gray-200 hover:bg-gray-300 transition-colors disabled:opacity-50"
              disabled={isRunning}
              title="Increase number of clusters"
            >
              <Plus className="w-4 h-4" />
            </button>
            
            <button
              onClick={runKMeans}
              className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors flex items-center gap-2 disabled:opacity-50"
              disabled={isRunning || points.length === 0}
            >
              <RefreshCw className={`w-4 h-4 ${isRunning ? 'animate-spin' : ''}`} />
              {clusters.length === 0 ? 'Initialize Clusters' : 'Run K-means'}
            </button>
            
            <button
              onClick={clearCanvas}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors flex items-center gap-2 disabled:opacity-50"
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
              className="border border-gray-300 rounded-lg cursor-crosshair bg-white"
            />
            {points.length === 0 && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-400 text-center">
                <CircleDot className="w-8 h-8 mx-auto mb-2" />
                Click anywhere to add points
              </div>
            )}
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2">
            {clusters.map((cluster, index) => (
              <div
                key={cluster.id}
                className="flex items-center gap-2 p-2 rounded-lg"
                style={{ backgroundColor: `${colors[index % colors.length]}10` }}
              >
                <div
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: colors[index % colors.length] }}
                />
                <span className="text-sm">
                  Cluster {index + 1}: {points.filter(p => p.clusterId === index).length} points
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;