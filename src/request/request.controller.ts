import { Body, Controller, Post } from "@nestjs/common";
import { RequestService } from "./request.service";
import { SendRequestDto } from "./dto/send-request.dto";

@Controller('request')
export class RequestController {

  constructor(
    private readonly requestService: RequestService,
  )
  {}

  @Post('/send')
  sendRequest(@Body() dto: SendRequestDto) {
    return this.requestService.sendRequest(dto);
  }

}
