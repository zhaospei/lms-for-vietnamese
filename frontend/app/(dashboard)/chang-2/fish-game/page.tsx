"use client";
import "./main.css";

// Import necessary modules and components
import { useEffect, useState, useRef, CanvasHTMLAttributes } from "react";
import Background from "@/public/images/game/background.png"
import Fish_1 from "@/public/images/game/characters/fishmain/mainlv3/main.png"
import Fish_2 from "@/public/images/game/characters/fishmain/mainlv3/main1.png"
import Fish_3 from "@/public/images/game/characters/fishmain/mainlv3/main2.png"
import Fish_4 from "@/public/images/game/characters/fishmain/mainlv3/main3.png"
import Fish_5 from "@/public/images/game/characters/fishmain/mainlv3/main4.png"
import FishLV3_1 from "@/public/images/game/characters/fishlv3/fishlv3.png"
import FishLV3_2 from "@/public/images/game/characters/fishlv3/fishlv3_1.png"
import FishLV3_3 from "@/public/images/game/characters/fishlv3/fishlv3_2.png"
import FishLV2_1 from "@/public/images/game/characters/fishlv2/fishlv2.png"
import FishLV2_2 from "@/public/images/game/characters/fishlv2/Fish2-1.png"
import FishLV2_3 from "@/public/images/game/characters/fishlv2/Fish2-2.png"
import FishLV2_4 from "@/public/images/game/characters/fishlv2/Fish2-3.png"
import FishLV1_1 from "@/public/images/game/characters/fishlv1/fishlv1.png"
import FishLV1_2 from "@/public/images/game/characters/fishlv1/fishlv1_1.png"
import FishLV1_3 from "@/public/images/game/characters/fishlv1/fishlv1_2.png"

// import Image from "next/image";
import { twMerge } from 'tailwind-merge';


// Declare a global interface to add the webkitSpeechRecognition property to the Window object

// Export the MigrophoneComponent function component

const BackgroundImg = new Image();
BackgroundImg.src = Background.src;
const Fish_1Img = new Image();
Fish_1Img.src = Fish_1.src;
const Fish_2Img = new Image();
Fish_2Img.src = Fish_2.src;
const Fish_3Img = new Image();
Fish_3Img.src = Fish_3.src;
const Fish_4Img = new Image();
Fish_4Img.src = Fish_4.src;
const Fish_5Img = new Image();
Fish_5Img.src = Fish_5.src;
const FishLV3_1Img = new Image();
FishLV3_1Img.src = FishLV3_1.src;
const FishLV3_2Img = new Image();
FishLV3_2Img.src = FishLV3_2.src;
const FishLV3_3Img = new Image();
FishLV3_3Img.src = FishLV3_3.src;
const FishLV2_1Img = new Image();
FishLV2_1Img.src = FishLV2_1.src;
const FishLV2_2Img = new Image();
FishLV2_2Img.src = FishLV2_2.src;
const FishLV2_3Img = new Image();
FishLV2_3Img.src = FishLV2_3.src;
const FishLV2_4Img = new Image();
FishLV2_4Img.src = FishLV2_4.src;
const FishLV1_1Img = new Image();
FishLV1_1Img.src = FishLV1_1.src;
const FishLV1_2Img = new Image();
FishLV1_2Img.src = FishLV1_2.src;
const FishLV1_3Img = new Image();
FishLV1_3Img.src = FishLV1_3.src;


var util = {
    isNotInScreen : function(W: any, H: any, obj: any, padding: any){
		if(obj.x < -padding || obj.x > W + padding || obj.y < -padding || obj.y > H + padding){
			return true;
		}else{
			return false;
		}
	},

    // isNotCollision : function(rect1: any, rect2: any){

	// 	if (
    //         rect1.x < rect2.x + rect2.w &&
    //         rect1.x + rect1.w > rect2.x &&
    //         rect1.y < rect2.y + rect2.h &&
    //         rect1.y + rect1.h > rect2.y
    //       ) {
    //         return true;
    //     } else {
    //         return false;
    //     }
	// },
}

