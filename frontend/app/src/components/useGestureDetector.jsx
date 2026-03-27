import { useEffect, useRef } from 'react';
import * as handPoseDetection from '@tensorflow-models/hand-pose-detection';
import '@tensorflow/tfjs-core';
import '@tensorflow/tfjs-backend-webgl';

export function useGestureDetector(onGestureDetected) {
  const videoRef = useRef(null);
  const modelRef = useRef(null);
  const detectingRef = useRef(false);

  useEffect(() => {
    async function init() {
      await tf.setBackend('webgl');
      const detector = await handPoseDetection.createDetector(
        handPoseDetection.SupportedModels.MediaPipeHands,
        {
          runtime: 'mediapipe',
          solutionPath: 'https://cdn.jsdelivr.net/npm/@mediapipe/hands'
        }
      );
      modelRef.current = detector;

      const video = videoRef.current;
      if (navigator.mediaDevices?.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;
        await video.play();
        detectingRef.current = true;
        detectGestures();
      }
    }

    init();

    return () => {
      detectingRef.current = false;
      if (modelRef.current) {
        modelRef.current.dispose();
      }
    };
  }, []);

  async function detectGestures() {
    while (detectingRef.current) {
      if (videoRef.current?.readyState === 4) {
        const hands = await modelRef.current.estimateHands(videoRef.current);
        if (hands.length > 0 && isPalmOpen(hands[0].keypoints)) {
          onGestureDetected();
          detectingRef.current = false;
        }
      }
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
  }

  function isPalmOpen(landmarks) {
    const fingerTips = [4, 8, 12, 16, 20];
    const fingerBases = [2, 5, 9, 13, 17];
    return fingerTips.every((tip, i) => 
      landmarks[tip].y < landmarks[fingerBases[i]].y
    );
  }

  return { videoRef };
}