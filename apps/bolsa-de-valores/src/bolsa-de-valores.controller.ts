import { Controller, Get } from '@nestjs/common';
import { BolsaDeValoresService } from './bolsa-de-valores.service';

@Controller()
export class BolsaDeValoresController {
  constructor(private readonly bolsaDeValoresService: BolsaDeValoresService) {}

  @Get()
  getHello(): string {
    return this.bolsaDeValoresService.getHello();
  }
}
