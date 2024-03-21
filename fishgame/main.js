class MainFish {

    constructor(w, h, frame, score, rotate) {
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
    
    move(ctx) {
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

    draw(ctx) {
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

    constructor(w, h, frame, score, rotate) {
        this.w = w;
        this.h = h;
        this.frame = frame;
        this.score = score;
        this.x = 200;
        this.y = 200;
        this.speed = Math.random() * 1 + 1;
        this.rotate = rotate;
        this.nowFrame = 0;
        this.question = ''
        this.A = ''
        this.B = ''
        this.C = ''
        this.D = ''
        this.answer = ''
        this.die = 0;
    }

    nextFrame() {  
        this.nowFrame++;
        if (this.nowFrame >= this.frame.length) {
            this.nowFrame = 0;
        }
    }
    
    move(ctx) {
        this.x += this.speed;
        // console.log(this.x)
        if (this.x < 0 || this.x > ctx.canvas.width + 100) {
            this.rotate = -this.rotate;
            this.speed = -this.speed;
            this.y = Math.random() * ((ctx.canvas.height?? 0) - 100) + 100
        }
        // this.y += this.speed;
    }    

    draw(ctx) {
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