class MainFish {
    w: number;
    h: number;
    frame: any;
    score: number;
    x: number;
    y: number;
    wX: number;
    wY: number;
    speed: number;
    rotate: number;
    nowFrame: number;

    constructor(w: any, h: any, frame: any, score: any, rotate: any) {
        this.w = w;
        this.h = h;
        this.frame = frame;
        this.score = score;
        this.x = 400;
        this.y = 400;
        this.wX = 400;
        this.wY = 400;
        this.speed = Math.random() * 1 + 1;
        this.rotate = rotate;
        this.nowFrame = 0;
    }

    nextFrame() {  
        this.nowFrame++;
        if (this.nowFrame >= this.frame.length) {
            this.nowFrame = 0;
        }
    }
    
    move(ctx: any) {
        if (this.x < this.wX) {
            this.rotate = -1;
            // this.speed = -this.speed;
        } else {
            this.rotate = 1;
        }
        this.x += (this.wX - this.x)/10;
        this.y += (this.wY - this.y)/10;
        if (this.x < 0 + this.w) {
            this.x = this.w
        }
        if (this.y < this.h) {
            this.y = this.h
        }
        if (this.x > ctx.canvas.width - this.w) {
            this.x = ctx.canvas.width - this.w
        }

        if (this.y > ctx.canvas.height - this.h) {
            this.y = ctx.canvas.height - this.h
        }
        // console.log(this.x)
       
        // this.y += this.speed;
    }    

    draw(ctx: any) {
        ctx.save();
        
        // ctx.rotate(this.rotate);
        if (this.rotate == 1) {
            // ctx.translate(this.w, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.frame[this.nowFrame], -this.x, this.y, this.w, this.h);
        // ctx.drawImage(img, 0, 0, width*-1, height);
        }
        // console.log(image)
        ctx.drawImage(this.frame[this.nowFrame], this.x, this.y, this.w, this.h);
        ctx.restore();
    }

}


class Fish {
    w: number;
    h: number;
    frame: any;
    score: number;
    x: number;
    y: number;
    speed: number;
    rotate: number;
    nowFrame: number;

    constructor(w: any, h: any, frame: any, score: any, rotate: any) {
        this.w = w;
        this.h = h;
        this.frame = frame;
        this.score = score;
        this.x = 200;
        this.y = 200;
        this.speed = Math.random() * 1 + 1;
        this.rotate = rotate;
        this.nowFrame = 0;
    }

    nextFrame() {  
        this.nowFrame++;
        if (this.nowFrame >= this.frame.length) {
            this.nowFrame = 0;
        }
    }
    
    move(ctx: any) {
        this.x += this.speed;
        // console.log(this.x)
        if (this.x < 0 || this.x > ctx.canvas.width + 100) {
            this.rotate = -this.rotate;
            this.speed = -this.speed;
            this.y = Math.random() * ((ctx.canvas.height?? 0) - 100) + 100
        }
        // this.y += this.speed;
    }    

    draw(ctx: any) {
        ctx.save();
        
        // ctx.rotate(this.rotate);
        if (this.rotate == 1) {
            // ctx.translate(this.w, 0);
            ctx.scale(-1, 1);
            ctx.drawImage(this.frame[this.nowFrame], -this.x, this.y, this.w, this.h);
        // ctx.drawImage(img, 0, 0, width*-1, height);
        }
        // console.log(image)
        ctx.drawImage(this.frame[this.nowFrame], this.x, this.y, this.w, this.h);
        ctx.restore();
    }

}

