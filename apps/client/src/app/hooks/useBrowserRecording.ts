import { useState, useRef, useCallback, useEffect } from 'react';

export interface UseBrowserRecordingProps {
  onRecordingStart?: () => void;
  onRecordingStop?: (blob: Blob) => void;
  onError?: (error: Error) => void;
}

export interface UseBrowserRecordingReturn {
  isRecording: boolean;
  isSupported: boolean;
  startRecording: () => Promise<void>;
  stopRecording: () => void;
  downloadRecording: () => void;
  uploadRecording: (blob: Blob) => Promise<void>;
  error: string | null;
  updateAudioStream: (isAudioOn: boolean) => Promise<void>;
}

export function useBrowserRecording(props: UseBrowserRecordingProps = {}): UseBrowserRecordingReturn {
  const { onRecordingStart, onRecordingStop, onError } = props;
  
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSupported, setIsSupported] = useState(false);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const recordingBlobRef = useRef<Blob | null>(null);


  const startRecording = useCallback(async () => {
    try {
      setError(null);

      // Request audio access (always request audio for recording, UI state doesn't matter)
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });

      streamRef.current = stream;

      // Create MediaRecorder for audio only
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });

      mediaRecorderRef.current = mediaRecorder;
      recordedChunksRef.current = [];

      // Handle data available
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          recordedChunksRef.current.push(event.data);
        }
      };

      // Handle recording stop
      mediaRecorder.onstop = () => {
        const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
        recordingBlobRef.current = blob;
        onRecordingStop?.(blob);
      };

      // Handle errors
      mediaRecorder.onerror = (event) => {
        const error = new Error(`MediaRecorder error: ${event}`);
        setError(error.message);
        onError?.(error);
      };

      // Start recording
      mediaRecorder.start(1000); // Collect data every second
      setIsRecording(true);
      onRecordingStart?.();

    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to start recording');
      setError(error.message);
      onError?.(error);
    }
  }, [onRecordingStart, onRecordingStop, onError]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }

    // Stop all tracks
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
  }, [isRecording]);

  const downloadRecording = useCallback(() => {
    if (recordingBlobRef.current) {
      const url = URL.createObjectURL(recordingBlobRef.current);
      const a = document.createElement('a');
      a.href = url;
      a.download = `audio-recording-${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.webm`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  }, []);

  const uploadRecording = useCallback(async (blob: Blob) => {
    try {
      // TODO: Replace with actual backend endpoint
      const formData = new FormData();
      formData.append('audio', blob, `recording-${Date.now()}.webm`);
      
      // Placeholder for backend upload
      console.log('Uploading recording to backend...', {
        size: blob.size,
        type: blob.type,
        timestamp: new Date().toISOString()
      });
      
      // Simulate upload (replace with actual fetch)
      // const response = await fetch('/api/recordings', {
      //   method: 'POST',
      //   body: formData,
      // });
      // 
      // if (!response.ok) {
      //   throw new Error('Upload failed');
      // }
      // 
      // const result = await response.json();
      // console.log('Recording uploaded successfully:', result);
      
      // For now, just log the upload attempt
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      console.log('Recording upload completed (simulated)');
      
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Upload failed');
      console.error('Upload error:', error);
      setError(error.message);
      onError?.(error);
    }
  }, [onError]);

  const updateAudioStream = useCallback(async (newIsAudioOn: boolean) => {
    if (!isRecording || !streamRef.current) {
      return;
    }

    try {
      const audioTracks = streamRef.current.getAudioTracks();
      const hasAudio = audioTracks.length > 0 && audioTracks.some(track => track.enabled);

      // If turning off audio, just disable the audio track
      if (!newIsAudioOn && hasAudio) {
        audioTracks.forEach(track => {
          track.enabled = false;
          // Don't stop the track immediately, just disable it
          // This allows the recording to continue with silence
        });
        return; // Don't restart MediaRecorder
      }

      // If turning on audio, either enable existing track or add new one
      if (newIsAudioOn && !hasAudio) {
        // First try to enable existing disabled tracks
        const disabledAudioTracks = audioTracks.filter(track => !track.enabled);
        if (disabledAudioTracks.length > 0) {
          disabledAudioTracks.forEach(track => {
            track.enabled = true;
          });
          return; // Don't restart MediaRecorder
        }
        try {
          // Get new audio stream
          const newStream = await navigator.mediaDevices.getUserMedia({
            audio: true,
          });

          // Add new audio track to existing stream
          if (streamRef.current) {
            newStream.getTracks().forEach(track => {
              streamRef.current?.addTrack(track);
            });
          }

          // Update MediaRecorder to use the updated stream
          if (mediaRecorderRef.current) {
            // Stop current recording
            mediaRecorderRef.current.stop();
            
            // Create new MediaRecorder with updated stream
            const newMediaRecorder = new MediaRecorder(streamRef.current, {
              mimeType: 'audio/webm',
            });

            // Set up new MediaRecorder event handlers
            newMediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                recordedChunksRef.current.push(event.data);
              }
            };

            newMediaRecorder.onstop = () => {
              const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
              recordingBlobRef.current = blob;
              onRecordingStop?.(blob);
            };

            newMediaRecorder.onerror = (event) => {
              const error = new Error(`MediaRecorder error: ${event}`);
              setError(error.message);
              onError?.(error);
            };

            // Update reference and restart recording
            mediaRecorderRef.current = newMediaRecorder;
            newMediaRecorder.start(1000);
          }
        } catch (err) {
          console.warn('Could not add new audio track to stream:', err);
          // Fallback: restart with new stream if adding tracks fails
          const fallbackStream = await navigator.mediaDevices.getUserMedia({
            audio: newIsAudioOn,
          });

          // Stop current tracks
          streamRef.current.getTracks().forEach(track => track.stop());
          streamRef.current = fallbackStream;

          // Update MediaRecorder with new stream
          if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
            
            const newMediaRecorder = new MediaRecorder(fallbackStream, {
              mimeType: 'audio/webm',
            });

            newMediaRecorder.ondataavailable = (event) => {
              if (event.data.size > 0) {
                recordedChunksRef.current.push(event.data);
              }
            };

            newMediaRecorder.onstop = () => {
              const blob = new Blob(recordedChunksRef.current, { type: 'audio/webm' });
              recordingBlobRef.current = blob;
              onRecordingStop?.(blob);
            };

            newMediaRecorder.onerror = (event) => {
              const error = new Error(`MediaRecorder error: ${event}`);
              setError(error.message);
              onError?.(error);
            };

            mediaRecorderRef.current = newMediaRecorder;
            newMediaRecorder.start(1000);
          }
        }
      }
    } catch (err) {
      const error = err instanceof Error ? err : new Error('Failed to update audio stream');
      setError(error.message);
      onError?.(error);
    }
  }, [isRecording, onRecordingStop, onError]);

  // Check support on mount
  useEffect(() => {
    const hasMediaDevices = !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
    const hasMediaRecorder = typeof window !== 'undefined' && 'MediaRecorder' in window;
    setIsSupported(hasMediaDevices && hasMediaRecorder);
  }, []);

  return {
    isRecording,
    isSupported,
    startRecording,
    stopRecording,
    downloadRecording,
    uploadRecording,
    error,
    updateAudioStream,
  };
}
