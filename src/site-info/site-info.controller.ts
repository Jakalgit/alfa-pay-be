import { Controller, Get } from "@nestjs/common";
import { SiteInfoService } from "./site-info.service";

@Controller('site-info')
export class SiteInfoController {

  constructor(private readonly siteInfoService: SiteInfoService) {
  }

  @Get('all')
  getInfo() {
    return this.siteInfoService.getInfo();
  }
}