export default function FishGame() {


  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gd = canvasRef.current?.getContext('2d');
  const oBox = canvasRef.current;
  const [score, setScore] = useState(0);
//  let answer = false;

//   useEffect(() => {
//     const context = canvasRef.current?.getContext("2d");
//     const image = new Image();
//     image.src = Background.src;
//     // image.src =
//     //   "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Picture_icon_BLACK.svg/1200px-Picture_icon_BLACK.svg.png";
//     image.onload = () => {
//       if (context != null) context.drawImage(image, 0, 0);
//     };
//   }, []);

//     let fishs = [1, 2, 3, 1, 2, 3, 1, 2, 3, 3]
//     let aFish: any[] = [];

// // var oF = new Fish(150, 75, [Fish_1Img, Fish_2Img, Fish_3Img, Fish_4Img, Fish_5Img], 1, -1);
// // aFish.push(oF)
// const mainFish = new MainFish(100, 50, [Fish_1Img, Fish_2Img, Fish_3Img, Fish_4Img, Fish_5Img], 1, 1);
 

function nextFish(i: any, fishs: any) {
    // if (i > 9) return;
    // setTimeout(function(){
        // var _fish = fishs[Math.floor(Math.random() * fishs.length)];
        var _fish = fishs[i];
        var oF = new Fish(50, 25, [Fish_1Img, Fish_2Img, Fish_3Img, Fish_4Img, Fish_5Img], 1, 1);
        if (_fish === 1) {
            oF = new Fish(50, 25, [FishLV1_1Img, FishLV1_2Img, FishLV1_3Img], 1, 1);
        } else if (_fish == 2) {
            oF = new Fish(60, 30, [FishLV2_1Img, FishLV2_2Img, FishLV2_3Img, FishLV2_4Img], 2, 1);
        } else if (_fish == 3) {
            oF = new Fish(100, 50, [FishLV3_1Img, FishLV3_2Img, FishLV3_3Img], 3, -1);
        }
        
        // if (Math.random() < 0.5){
        oF.x = 0
        if (oF.rotate == 1) {
            oF.x = canvasRef.current?.width?? 0;
        }
        oF.y = Math.random() * ((canvasRef.current?.height?? 0) - 100) + 100;
        // oF.y = 100;
        oF.score = 1;
        // aFish.push(oF);
        // nextFish(i + 1);
    // }, 1000);
    return oF;
  }
    // nextFish(0);
  
  useEffect(() => {
    let answer = false;
    let fishs = [1, 2, 3, 1, 2, 3, 1, 2, 3, 3]
    let aFish: any[] = [];
    aFish.push(nextFish(0, fishs));

// var oF = new Fish(150, 75, [Fish_1Img, Fish_2Img, Fish_3Img, Fish_4Img, Fish_5Img], 1, -1);
// aFish.push(oF)
    const mainFish = new MainFish(100, 50, [Fish_1Img, Fish_2Img, Fish_3Img, Fish_4Img, Fish_5Img], 1, 1);
    setInterval(() => {
        if (!answer) {
        // if (oBox != null && gd != null) {
            const context = canvasRef.current?.getContext("2d");
            // gd.fillStyle = "#000000"
            // gd.fillRect(0, 0, gd.canvas.width, gd.canvas.height)
            // console.log(aFish);
            // .onload = () => {
            if (context != null) {
                context.clearRect(0, 0, context?.canvas.width, context?.canvas.height);
                context.drawImage(BackgroundImg, 0, 0)
            }
            // // console.log("OK");
            
                for(let i = 0; i < aFish.length; i++){
                    // if(util.isNotInScreen(oBox.width, oBox.height, aFish[i], 75)){
                    //     aFish.splice(i--, 1);
                    //     // aFish
                    //     continue;
                    // }
                    aFish[i].move(context);
                    // console.log(aFish[i].x, aFish[i].y, aFish[i].w, aFish[i].h, aFish[i].frame[aFish[i].nowFrame]);
                    // if (context != null) context.drawImage(aFish[i].frame[aFish[i].nowFrame], aFish[i].x, aFish[i].y, aFish[i].w, aFish[i].h);
                    aFish[i].draw(context);
                };
                mainFish.draw(context);
                mainFish.move(context);
                for(let f = 0; f < aFish.length; f++){ 
                    
                    // console.log(util.isNotCollision(aFish[f], mainFish));
                    if (
                        aFish[f].x < mainFish.x + mainFish.w &&
                        aFish[f].x + aFish[f].w > mainFish.x &&
                        aFish[f].y < mainFish.y + mainFish.h &&
                        aFish[f].y + aFish[f].h > mainFish.y    
                    ) {
                    // if (util.isNotCollision(aFish[f], MainFish) == true) {
                        console.log("OK");
                        // setAnswer((old) =>  true);
                        // answer = false;
                        setScore((old) => old + 1);
                        // setAnswer((oldValue) => !oldValue);
                        console.log(answer);
                        aFish.splice(f--, 1);
                        console.log(aFish);
                    }
                }
            }
        // }
    }, 16);
    setInterval(function(){
        for(var i = 0; i < aFish.length; i++){
            aFish[i].nextFrame();
        }
        mainFish.nextFrame();
        // for(var i = 0; i < aCoin.length; i++){
        //     aCoin[i].nextFrame();
        // }
        // for(var i = 0; i < aDeadFish.length; i++){
        //     aDeadFish[i].nextFrame();
        // }
        // cannon.nextFrame();
    }, 150);
    const handler = (e: MouseEvent) => {
        // console.log({x: e.clientX, y: e.clientY})
        const currentPoint = computePointInCanvas(e)
        if (!currentPoint) return

        // console.log(currentPoint)
        mainFish.wX = currentPoint.x - 50;
        mainFish.wY = currentPoint.y;
    }

    const computePointInCanvas = (e: MouseEvent) => {
        const canvas = canvasRef.current
        if (!canvas) return

        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        return {x, y}
    }

    canvasRef.current?.addEventListener('mousemove', handler)
    // return () => canvasRef.current?.addEventListener('mousemove', handler)
  }, []);
  // State variables to manage recording status, completion, and transcript
  

  // Render the microphone component with appropriate UI based on recording state
  return (
    <main className='min-h-screen relative'>
        <canvas ref={canvasRef} width={1024} height={700} />
        {score}
        {/* (answer && 
        <div className="w-[1024px] h-[700px] absolute z-[1] top-0" style={{backgroundColor: 'rgba(0, 0, 0, 0.7'}}>

        </div>) */}
        {/* <div className="w-full h-[1000px] relative"> */}
            {/* <Image src={Background} alt="home_main" fill sizes="100vw"/> */}
            {/* <Fish speed={50} flip={false} width={150} height={75} top={0} left={0} backgrounds={[Fish_1, Fish_2, Fish_3, Fish_4, Fish_5]} size={5} className='absolute z-[100]'/>
            <Fish speed={100} flip={false} width={200} height={100} top={200} left={0} backgrounds={[Fish_1, Fish_2, Fish_3, Fish_4, Fish_5]} size={5} className='absolute z-[100]'/>
            <Fish speed={100} flip={false} width={300} height={150} top={400} left={400} backgrounds={[FishLV3_1, FishLV3_2, FishLV3_3]} size={3} className='absolute z-[100]'/>
            <Fish speed={50} flip={true} width={150} height={75} top={500} left={0} backgrounds={[FishLV2_1, FishLV2_2, FishLV2_3, FishLV2_4]} size={4} className='absolute z-[100]'/>
            <Fish speed={100} flip={true} width={50} height={25} top={400} left={400} backgrounds={[FishLV1_1, FishLV1_2, FishLV1_3]} size={3} className='absolute z-[100]'/>
            <Fish speed={100} flip={false} width={300} height={150} top={200} left={400} backgrounds={[FishLV3_1, FishLV3_2, FishLV3_3]} size={3} className='absolute z-[100]'/> */}
        {/* </div> */}
    </main>
  );
}