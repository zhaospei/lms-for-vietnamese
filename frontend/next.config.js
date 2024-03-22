/** @type {import('next').NextConfig} */
const fs = require('fs-extra');

const nextConfig = {
    env: {
        API_URL: process.env.API_URL,
        ACCEPTABLE_FILE_EXTENSION: process.env.ACCEPTABLE_FILE_EXTENSION,
        ACCEPTABLE_FILE_SIZE: process.env.ACCEPTABLE_FILE_SIZE,
        URL: process.env.URL
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "**",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
    webpack: (config) => {
        /**
         * Critical: prevents " ⨯ ./node_modules/canvas/build/Release/canvas.node
         * Module parse failed: Unexpected character '�' (1:0)" error
         */
        config.resolve.alias.canvas = false;
        // config.module.rules.push({
        //     test: /\.(pdf)$/,
        //     type: "asset/resource",
        // });

        // You may not need this, it's just to support moduleResolution: 'node16'
        config.resolve.extensionAlias = {
            '.js': ['.js', '.ts', '.tsx'],
        };

        const cua = ['tri-thuc-nen-tang', 'goi-mo', 'tai-lieu-tham-khao', 'bai-mau'];
        const chuyende = ['van-hoc-dan-gian', 'san-khau-hoa', 'tho-truyen-tieu-thuyet'];
        let res = {};
        for (let x1 of ['canh-dieu', 'chan-troi-sang-tao', 'ket-noi-tri-thuc']) {
            for (let cửa = 0; cửa < cua.length; ++cửa) {
                for (let chuyên_đề = 0; chuyên_đề < chuyende.length; ++chuyên_đề) {
                    let path = './public/chang-1/';
                    const key = `${x1}/${cua[cửa]}/${chuyende[chuyên_đề]}`;
                    switch (cửa) {
                        case 0:
                        case 1:
                            path += `Cửa 1 và 2_${x1 === 'canh-dieu' ? 'Bộ Cánh Diều' : (x1 === 'chan-troi-sang-tao' ? 'Bộ chân trời sáng tạo' : 'Bộ Kết nối tri thức với cuộc sống')}`;
                            path += `/Chuyên đề ${chuyên_đề + 1}`;
                            path += `/Cửa ${cửa + 1}`
                            break;
                        case 2:
                        case 3:
                            path += `Cửa ${cửa + 1}/Chuyên đề ${chuyên_đề + 1}`
                            break;
                    }
                    const files = fs.readdirSync(path);
                    res[key] = {
                        path: path.replace('./public/', ''),
                        files: files.map((file) => {
                            let ext = file.split('.');
                            ext = ext[ext.length - 1];
                            switch (ext) {
                                case 'pdf': break;
                                case 'png':
                                case 'jpg':
                                case 'jpeg':
                                    ext = 'img';
                                    break;
                                case 'mp4':
                                    ext = 'video';
                                    break;
                                default:
                                    console.log({
                                        path,
                                        file,
                                    })
                                    ext = 'other';
                            }
                            return {
                                name: file,
                                type: ext
                            }
                        })
                    }
                }
            }
        }

        fs.writeJsonSync('./public/chang-1/assets.json', res);

        return config;
    },
    typescript: {
        // !! WARN !!
        // Dangerously allow production builds to successfully complete even if
        // your project has type errors.
        // !! WARN !!
        ignoreBuildErrors: true,
      },
    // output: 'export'
}

module.exports = nextConfig

