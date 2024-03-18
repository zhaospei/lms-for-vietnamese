"use client";

// Import necessary modules and components
import { useEffect, useState, useRef } from "react";

// Declare a global interface to add the webkitSpeechRecognition property to the Window object
declare global {
  interface Window {
    webkitSpeechRecognition: any;
  }
}

import Cookies from "universal-cookie";

const cookies = new Cookies();

// Export the MicrophoneComponent function component
export default function MicrophoneComponent() {
  // State variables to manage recording status, completion, and transcript
  const authToken = "http://112.137.129.161:8000/?authToken=" + cookies.get('authToken'); 

  // Render the microphone component with appropriate UI based on recording state
  return (
    <main className='min-h-screen flex justify-center'>
        <iframe src={authToken}  width="1100px" height="750px" allowFullScreen></iframe>
    </main>
  );
}