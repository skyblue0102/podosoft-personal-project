import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { multerOptions } from './config';
import { ApiBody, ApiConsumes,  ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import axios from 'axios';



@Controller('upload')
@ApiTags('file upload API')
export class uploadController {
  @Post()
  @ApiOperation({summary:'파일 업로드 API', description:'파일을 저장 및 업로드힌다.'})
  @ApiResponse({description:'파일 업로드'})
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: { 
          type: 'string',
          format: 'binary'
        },
      },
    },
  })

  @UseInterceptors(FilesInterceptor('file', null, multerOptions))
  async UploadFile(@UploadedFile() file:Express.Multer.File) {
      console.log("파일 업로드");
      
      const fs = require('fs');
      let img_path = '';
      // 디렉토리 내 파일 목록 가져오기

      fs.readdir('./uploads', (err: any, files: any[]) => {
        if (err) throw err;
        for (let i = 0; i<files.length;i++){
        img_path = path.join('../../../../../uploads',`${files[i]}`);}
        console.log(files);
        console.log(img_path);
      })
      
      const path = require('path');
        // // Send a POST request to the Flask server's search endpoint
        // const response = await axios.post('http://127.0.0.1:5000/search', {
        //   img_path: img_path // Assuming file.path contains the path to the uploaded image
        // });

        // // Get the response data from the Flask server
        // const responseData = response.data;

        // return responseData; // Return the response data from the Flask server
      }
}
